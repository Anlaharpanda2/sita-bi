import { Router, Request, Response } from 'express';
import { geminiService } from '../services/gemini.service';
import { authenticate } from '../middlewares/auth.middleware';
import asyncHandler from 'express-async-handler';

const router: Router = Router();

// Chat endpoint - protected with authentication
router.post(
  '/chat',
  authenticate,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Message is required and must be a string',
      });
      return;
    }

    if (message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
      return;
    }

    if (message.length > 10000) {
      res.status(400).json({
        success: false,
        error: 'Message is too long. Maximum 10000 characters',
      });
      return;
    }

    try {
      const response = await geminiService.chat(message);

      res.json({
        success: true,
        data: {
          message: response,
          apiKeyUsed: geminiService.getStatus().currentKeyNumber,
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      // Check if it's the "all keys exhausted" error
      if (errorMessage.includes('Anda sudah mencapai limit')) {
        res.status(429).json({
          success: false,
          error: errorMessage,
        });
        return;
      }

      // Other errors
      res.status(500).json({
        success: false,
        error: 'Failed to generate response',
        details: errorMessage,
      });
    }
  })
);

// Public endpoint for testing (no auth required)
router.post(
  '/chat/public',
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const { message } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({
        success: false,
        error: 'Message is required and must be a string',
      });
      return;
    }

    if (message.trim().length === 0) {
      res.status(400).json({
        success: false,
        error: 'Message cannot be empty',
      });
      return;
    }

    if (message.length > 10000) {
      res.status(400).json({
        success: false,
        error: 'Message is too long. Maximum 10000 characters',
      });
      return;
    }

    try {
      const response = await geminiService.chat(message);

      res.json({
        success: true,
        data: {
          message: response,
          apiKeyUsed: geminiService.getStatus().currentKeyNumber,
        },
      });
    } catch (error) {
      const errorMessage = (error as Error).message;

      if (errorMessage.includes('Anda sudah mencapai limit')) {
        res.status(429).json({
          success: false,
          error: errorMessage,
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to generate response',
        details: errorMessage,
      });
    }
  })
);

// Get API key status
router.get(
  '/status',
  authenticate,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const status = geminiService.getStatus();

    res.json({
      success: true,
      data: {
        totalApiKeys: status.totalKeys,
        currentApiKeyNumber: status.currentKeyNumber,
        message:
          status.totalKeys > 0
            ? `Currently using API key #${status.currentKeyNumber} out of ${status.totalKeys}`
            : 'No API keys configured',
      },
    });
  })
);

// Reset to first API key (admin only)
router.post(
  '/reset',
  authenticate,
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    geminiService.resetToFirstKey();

    res.json({
      success: true,
      message: 'API key rotation reset to first key',
    });
  })
);

export default router;
