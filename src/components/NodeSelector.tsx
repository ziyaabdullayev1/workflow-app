'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface NodeType {
  type: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface NodeSelectorProps {
  onSelectNode: (type: string) => void;
  onClose: () => void;
}

import {
  ClockIcon,
  PhoneIcon,
  VideoCameraIcon,
  EnvelopeIcon,
  CloudIcon,
  CodeBracketIcon,
  DocumentTextIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const nodeTypes: NodeType[] = [
  {
    type: 'Wait',
    category: 'Flow Control',
    description: 'Wait for a specified duration',
    icon: ClockIcon,
  },
  {
    type: 'Call',
    category: 'Communication',
    description: 'Make an API call',
    icon: PhoneIcon,
  },
  {
    type: 'Video',
    category: 'Media',
    description: 'Process video content',
    icon: VideoCameraIcon,
  },
  {
    type: 'Email',
    category: 'Communication',
    description: 'Send an email',
    icon: EnvelopeIcon,
  },
  {
    type: 'HTTP',
    category: 'Integration',
    description: 'Make HTTP requests',
    icon: CloudIcon,
  },
  {
    type: 'Code',
    category: 'Programming',
    description: 'Execute custom code',
    icon: CodeBracketIcon,
  },
  {
    type: 'Document',
    category: 'Data',
    description: 'Process documents',
    icon: DocumentTextIcon,
  },
  {
    type: 'Chat',
    category: 'Communication',
    description: 'Send chat messages',
    icon: ChatBubbleLeftIcon,
  },
];

const categories = Array.from(new Set(nodeTypes.map(node => node.category)));

export default function NodeSelector({ onSelectNode, onClose }: NodeSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredNodes = nodeTypes.filter(node => {
    const matchesSearch = node.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         node.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || node.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-[600px] max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 bg-gray-50 rounded-md px-3 py-2">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search nodes..."
              className="bg-transparent border-none outline-none flex-1 text-sm text-gray-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-hidden flex">
          <div className="w-40 border-r border-gray-200 p-2 overflow-y-auto bg-gray-50">
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                !selectedCategory ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium ${
                  selectedCategory === category ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              {filteredNodes.map(node => (
                <button
                  key={node.type}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 text-left border border-gray-100 hover:border-gray-200 transition-colors"
                  onClick={() => {
                    onSelectNode(node.type);
                    onClose();
                  }}
                >
                  <node.icon className="w-6 h-6 text-blue-600 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-900">{node.type}</div>
                    <div className="text-sm text-gray-600">{node.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 flex justify-end bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md border border-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 