'use client'
import React, { useState, useEffect, useMemo, useCallback, ForwardRefExoticComponent, RefAttributes } from 'react';
import { Menu, Folder, FileText, Settings, Github, Code, User, ChevronDown, ChevronRight, X, LucideProps } from 'lucide-react'; // Added X for close button, LucideProps for typing
import { JSX } from 'react/jsx-runtime'


import { ActiveMenuType, FileTreeEntry } from '../../types/portfolio.ts';
import mockFileTree from '../../data/mock-file-tree.ts';
import EditorIcon from './EditorIcon.tsx';
import FileRenderer from '../content/FileRenderer.tsx';
// Helper function to flatten the nested file tree for easier searching and state management
const flattenFileTree = (tree: FileTreeEntry[], prefix: string = ''): FileTreeEntry[] => {
  return tree.flatMap(entry => {
    const newId = prefix ? `${prefix}-${entry.id}` : entry.id;
    if (entry.type === 'folder' && entry.children) {
      return [
        { ...entry, id: newId },
        ...flattenFileTree(entry.children, newId),
      ];
    }
    return { ...entry, id: newId };
  });
};

const allFiles = flattenFileTree(mockFileTree);

// Helper function to find the flattened ID for an entry from the original tree
// This is needed because renderFileTree uses the original tree structure, but allFiles has flattened IDs
const findFlattenedId = (entry: FileTreeEntry, parentPath: string[] = []): string | null => {
  // Build the expected flattened ID based on the path
  const pathIds = [...parentPath, entry.id];
  const flattenedId = pathIds.join('-');
  
  // Check if this ID exists in allFiles
  if (allFiles.some(f => f.id === flattenedId)) {
    return flattenedId;
  }
  
  // If not found, try to find by matching name and type (fallback)
  const match = allFiles.find(f => 
    f.name === entry.name && 
    f.type === entry.type &&
    (f.type === 'folder' || f.language === entry.language)
  );
  
  return match ? match.id : null;
};

const EditorLayout: React.FC = () => {
  // State to track which files are currently open as tabs (VS Code behavior: starts empty)
  const [openTabIds, setOpenTabIds] = useState<string[]>([]); // NEW STATE
  // State to track which file is currently focused in the editor
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [activeMenu, setActiveMenu] = useState<ActiveMenuType>('explorer');
  const [openFolders, setOpenFolders] = useState<Record<string, boolean>>({}); // State for tree expansion

  // Derived state for the currently active file object
  const activeFile = useMemo(() => openTabIds.length > 0
    ? allFiles.find(f => f.id === activeTabId && f.type === 'file')
    : undefined,
    [activeTabId, openTabIds]
  );

  // Derived state for the files represented by the open tabs
  const openTabs = useMemo(() => allFiles.filter(f => openTabIds.includes(f.id)), [openTabIds]);

  useEffect(() => {
    if (activeFile) {
      document.title = `${activeFile.name} | Portfolio`;
    } else {
      document.title = 'Welcome | Portfolio';
    }
  }, [activeFile]);

  // --- Utility Functions ---

  const getLanguageColor = useCallback((language: FileTreeEntry['language']) => {
    switch (language) {
      case 'markdown': return 'text-green-400';
      case 'python': return 'text-yellow-400';
      case 'ruby': return 'text-red-400';
      case 'ini': return 'text-purple-400';
    //   case 'hcl': return 'text-orange-400';
      case 'json': return 'text-pink-400';
      case 'pdf': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  }, []);

  const toggleFolder = useCallback((folderId: string) => {
    setOpenFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId],
    }));
  }, []);

  // --- File Management Functions ---

  // Function to open a file when clicked in the tree or on a tab
  const openFile = useCallback((fileId: string) => {
    if (!openTabIds.includes(fileId)) {
      setOpenTabIds(prev => [...prev, fileId]);
    }
    setActiveTabId(fileId);
  }, [openTabIds]);

  // Function to close a tab when the 'X' is clicked
  const closeTab = useCallback((e: React.MouseEvent, fileId: string) => {
    e.stopPropagation(); // Prevent the tab's onClick from triggering
    
    setOpenTabIds(prev => {
      const newOpenTabs = prev.filter(id => id !== fileId);
      // If the closed tab was the active one, choose a new active tab
      if (fileId === activeTabId) {
        // Set the new active tab to the one before it, or the first one, or none
        const closedIndex = prev.indexOf(fileId);
        const newActiveId = newOpenTabs[closedIndex - 1] || newOpenTabs[0] || '';
        setActiveTabId(newActiveId);
      }
      return newOpenTabs;
    });
  }, [activeTabId]);

  // --- Renderer Components ---

  const renderFileTree = (entries: FileTreeEntry[], depth: number = 0, parentPath: string[] = []) => {
    return entries.map(entry => {
      const isFolder = entry.type === 'folder';
      // Find the flattened ID for this entry
      const flattenedId = findFlattenedId(entry, parentPath) || entry.id;
      const isOpen = isFolder && openFolders[flattenedId];
      const isSelected = !isFolder && activeTabId === flattenedId;
      // Type assertion is necessary to treat the icon property as a Lucide component
      const Icon = entry.icon as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

      const indent = depth * 0.75; // Indent in rem
      const currentPath = [...parentPath, entry.id];

      const itemContent = (
        <div
          style={{ paddingLeft: `${indent}rem` }}
          className={`flex items-center w-full py-1.5 px-2 text-sm text-left transition-colors duration-150 rounded-sm cursor-pointer
            ${isFolder ? 'font-semibold text-zinc-300' : isSelected ? 'bg-blue-600/30 text-white' : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-white'}`}
          // UPDATED: Use openFile with flattened ID for file clicks
          onClick={() => isFolder ? toggleFolder(flattenedId) : openFile(flattenedId)}
        >
          {isFolder ? (
            isOpen ? <ChevronDown className="w-3 h-3 mr-1.5 text-zinc-500" /> : <ChevronRight className="w-3 h-3 mr-1.5 text-zinc-500" />
          ) : (
            <div className="w-3 h-3 mr-1.5" style={{ marginLeft: `${indent > 0 ? 0 : 0.15}rem` }}></div> // Align files if not a folder
          )}
          <Icon className={`w-4 h-4 mr-2 ${isFolder ? 'text-blue-500' : getLanguageColor(entry.language)}`} />
          {entry.name}
        </div>
      );

      return (
        <React.Fragment key={flattenedId}>
          {itemContent}
          {isFolder && isOpen && entry.children && (
            <div className="pl-4">
              {renderFileTree(entry.children, depth + 1, currentPath)}
            </div>
          )}
        </React.Fragment>
      );
    });
  };

  const renderSidebar = (): JSX.Element => {
    switch (activeMenu) {
      case 'explorer':
        return (
          <div className="p-3">
            <h2 className="text-sm font-semibold text-zinc-400 mb-2 uppercase">Explorer</h2>
            <div className="space-y-0">
              {renderFileTree(mockFileTree)}
            </div>
          </div>
        );
      case 'search':
        return (
          <div className="p-3">
            <h2 className="text-sm font-semibold text-zinc-400 mb-2 uppercase">Search (Simulated)</h2>
            <p className="mt-4 text-xs text-zinc-500">
              This panel would handle global text search across files.
            </p>
          </div>
        );
      case 'settings':
        return (
          <div className="p-3">
            <h2 className="text-sm font-semibold text-zinc-400 mb-2 uppercase">Settings (Simulated)</h2>
            <p className="text-sm text-zinc-400">Theme: Dark Mode (Default)</p>
            <p className="mt-4 text-xs text-zinc-500">
              This panel would allow configuration of the editor appearance.
            </p>
          </div>
        );
    }
    // Should never reach here, but TypeScript requires a return
    return <></>;
  };

  // --- Main Render ---

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-zinc-900 text-base font-inter">
      {/* 1. Title Bar (Simulated) */}
      <header className="flex items-center justify-between h-8 bg-zinc-800 text-zinc-300 shadow-lg px-3 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <Menu className="w-4 h-4 md:hidden cursor-pointer hover:text-white" onClick={() => setIsSidebarOpen(!isSidebarOpen)} />
          <span className="text-xs font-medium hidden sm:block">File | Edit | View | Go | Run | Terminal | Help</span>
        </div>
        <h1 className="text-sm font-mono tracking-widest text-center flex-grow">
          {activeFile?.name || 'Welcome'} — Portfolio
        </h1>
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer" title="Close"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 cursor-pointer" title="Minimize"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" title="Maximize"></div>
        </div>
      </header>

      {/* 2. Main Area: Activity Bar + Sidebar + Editor */}
      <div className="flex flex-grow overflow-hidden">
        {/* 2a. Activity Bar */}
       <div className="flex flex-col justify-between w-14 bg-zinc-900 border-r border-zinc-700 flex-shrink-0">
          <div className="flex flex-col">
            <EditorIcon
              icon={<Folder className="w-6 h-6" />}
              label="Explorer"
              isActive={activeMenu === 'explorer'}
              onClick={() => setActiveMenu('explorer')}
            />
            <EditorIcon
              icon={<FileText className="w-6 h-6" />}
              label="Search"
              isActive={activeMenu === 'search'}
              onClick={() => setActiveMenu('search')}
            />
            <EditorIcon
              icon={<Settings className="w-6 h-6" />}
              label="Settings"
              isActive={activeMenu === 'settings'}
              onClick={() => setActiveMenu('settings')}
            />
          </div>
          <div className="flex flex-col pb-2">
            <EditorIcon
              icon={<Github className="w-6 h-6" />}
              label="GitHub"
              isActive={false} // FIX: Added missing required prop
              onClick={() => window.open('https://github.com/your-username', '_blank')}
            />
          </div>
        </div>

        {/* 2b. Sidebar (Explorer/Other Menus) */}
        <div className={`flex-shrink-0 bg-zinc-800 transition-all duration-300 ease-in-out
          ${isSidebarOpen && activeMenu ? 'w-64 border-r border-zinc-700' : 'w-0 overflow-hidden'}`}>
          {activeMenu && renderSidebar()}
        </div>

        {/* 2c. Editor Area */}
        <div className="flex flex-col flex-grow min-w-0 bg-zinc-900">
          {/* Tabs Bar - UPDATED to use openTabs derived state */}
          <div className="flex h-10 bg-zinc-800 border-b border-zinc-700 flex-shrink-0 overflow-x-auto">
            {openTabs.map(file => {
              const Icon = file.icon as ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; // Type assertion
              return (
                <div
                  key={file.id}
                  onClick={() => setActiveTabId(file.id)}
                  className={`flex items-center px-4 cursor-pointer text-sm transition-colors duration-150 ease-in-out border-r border-zinc-700
                    ${activeTabId === file.id ? 'bg-zinc-700 text-white border-t-2 border-t-blue-500 -mt-px' : 'text-zinc-400 hover:bg-zinc-700/50 hover:text-white'}`}
                >
                  <Icon className={`w-3 h-3 mr-2 ${getLanguageColor(file.language)}`} />
                  {file.name}
                  {/* NEW: Close button */}
                  <X 
                    className="w-3 h-3 ml-3 hover:text-red-400" 
                    onClick={(e) => closeTab(e, file.id)}
                  />
                </div>
              );
            })}
          </div>

          {/* Code/Content Pane */}
          <div className="flex-grow overflow-y-auto min-h-0 relative bg-[#1e1e1e]">
            {activeFile ? (
              <FileRenderer activeFile={activeFile} />
            ) : (
              <div className="p-8 text-zinc-400">Select a file from the explorer to open it.</div>
            )}
          </div>

          {/* Terminal/Bottom Panel (Simulated) */}
          <div className="h-48 bg-zinc-800 border-t border-zinc-700 flex-shrink-0 p-2 overflow-y-auto hidden md:block">
            <div className="flex space-x-4 border-b border-zinc-700 mb-2">
              <span className="text-sm font-semibold text-zinc-400 cursor-pointer border-b-2 border-blue-500 text-white pb-1">
                Terminal
              </span>
              <span className="text-sm font-semibold text-zinc-500 cursor-pointer hover:text-white pb-1">
                Output
              </span>
            </div>
            <pre className="text-xs font-mono text-zinc-300">
              <span className="text-green-400">PS C:\User\Portfolio&gt; </span><span className="text-white">npm run dev</span>
              <br/>
              <span className="text-yellow-400">Next.js: </span>Local development server started at <span className="text-cyan-400">http://localhost:3000</span>
              <br/>
              <span className="text-green-400">PS C:\User\Portfolio&gt; </span>
            </pre>
          </div>
        </div>
      </div>

      {/* 3. Status Bar */}
      <footer className="flex items-center justify-between h-6 bg-blue-600 text-white text-xs px-3 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <Code className="w-3 h-3" />
          <span>Master</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>{activeFile ? activeFile.name : 'Welcome'}</span>
          <User className="w-3 h-3" />
          <span>{activeFile?.language.toUpperCase() || 'TypeScript'}</span>
        </div>
      </footer>
    </div>
  );
};

export default EditorLayout;