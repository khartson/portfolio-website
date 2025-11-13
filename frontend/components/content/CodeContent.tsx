import React, { FC } from 'react';
import { FileTreeEntry } from '../../types/portfolio';

// NOTE: This component is now ready for integration with @wooorm/starry-night.
// Due to the complexity of asynchronous grammar loading required by starry-night,
// this component currently renders the raw code within a styled <pre> block.
//
// To complete the integration:
// 1. In a utility function, use `createStarryNight` to load the necessary grammars.
// 2. Pass the file's content to the `starry-night` instance to get the VDOM/HTML output.
// 3. Render that output using `dangerouslySetInnerHTML` inside the <pre> tag below.

interface CodeContentProps {
  entry: FileTreeEntry;
}

const CodeContent: FC<CodeContentProps> = ({ entry }) => {

  // For now, we apply VSCode styling to a raw <pre> block.
  // When integrated with starry-night, the HTML output should be rendered inside this structure.
  // The 'entry.language' can be used to load the correct grammar for the highlighter.

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] p-0 font-mono text-sm">
      <pre
        className="p-8 leading-relaxed text-zinc-300 h-full overflow-auto"
        style={{
          margin: 0,
          background: '#1e1e1e', // Match editor background
          fontSize: '0.875rem', // text-sm
          // Add basic syntax look-alikes until starry-night is integrated:
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {entry.content}
      </pre>
    </div>
  );
};

export default CodeContent;