import { createStarryNight, common } from '@wooorm/starry-night';

// Language mapping: our language identifiers to Starry Night scope names
const languageMap: Record<string, string> = {
  'go': 'source.go',
  'python': 'source.python',
  'ruby': 'source.ruby',
  'json': 'source.json',
  'ini': 'source.ini',
  'markdown': 'text.markdown',
  'javascript': 'source.js',
  'typescript': 'source.ts',
  'html': 'text.html.basic',
  'css': 'source.css',
  'bash': 'source.shell',
  'shell': 'source.shell',
};

// Singleton instance of Starry Night
let starryNightInstance: Awaited<ReturnType<typeof createStarryNight>> | null = null;

/**
 * Initialize Starry Night with common grammars.
 * This is a singleton pattern to avoid re-initializing on every call.
 */
async function getStarryNight() {
  if (!starryNightInstance) {
    starryNightInstance = await createStarryNight(common);
  }
  return starryNightInstance;
}

/**
 * Highlights code using Starry Night syntax highlighter.
 * 
 * @param code - The source code to highlight
 * @param language - The language identifier (e.g., 'go', 'python', 'ruby')
 * @returns HTML string with syntax highlighting classes applied
 */
export async function highlightCode(code: string, language: string): Promise<string> {
  try {
    const starryNight = await getStarryNight();
    
    // Map our language identifier to Starry Night scope name
    const scope = languageMap[language.toLowerCase()];
    
    if (!scope) {
      // If language not supported, return plain escaped HTML
      return escapeHtml(code);
    }
    
    // Try to highlight the code - Starry Night will throw if scope is not available
    const tree = starryNight.highlight(code, scope);
    
    // Convert the HAST tree to HTML string
    // Dynamic import to avoid SSR issues
    const { toHtml } = await import('hast-util-to-html');
    return toHtml(tree);
  } catch (error) {
    // If highlighting fails (scope not found, etc.), fallback to plain text
    console.error('Error highlighting code:', error);
    return escapeHtml(code);
  }
}

/**
 * Escape HTML to prevent XSS attacks.
 */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

