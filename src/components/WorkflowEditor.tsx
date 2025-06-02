'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  BackgroundVariant,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  Edge,
  Connection,
  addEdge,
  NodeTypes,
  useReactFlow,
  MiniMap,
  ReactFlowProvider,
  useOnSelectionChange,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Toolbar from './Toolbar';
import TopBar from './TopBar';
import CustomNode from './nodes/CustomNode';
import NodeConfigPanel from './NodeConfigPanel';

const nodeTypes: NodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

function WorkflowEditorContent() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<Node[]>([]);
  const [selectedEdges, setSelectedEdges] = useState<Edge[]>([]);
  
  // History management
  const [history, setHistory] = useState<HistoryState[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const isApplyingHistory = useRef(false);
  const historyTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const { fitView } = useReactFlow();

  // Track selections
  useOnSelectionChange({
    onChange: ({ nodes, edges }) => {
      setSelectedNodes(nodes);
      setSelectedEdges(edges);
    },
  });

  const saveToHistory = useCallback((newNodes: Node[], newEdges: Edge[]) => {
    if (isApplyingHistory.current) {
      return;
    }

    // Clear any pending timeout
    if (historyTimeoutRef.current) {
      clearTimeout(historyTimeoutRef.current);
    }

    // Debounce history saves to prevent too many entries
    historyTimeoutRef.current = setTimeout(() => {
      setHistory(prev => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push({ nodes: [...newNodes], edges: [...newEdges] });
        return newHistory;
      });
      
      setHistoryIndex(prev => prev + 1);
    }, 100);
  }, [historyIndex]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const handleUndo = useCallback(() => {
    if (!canUndo || isApplyingHistory.current) return;

    const newIndex = historyIndex - 1;
    if (newIndex >= 0 && history[newIndex]) {
      isApplyingHistory.current = true;
      
      const { nodes: prevNodes, edges: prevEdges } = history[newIndex];
      
      setNodes([...prevNodes]);
      setEdges([...prevEdges]);
      setHistoryIndex(newIndex);
      setSelectedNode(null);
      
      // Reset flag immediately since we're not saving to history
      isApplyingHistory.current = false;
    }
  }, [canUndo, history, historyIndex]);

  const handleRedo = useCallback(() => {
    if (!canRedo || isApplyingHistory.current) return;

    const newIndex = historyIndex + 1;
    if (newIndex < history.length && history[newIndex]) {
      isApplyingHistory.current = true;
      
      const { nodes: nextNodes, edges: nextEdges } = history[newIndex];
      
      setNodes([...nextNodes]);
      setEdges([...nextEdges]);
      setHistoryIndex(newIndex);
      setSelectedNode(null);
      
      // Reset flag immediately since we're not saving to history
      isApplyingHistory.current = false;
    }
  }, [canRedo, history, historyIndex]);

  const deleteSelected = useCallback(() => {
    if (selectedNodes.length === 0 && selectedEdges.length === 0) return;

    const selectedNodeIds = selectedNodes.map(node => node.id);
    const selectedEdgeIds = selectedEdges.map(edge => edge.id);

    const newNodes = nodes.filter(node => !selectedNodeIds.includes(node.id));
    const newEdges = edges.filter(edge => 
      !selectedEdgeIds.includes(edge.id) && 
      !selectedNodeIds.includes(edge.source) && 
      !selectedNodeIds.includes(edge.target)
    );

    setNodes(newNodes);
    setEdges(newEdges);
    setSelectedNode(null);
    saveToHistory(newNodes, newEdges);
  }, [selectedNodes, selectedEdges, nodes, edges, saveToHistory]);

  const onNodesChange = useCallback((changes: any) => {
    setNodes((nds) => {
      const updatedNodes = applyNodeChanges(changes, nds);
      
      // Only save to history for position changes (drag end) or removals
      const hasPositionChange = changes.some((change: any) => 
        change.type === 'position' && change.dragging === false
      );
      const hasRemoval = changes.some((change: any) => change.type === 'remove');
      
      if (hasPositionChange || hasRemoval) {
        saveToHistory(updatedNodes, edges);
      }
      
      // Update selected node if it was moved
      const changedNode = changes.find((change: any) => 
        change.type === 'position' && change.id === selectedNode?.id
      );
      if (changedNode) {
        const updatedNode = updatedNodes.find((node) => node.id === changedNode.id);
        if (updatedNode) {
          setSelectedNode(updatedNode);
        }
      }
      
      return updatedNodes;
    });
  }, [selectedNode, edges, saveToHistory]);

  const onEdgesChange = useCallback((changes: any) => {
    setEdges((eds) => {
      const updatedEdges = applyEdgeChanges(changes, eds);
      
      // Save to history for edge removal
      const hasRemoval = changes.some((change: any) => change.type === 'remove');
      if (hasRemoval) {
        saveToHistory(nodes, updatedEdges);
      }
      
      return updatedEdges;
    });
  }, [nodes, saveToHistory]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => {
      const updatedEdges = addEdge(params, eds);
      saveToHistory(nodes, updatedEdges);
      return updatedEdges;
    });
  }, [nodes, saveToHistory]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const addNewNode = useCallback((type: string) => {
    const newNode = {
      id: `node_${Date.now()}`,
      type: 'custom',
      data: { 
        label: type,
        type: type,
      },
      position: { x: 250, y: 100 + nodes.length * 100 },
    };
    
    const updatedNodes = [...nodes, newNode];
    setNodes(updatedNodes);
    saveToHistory(updatedNodes, edges);
  }, [nodes, edges, saveToHistory]);

  const updateNodeData = useCallback((nodeId: string, newData: any) => {
    setNodes((nds) => {
      const updatedNodes = nds.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: newData,
          };
          if (selectedNode?.id === nodeId) {
            setSelectedNode(updatedNode);
          }
          return updatedNode;
        }
        return node;
      });
      
      saveToHistory(updatedNodes, edges);
      return updatedNodes;
    });
  }, [selectedNode, edges, saveToHistory]);

  const onSave = useCallback(() => {
    const flow = { 
      nodes, 
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0'
    };
    
    try {
      localStorage.setItem('workflow', JSON.stringify(flow));
      
      // Also create a downloadable file
      const dataStr = JSON.stringify(flow, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = `workflow_${new Date().toISOString().slice(0,10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      // Show success message (you could replace this with a toast notification)
      console.log('Workflow saved successfully!');
    } catch (error) {
      console.error('Failed to save workflow:', error);
    }
  }, [nodes, edges]);

  const onLoad = useCallback(() => {
    const flow = localStorage.getItem('workflow');
    if (flow) {
      try {
        const { nodes: savedNodes, edges: savedEdges } = JSON.parse(flow);
        setNodes(savedNodes);
        setEdges(savedEdges);
        setSelectedNode(null);
        setHistory([{ nodes: savedNodes, edges: savedEdges }]);
        setHistoryIndex(0);
        console.log('Workflow loaded successfully!');
      } catch (error) {
        console.error('Failed to load workflow:', error);
      }
    }
  }, []);

  const onClear = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNode(null);
    setHistory([{ nodes: [], edges: [] }]);
    setHistoryIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      // Prevent default for our shortcuts
      if ((event.metaKey || event.ctrlKey) && event.key === 'z' && !event.repeat) {
        event.preventDefault();
        if (event.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      
      // Delete key for selected items
      if (event.key === 'Delete' || event.key === 'Backspace') {
        if (selectedNodes.length > 0 || selectedEdges.length > 0) {
          event.preventDefault();
          deleteSelected();
        }
      }
      
      // Ctrl+S for save
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        onSave();
      }
    };

    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [handleUndo, handleRedo, deleteSelected, selectedNodes, selectedEdges, onSave]);

  const getNodeColor = (node: Node) => {
    switch (node.data.type) {
      case 'Wait':
        return '#3b82f6';
      case 'Call':
        return '#10b981';
      case 'Video':
        return '#ef4444';
      case 'Email':
        return '#f59e0b';
      case 'HTTP':
        return '#8b5cf6';
      case 'Code':
        return '#06b6d4';
      case 'Document':
        return '#84cc16';
      case 'Chat':
        return '#ec4899';
      default:
        return '#6b7280';
    }
  };

  return (
    <div className="w-full h-screen flex">
      <Toolbar 
        onAddNode={addNewNode}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onFitView={() => fitView()}
        onDelete={deleteSelected}
        canUndo={canUndo}
        canRedo={canRedo}
        canDelete={selectedNodes.length > 0 || selectedEdges.length > 0}
      />
      <div className="flex-1 flex flex-col">
        <TopBar onSave={onSave} onLoad={onLoad} onClear={onClear} />
        <div className="flex-1 h-full flex">
          <div className="flex-1">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              deleteKeyCode={null} // We handle delete ourselves
            >
              <Background 
                variant={BackgroundVariant.Dots} 
                gap={20} 
                size={1} 
                color="#e5e7eb"
              />
              <Controls 
                style={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <MiniMap 
                nodeColor={getNodeColor}
                nodeStrokeColor={(node) => {
                  return node.selected ? '#1d4ed8' : '#d1d5db';
                }}
                nodeStrokeWidth={2}
                nodeBorderRadius={4}
                style={{
                  background: '#f9fafb',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                maskColor="rgba(100, 116, 139, 0.1)"
                position="bottom-right"
              />
            </ReactFlow>
          </div>
          {selectedNode && (
            <NodeConfigPanel
              node={selectedNode}
              onClose={() => setSelectedNode(null)}
              onUpdateNodeData={updateNodeData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkflowEditor() {
  return (
    <ReactFlowProvider>
      <WorkflowEditorContent />
    </ReactFlowProvider>
  );
} 