'use client';

import { useState } from 'react';
import {
  PlusIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  ViewfinderCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import NodeSelector from './NodeSelector';

interface ToolbarProps {
  onAddNode: (type: string) => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onFitView?: () => void;
  onDelete?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  canDelete?: boolean;
}

export default function Toolbar({ 
  onAddNode, 
  onUndo, 
  onRedo, 
  onFitView,
  onDelete,
  canUndo = false,
  canRedo = false,
  canDelete = false,
}: ToolbarProps) {
  const [showNodeSelector, setShowNodeSelector] = useState(false);

  return (
    <>
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-4">
        <button
          onClick={() => setShowNodeSelector(true)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
          title="Add Node"
        >
          <PlusIcon className="w-6 h-6 text-gray-600" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
            Add Node
          </div>
        </button>

        <div className="w-8 h-px bg-gray-200 my-2" />

        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`p-2 rounded-lg transition-colors group relative ${
            canUndo ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Undo (Ctrl+Z)"
        >
          <ArrowUturnLeftIcon className="w-6 h-6" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
            Undo (Ctrl+Z)
          </div>
        </button>

        <button
          onClick={onRedo}
          disabled={!canRedo}
          className={`p-2 rounded-lg transition-colors group relative ${
            canRedo ? 'hover:bg-gray-100 text-gray-600' : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Redo (Ctrl+Shift+Z)"
        >
          <ArrowUturnRightIcon className="w-6 h-6" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
            Redo (Ctrl+Shift+Z)
          </div>
        </button>

        <div className="w-8 h-px bg-gray-200 my-2" />

        <button
          onClick={onDelete}
          disabled={!canDelete}
          className={`p-2 rounded-lg transition-colors group relative ${
            canDelete ? 'hover:bg-red-100 text-red-600' : 'text-gray-300 cursor-not-allowed'
          }`}
          title="Delete Selected (Delete)"
        >
          <TrashIcon className="w-6 h-6" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
            Delete Selected
          </div>
        </button>

        <button
          onClick={onFitView}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
          title="Fit View"
        >
          <ViewfinderCircleIcon className="w-6 h-6 text-gray-600" />
          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded hidden group-hover:block whitespace-nowrap">
            Fit View
          </div>
        </button>
      </div>

      {showNodeSelector && (
        <NodeSelector
          onSelectNode={onAddNode}
          onClose={() => setShowNodeSelector(false)}
        />
      )}
    </>
  );
} 