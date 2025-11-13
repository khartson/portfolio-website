import React from 'react';

// Using lucide-react icons (assuming standard setup for a Next.js app)
// We'll use a simple file icon for the placeholder.
import { FileText } from 'lucide-react';

// The icon component used in the Activity Bar/Sidebar
interface EditorIconProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const EditorIcon: React.FC<EditorIconProps> = ({ icon, label, isActive, onClick }) => {
  const activeClass = isActive ? 'text-white border-l-2 border-l-yellow-400 bg-gray-700/50' : 'text-gray-400 hover:text-white hover:bg-gray-700/30';

  return (
    <div
      title={label}
      onClick={onClick}
      className={`
        w-full h-12 flex items-center justify-center cursor-pointer 
        transition-all duration-150 ${activeClass}
      `}
    >
      {icon}
    </div>
  );
};

export default EditorIcon;