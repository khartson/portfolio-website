'use client';

import React, { FC, useMemo } from 'react';
import { FileTreeEntry } from '../../types/portfolio';
import { useSyntaxHighlight } from '../../utils/useSyntaxHighlight';

interface CodeContentProps {
  entry: FileTreeEntry;
}

const CodeContent: FC<CodeContentProps> = ({ entry }) => {
  // Use Starry Night for syntax highlighting
  const highlightedHtml = useSyntaxHighlight(entry.content, entry.language);
  
  // Fallback: Generate HTML with line numbers while highlighting loads or if it fails
  const fallbackHtml = useMemo(() => {
    const lines = entry.content.split('\n');
    
    // Escape HTML to prevent XSS issues
    const escapeHtml = (text: string) => {
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };
    
    return lines.map((line, index) => {
      const escapedLine = escapeHtml(line || ' ');
      return `<div class="flex group hover:bg-zinc-800/30">
        <span class="pr-4 pl-4 text-zinc-500 text-right w-12 select-none group-hover:bg-zinc-700/50">${index + 1}</span>
        <span class="flex-grow whitespace-pre pr-4">${escapedLine}</span>
      </div>`;
    }).join('');
  }, [entry.content]);
  
  // Combine highlighted code with line numbers
  const finalHtml = useMemo(() => {
    if (!highlightedHtml) {
      // Still loading or failed, use fallback
      return fallbackHtml;
    }
    
    // Starry Night returns HTML, we need to split it by lines and add line numbers
    // The HTML might contain <span> elements with syntax classes
    // We'll split by <br> tags or newlines and wrap each line
    
    // Remove <pre> and <code> wrapper tags if present, keep the inner content
    let codeContent = highlightedHtml
      .replace(/^<pre[^>]*>/, '')
      .replace(/<\/pre>$/, '')
      .replace(/^<code[^>]*>/, '')
      .replace(/<\/code>$/, '');
    
    // Split by <br> tags or newlines
    const lines = codeContent.split(/<br\s*\/?>/i).map(line => line.trim());
    
    // If no <br> tags, try splitting by literal \n (might be escaped)
    if (lines.length === 1) {
      const splitByNewline = codeContent.split(/\n/);
      if (splitByNewline.length > 1) {
        return splitByNewline.map((line, index) => {
          const lineContent = line || ' ';
          return `<div class="flex group hover:bg-zinc-800/30">
            <span class="pr-4 pl-4 text-zinc-500 text-right w-12 select-none group-hover:bg-zinc-700/50">${index + 1}</span>
            <span class="flex-grow whitespace-pre pr-4">${lineContent}</span>
          </div>`;
        }).join('');
      }
    }
    
    return lines.map((line, index) => {
      // Line might be empty or contain HTML from Starry Night
      const lineContent = line || ' ';
      return `<div class="flex group hover:bg-zinc-800/30">
        <span class="pr-4 pl-4 text-zinc-500 text-right w-12 select-none group-hover:bg-zinc-700/50">${index + 1}</span>
        <span class="flex-grow whitespace-pre pr-4">${lineContent}</span>
      </div>`;
    }).join('');
  }, [highlightedHtml, fallbackHtml]);

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] p-0 font-mono text-sm">
      <pre className="p-0 m-0 border-none overflow-visible leading-relaxed">
        {/* Rendered HTML with syntax highlighting from Starry Night */}
        <div 
          className={`language-${entry.language}`}
          dangerouslySetInnerHTML={{ __html: finalHtml }} 
        />
      </pre>
    </div>
  );
};

export default CodeContent;