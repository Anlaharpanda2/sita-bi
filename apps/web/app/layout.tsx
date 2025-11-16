import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { AuthProvider } from '../context/AuthContext';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['monospace'],
});

export const metadata: Metadata = {
  title: 'SITA-BI',
  description: 'Sistem Informasi Tugas Akhir & Bimbingan',
  metadataBase: new URL('http://localhost:3001'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#991b1b',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* DNS Prefetch & Preconnect untuk faster API calls */}
        <link rel="dns-prefetch" href="http://localhost:3002" />
        <link
          rel="preconnect"
          href="http://localhost:3002"
          crossOrigin="anonymous"
        />
        {/* Remove browser extension elements before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if (typeof window !== 'undefined') {
                  const removeExtensionElements = function() {
                    const selectors = [
                      '.translate-tooltip-mtz',
                      '.translator-hidden',
                      '[class*="translate-"]',
                      '[class*="translator-"]',
                      '[id*="translate"]',
                      '[id*="translator"]'
                    ];
                    selectors.forEach(function(selector) {
                      try {
                        const elements = document.querySelectorAll(selector);
                        elements.forEach(function(el) { el.remove(); });
                      } catch (e) {}
                    });
                  };
                  if (document.readyState === 'loading') {
                    document.addEventListener('DOMContentLoaded', removeExtensionElements);
                  } else {
                    removeExtensionElements();
                  }
                  const observer = new MutationObserver(removeExtensionElements);
                  observer.observe(document.documentElement, { childList: true, subtree: true });
                }
              })();
            `,
          }}
        />
        {/* Inline critical CSS for faster FCP */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root {
                --background: #FFFFFF;
                --foreground: #800000;
                --primary: #800000;
              }
              html, body {
                max-width: 100vw;
                overflow-x: hidden;
                margin: 0;
                padding: 0;
              }
              body {
                color: var(--foreground);
                background: var(--background);
              }
              * {
                box-sizing: border-box;
              }
              .translate-tooltip-mtz,
              .translator-hidden,
              [class*="translate-"],
              [class*="translator-"],
              [id*="translate"],
              [id*="translator"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
              }
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
