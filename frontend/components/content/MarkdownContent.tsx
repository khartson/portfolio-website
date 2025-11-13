import React, { FC } from 'react';

interface MarkdownContentProps {
  content: string;
}

// A simple component to render the raw markdown content.
// A real application would use a library like 'marked' or 'react-markdown'.
const MarkdownContent: FC<MarkdownContentProps> = ({ content }) => {
  // Replace common markdown features with basic HTML/Tailwind for visual separation
  const formattedContent = content
    .replace(/^#\s(.*?)$/gm, '<h1 class="text-3xl font-bold mb-4 text-cyan-400">$1</h1>')
    .replace(/^##\s(.*?)$/gm, '<h2 class="text-2xl font-semibold mb-3 text-blue-400">$1</h2>')
    .replace(/^###\s(.*?)$/gm, '<h3 class="text-xl font-medium mb-2 text-green-400">$1</h3>')
    .replace(/^\*\s(.*?)$/gm, '<li class="ml-4 list-disc text-zinc-300">$1</li>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Basic bolding

  return (
    <div className="p-8 md:p-12 text-zinc-300 h-full overflow-y-auto prose prose-invert max-w-none">
      <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
    </div>
  );
};

export default MarkdownContent;