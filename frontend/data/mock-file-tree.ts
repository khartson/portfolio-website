import { FileTreeEntry } from '../types/portfolio';
import { FileText, Folder, ScrollText } from 'lucide-react';

const mockFileTree: FileTreeEntry[] = [
  // --- README.md (Root Level) ---
  {
    id: 'readme',
    name: 'README.md',
    type: 'file',
    icon: FileText,
    language: 'markdown',
    content: `# Kyle's Portfolio (WIP)

This site is currently a **work in progress** and is being built to showcase my projects in an interactive code editor format.

---

## Status

More content is coming soon! Please check back later for my complete project details and technical write-ups.

In the meantime, feel free to check out my resume in the \`/docs\` folder.`,
  },
  // --- DOCS FOLDER ---
  {
    id: 'docs',
    name: 'docs',
    type: 'folder',
    icon: Folder,
    language: 'default',
    content: '',
    children: [
      {
        id: 'docs-resume',
        name: 'resume.pdf',
        type: 'file',
        icon: ScrollText,
        language: 'pdf',
        content: '/Resume_November_2025.pdf',
      },
    ],
  },
];

export default mockFileTree;