'use client';

import { Handle, Position, NodeProps } from 'reactflow';

interface CustomNodeData {
  label: string;
  type: string;
  config?: Record<string, any>;
}

export default function CustomNode({ data, selected }: NodeProps<CustomNodeData>) {
  return (
    <div className={`px-4 py-2 shadow-lg rounded-md border-2 ${
      selected ? 'border-blue-500' : 'border-gray-200'
    } bg-white min-w-[150px]`}>
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-gray-400" />
      
      <div className="flex flex-col gap-1">
        <div className="text-xs text-gray-500 font-medium">{data.type}</div>
        <div className="text-sm font-semibold">{data.label}</div>
        {data.config && (
          <div className="text-xs text-gray-400 mt-1">
            {Object.entries(data.config).map(([key, value]) => (
              <div key={key}>
                {key}: {value.toString()}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-gray-400" />
    </div>
  );
} 