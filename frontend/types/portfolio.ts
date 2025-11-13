import { ElementType } from 'react';

// Defines the structure for a single file or folder entry in the sidebar tree.
export interface FileTreeEntry {
  id: string; // Unique identifier (e.g., 'docs-readme')
  name: string; // Display name (e.g., 'README.md')
  type: 'file' | 'folder';
  icon: ElementType; // Lucide icon component (passed as ElementType)
  language: 'markdown' | 'python' | 'ruby' | 'ini' | 'pdf' | 'json' | 'default'; // The rendering format
  content: string; // The raw text, code, or URL content
  children?: FileTreeEntry[]; // Required only if type is 'folder'
}

// Defines the valid states for the main activity bar menu
export type ActiveMenuType = 'explorer' | 'search' | 'settings';

// Defines the props for the reusable VSCodeIcon component
export interface VSCodeIconProps {
  icon: ElementType;
  label: string;
  isActive?: boolean;
  onClick: () => void;
}