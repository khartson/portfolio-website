import React, { FC } from 'react';
import { FileTreeEntry } from '../../types/portfolio';

interface PdfContentProps {
  entry: FileTreeEntry;
}

// Renders a PDF preview using an iframe.
const PdfContent: FC<PdfContentProps> = ({ entry }) => {
  return (
    <div className="flex flex-col h-full bg-zinc-900 overflow-hidden p-8">
      <h2 className="mb-4 text-xl font-semibold text-red-400">
        // PDF Preview: {entry.name}
      </h2>
      <div className="flex-grow bg-zinc-800 rounded-lg shadow-xl border border-zinc-700">
        <iframe
          src={entry.content}
          title={entry.name}
          className="w-full h-full border-0 rounded-lg"
          // Fallback message for environments that block IFRAME or PDF viewing
          onError={(e) => console.error("Error loading PDF iframe", e)}
        />
      </div>
      <p className="mt-4 text-sm text-zinc-500 text-center">
        Note: The editor environment might block inline PDF rendering. This is a mock preview.
      </p>
    </div>
  );
};

export default PdfContent;