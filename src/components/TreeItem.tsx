import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Edit2, Trash2, Check, X, FilePlus, FolderPlus } from 'lucide-react';
import type { FileNode } from '../types';

interface TreeItemProps {
  node: FileNode;
  onAddFile: (parentId: string | null, name: string) => void;
  onAddFolder: (parentId: string | null, name: string) => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, onAddFile, onAddFolder, onDelete, onRename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(node.name);

  const handleToggle = () => {
    if (node.isFolder) {
      setIsOpen(!isOpen);
    }
  };

  const handleRename = () => {
    if (editName.trim() && editName !== node.name) {
      onRename(node.id, editName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleRename();
    if (e.key === 'Escape') {
      setEditName(node.name);
      setIsEditing(false);
    }
  };

  return (
    <div className="ml-4">
      <div 
        className="group flex items-center py-1.5 px-3 hover:bg-blue-50 rounded-lg transition-all cursor-pointer relative"
        onClick={handleToggle}
      >
        <span className="w-5 h-5 flex items-center justify-center mr-1">
          {node.isFolder && (
            isOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
          )}
        </span>
        
        <span className="mr-2.5">
          {node.isFolder ? (
            <Folder className={`w-4.5 h-4.5 ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} />
          ) : (
            <File className="w-4.5 h-4.5 text-slate-400 group-hover:text-blue-500" />
          )}
        </span>

        {isEditing ? (
          <div className="flex items-center gap-1.5 flex-1" onClick={e => e.stopPropagation()}>
            <input
              autoFocus
              className="bg-white border border-blue-500 text-slate-900 px-2 py-0.5 rounded text-sm w-full outline-none"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleRename} className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={() => { setIsEditing(false); setEditName(node.name); }} className="p-1 text-slate-400 hover:bg-slate-100 rounded transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 flex-1 truncate transition-colors">{node.name}</span>
            <div className="flex opacity-0 group-hover:opacity-100 items-center gap-1 ml-2 transition-opacity">
              {node.isFolder && (
                <>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddFile(node.id, 'new-file.txt'); }}
                    className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-white rounded transition-all"
                    title="New File"
                  >
                    <FilePlus className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddFolder(node.id, 'new-folder'); }}
                    className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-white rounded transition-all"
                    title="New Folder"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button 
                onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
                className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-white rounded transition-all"
                title="Rename"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); onDelete(node.id); }}
                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded transition-all"
                title="Delete"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </>
        )}
      </div>

      {node.isFolder && isOpen && node.children && (
        <div className="border-l border-slate-100 ml-3.5 mt-0.5">
          {node.children.map((child) => (
            <TreeItem 
              key={child.id} 
              node={child} 
              onAddFile={onAddFile}
              onAddFolder={onAddFolder}
              onDelete={onDelete}
              onRename={onRename}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeItem;
