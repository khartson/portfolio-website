import React, { FC } from 'react';
import { FileTreeEntry } from '../../types/portfolio';
import CodeContent from './CodeContent';
import MarkdownContent from './MarkdownContent';
import PdfContent from './PdfContent';

interface FileRendererProps {
  activeFile: FileTreeEntry;
}

// Determines which content component to use based on the file's language type.
const FileRenderer: FC<FileRendererProps> = ({ activeFile }) => {
  // Pass the entire entry to the content components if they need more than just raw text
  const props = { entry: activeFile, content: activeFile.content };

  switch (activeFile.language) {
    case 'markdown':
      return <MarkdownContent content={activeFile.content} />;
    case 'pdf':
      return <PdfContent {...props} />;
    case 'python':
    case 'ruby':
    case 'ini':
    // case 'hcl':
    case 'json':
      return <CodeContent {...props} />;
    default:
      return (
        <div className="p-8 text-zinc-400">
          <h1 className="text-xl text-red-500">Error: Unknown file type.</h1>
          <pre className="mt-4 p-4 bg-zinc-800 rounded">{activeFile.content}</pre>
        </div>
      );
  }
};

export default FileRenderer;