import { ElementType } from 'react';
import { FileText, Folder, ScrollText, FileCode } from 'lucide-react';
import type { FileTreeEntry } from '../types/portfolio';

// Import devicons for language-specific icons
import PythonPlain from 'devicons-react/icons/PythonPlain';
import GoOriginal from 'devicons-react/icons/GoOriginal';
import MarkdownOriginal from 'devicons-react/icons/MarkdownOriginal';

/**
 * Maps file language to the appropriate icon component.
 * Uses devicons-react for language-specific icons (VS Code style),
 * falls back to lucide-react icons for other file types.
 */
export function getFileIcon(language: FileTreeEntry['language'], isFolder: boolean): ElementType {
  if (isFolder) {
    return Folder;
  }

  switch (language) {
    case 'python':
      return PythonPlain;
    case 'go':
      return GoOriginal;
    case 'markdown':
      return MarkdownOriginal;
    case 'pdf':
      return ScrollText;
    case 'json':
    case 'ini':
    case 'ruby':
    default:
      return FileCode;
  }
}

