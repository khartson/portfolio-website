import { useState, useEffect } from 'react';
import { highlightCode } from './syntax-highlighter';

/**
 * React hook for syntax highlighting code with Starry Night.
 * 
 * @param code - The source code to highlight
 * @param language - The language identifier (e.g., 'go', 'python', 'ruby')
 * @returns The highlighted HTML string, or null while loading
 */
export function useSyntaxHighlight(code: string, language: string): string | null {
  const [highlightedHtml, setHighlightedHtml] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // Reset to null when code or language changes
    setHighlightedHtml(null);

    // Highlight the code asynchronously
    highlightCode(code, language)
      .then((html) => {
        if (!cancelled) {
          setHighlightedHtml(html);
        }
      })
      .catch((error) => {
        console.error('Syntax highlighting error:', error);
        if (!cancelled) {
          // Fallback to plain text on error
          setHighlightedHtml(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [code, language]);

  return highlightedHtml;
}

