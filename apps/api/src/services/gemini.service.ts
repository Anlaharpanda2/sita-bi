import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

interface GeminiPart {
  text: string;
}

interface GeminiContent {
  parts: GeminiPart[];
}

interface GeminiRequest {
  contents: GeminiContent[];
}

interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
    code?: number;
  };
}

class GeminiService {
  private apiKeys: string[] = [];
  private currentKeyIndex: number = 0;
  private readonly baseUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  constructor() {
    this.loadApiKeys();
  }

  private loadApiKeys(): void {
    // Load all 10 API keys from environment variables
    for (let i = 1; i <= 10; i++) {
      const key = process.env[`GEMINI_API_KEY_${i}`];
      if (key && key !== `your-gemini-api-key-${i}`) {
        this.apiKeys.push(key);
      }
    }

    if (this.apiKeys.length === 0) {
      console.warn(
        '⚠️  No valid Gemini API keys found. Please configure GEMINI_API_KEY_1 to GEMINI_API_KEY_10 in .env file'
      );
    } else {
      console.log(`✅ Loaded ${this.apiKeys.length} Gemini API key(s)`);
    }
  }

  private async callGeminiApi(
    prompt: string,
    apiKey: string
  ): Promise<string> {
    const requestBody: GeminiRequest = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await axios.post<GeminiResponse>(this.baseUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': apiKey,
      },
    });

    if (response.data.error) {
      throw new Error(response.data.error.message);
    }

    if (
      !response.data.candidates ||
      response.data.candidates.length === 0 ||
      !response.data.candidates[0].content.parts[0]
    ) {
      throw new Error('Invalid response from Gemini API');
    }

    return response.data.candidates[0].content.parts[0].text;
  }

  private isRateLimitError(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      // Check for rate limit status codes
      if (axiosError.response?.status === 429) {
        return true;
      }
      // Check for quota exceeded error messages
      const errorMessage = JSON.stringify(axiosError.response?.data).toLowerCase();
      return (
        errorMessage.includes('quota') ||
        errorMessage.includes('rate limit') ||
        errorMessage.includes('resource_exhausted')
      );
    }
    return false;
  }

  async generateContent(prompt: string): Promise<string> {
    if (this.apiKeys.length === 0) {
      throw new Error(
        'No Gemini API keys configured. Please add API keys to .env file'
      );
    }

    const attemptedKeys = new Set<number>();
    let lastError: Error | null = null;

    // Try all API keys starting from current index
    while (attemptedKeys.size < this.apiKeys.length) {
      const apiKey = this.apiKeys[this.currentKeyIndex];
      const keyNumber = this.currentKeyIndex + 1;

      console.log(`🔄 Attempting request with API key #${keyNumber}`);

      try {
        const result = await this.callGeminiApi(prompt, apiKey);
        console.log(`✅ Success with API key #${keyNumber}`);
        return result;
      } catch (error) {
        attemptedKeys.add(this.currentKeyIndex);
        lastError = error as Error;

        if (this.isRateLimitError(error)) {
          console.warn(
            `⚠️  API key #${keyNumber} hit rate limit. Trying next key...`
          );
          // Move to next API key
          this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
        } else {
          // For non-rate-limit errors, throw immediately
          console.error(
            `❌ Error with API key #${keyNumber}:`,
            (error as Error).message
          );
          throw error;
        }
      }
    }

    // All API keys have been exhausted
    console.error('❌ All Gemini API keys have reached their limits');
    throw new Error(
      'Anda sudah mencapai limit. Semua API key Gemini telah mencapai batas penggunaan.'
    );
  }

  async chat(message: string): Promise<string> {
    return this.generateContent(message);
  }

  // Get current API key status
  getStatus(): {
    totalKeys: number;
    currentKeyIndex: number;
    currentKeyNumber: number;
  } {
    return {
      totalKeys: this.apiKeys.length,
      currentKeyIndex: this.currentKeyIndex,
      currentKeyNumber: this.currentKeyIndex + 1,
    };
  }

  // Reset to first API key (useful for testing or manual reset)
  resetToFirstKey(): void {
    this.currentKeyIndex = 0;
    console.log('🔄 Reset to first API key');
  }
}

// Export singleton instance
export const geminiService = new GeminiService();
