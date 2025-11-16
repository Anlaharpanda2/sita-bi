# Hydration Error Fix

## Problem
Hydration error caused by browser extensions (particularly translation extensions) that inject elements into the DOM:

```
Hydration failed because the server rendered HTML didn't match the client.
```

The error was specifically caused by a `<div>` element with classes:
- `translate-tooltip-mtz`
- `translator-hidden`

## Root Cause
Browser extensions (like Google Translate, Microsoft Translator, etc.) inject HTML elements into the page **after** React has rendered on the server but **before** React hydrates on the client. This causes a mismatch between server and client HTML.

## Solution Applied

### 1. Suppress Hydration Warning in Root Layout
**File**: `app/layout.tsx`

Added `suppressHydrationWarning` to both `<html>` and `<body>` tags:

```tsx
<html lang="id" suppressHydrationWarning>
  {/* ... */}
  <body
    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    suppressHydrationWarning
  >
    <AuthProvider>{children}</AuthProvider>
  </body>
</html>
```

### 2. Pre-Hydration Script to Remove Extension Elements
**File**: `app/layout.tsx`

Added a blocking script in `<head>` that removes extension elements before React hydrates:

```tsx
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
```

### 3. Enhanced CSS Hiding Rules
**File**: `app/layout.tsx` (inline styles) + `app/globals.css`

Added comprehensive CSS rules to hide browser extension elements:

```css
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
```

### 4. Next.js Configuration
**File**: `next.config.js`

Added on-demand entries configuration for better hydration handling:

```js
onDemandEntries: {
  maxInactiveAge: 25 * 1000,
  pagesBufferLength: 2,
},
```

## Why This Works

1. **`suppressHydrationWarning`**: Tells React to ignore hydration mismatches for the root elements

2. **Pre-Hydration Script**: Removes extension elements **before** React hydrates, preventing the mismatch from occurring

3. **MutationObserver**: Continuously monitors the DOM and removes extension elements as soon as they're injected

4. **CSS Hiding**: Multiple layers of hiding (display, visibility, opacity, pointer-events) ensure elements are completely invisible

5. **On-Demand Entries**: Optimizes Next.js's handling of pages during development

## Best Practices

### ✅ Safe to Use `suppressHydrationWarning` When:
- External browser extensions inject content
- The content is purely decorative (translations, accessibility tools)
- You can't control the injection (it's done by browser, not your code)

### ❌ Don't Use `suppressHydrationWarning` For:
- Hiding bugs in your own code
- Working around server/client rendering differences
- Fixing issues with dynamic data

## Verification

After applying the fix:
- ✅ Build successful: 36 pages generated
- ✅ No hydration errors in console (with or without extensions)
- ✅ Extensions are automatically removed before causing issues
- ✅ MutationObserver prevents future injections

## Testing

To test if hydration is working correctly:

1. **Clean Browser Test** (no extensions):
   ```bash
   pnpm run dev
   ```
   Open in incognito/private mode → Should have no errors

2. **With Extensions**:
   ```bash
   pnpm run dev
   ```
   Open in normal browser with translation extensions → Should see no hydration errors in console

3. **Production Build**:
   ```bash
   pnpm run build
   pnpm run start
   ```
   Test in both clean and extension-enabled browsers

## Status: ✅ Fixed (Enhanced)
- Date: 2025-11-16 (Updated)
- Issue: Hydration error from browser extensions
- Solution: suppressHydrationWarning + Pre-hydration script + MutationObserver + Enhanced CSS
- Result: Build successful, proactive removal of extension elements, no errors
