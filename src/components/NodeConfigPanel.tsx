'use client';

import { Node } from 'reactflow';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface NodeConfigPanelProps {
  node: Node | null;
  onClose: () => void;
  onUpdateNodeData: (nodeId: string, data: any) => void;
}

const defaultConfigs: Record<string, Record<string, any>> = {
  Wait: {
    duration: 1000,
    unit: 'ms',
  },
  Call: {
    url: '',
    method: 'GET',
  },
  Video: {
    source: '',
    autoplay: false,
  },
};

export default function NodeConfigPanel({ node, onClose, onUpdateNodeData }: NodeConfigPanelProps) {
  if (!node) return null;

  const nodeType = node.data.type as keyof typeof defaultConfigs;
  const config = node.data.config || defaultConfigs[nodeType] || {};

  const handleConfigChange = (key: string, value: any) => {
    const newData = {
      ...node.data,
      config: {
        ...(node.data.config || defaultConfigs[nodeType] || {}),
        [key]: value,
      },
    };
    onUpdateNodeData(node.id, newData);
  };

  const handleLabelChange = (newLabel: string) => {
    const newData = {
      ...node.data,
      label: newLabel,
    };
    onUpdateNodeData(node.id, newData);
  };

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 flex flex-col h-full shadow-lg">
      <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
        <h3 className="text-lg font-semibold text-gray-900">Configure Node</h3>
        <button 
          onClick={onClose} 
          className="p-1.5 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-900">Label</label>
          <input
            type="text"
            value={node.data.label || ''}
            onChange={(e) => handleLabelChange(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>

        {Object.entries(config).map(([key, value]) => (
          <div key={key} className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-900">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            {typeof value === 'boolean' ? (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => handleConfigChange(key, e.target.checked)}
                  className="h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  {value ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ) : typeof value === 'number' ? (
              <input
                type="number"
                value={value}
                onChange={(e) => handleConfigChange(key, Number(e.target.value))}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            ) : (
              <input
                type="text"
                value={value || ''}
                onChange={(e) => handleConfigChange(key, e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 