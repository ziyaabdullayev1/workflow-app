'use client';

import {
  DocumentDuplicateIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

interface TopBarProps {
  onSave: () => void;
  onLoad: () => void;
  onClear: () => void;
}

export default function TopBar({ onSave, onLoad, onClear }: TopBarProps) {
  return (
    <div className="h-16 border-b border-gray-200 flex items-center px-4 gap-2 bg-white">
      <input
        type="text"
        placeholder="My Workflow"
        className="text-lg font-medium bg-transparent border-none outline-none flex-1"
      />
      <div className="flex items-center gap-2">
        <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1">
          <DocumentDuplicateIcon className="w-4 h-4" />
          Templates
        </button>
        <button 
          onClick={onSave}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Save
        </button>
        <button 
          onClick={onLoad}
          className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-1"
        >
          <ArrowUpTrayIcon className="w-4 h-4" />
          Load
        </button>
        <button 
          onClick={onClear}
          className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors flex items-center gap-1"
        >
          <TrashIcon className="w-4 h-4" />
          Clear
        </button>
      </div>
    </div>
  );
} 