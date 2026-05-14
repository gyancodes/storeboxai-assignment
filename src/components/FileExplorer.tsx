import React from 'react';
import { FilePlus, FolderPlus } from 'lucide-react';
import TreeItem from './TreeItem';
import { useFileTree } from '../hooks/useFileTree';
import type { FileNode } from '../types';

const FileExplorer: React.FC = () => {
  const { tree, addFile, addFolder, removeNode, renameNode } = useFileTree([
    {
      id: '1',
      name: 'src',
      isFolder: true,
      parentId: null,
      children: [
        { id: '2', name: 'App.tsx', isFolder: false, parentId: '1' },
        { id: '3', name: 'index.css', isFolder: false, parentId: '1' },
      ],
    },
    { id: '4', name: 'package.json', isFolder: false, parentId: null },
  ]);

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden font-sans">
      <div className="bg-slate-50/50 p-6 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-slate-900 font-bold text-xl tracking-tight">
              Explorer
            </h2>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => addFile(null, 'new-file.txt')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold transition-all active:scale-95"
            >
              <FilePlus className="w-4 h-4" />
              New File
            </button>
            <button 
              onClick={() => addFolder(null, 'new-folder')}
              className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-sm font-semibold transition-all active:scale-95"
            >
              <FolderPlus className="w-4 h-4" />
              New Folder
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 min-h-[400px] max-h-[600px] overflow-y-auto custom-scrollbar bg-white">
        {tree.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-400 py-32 border border-dashed border-slate-200 rounded-xl">
            <FolderPlus className="w-8 h-8 mb-3 opacity-20" />
            <p className="text-sm font-medium">No files found</p>
          </div>
        ) : (
          <div className="-ml-4 space-y-0.5">
            {tree.map((node) => (
              <TreeItem
                key={node.id}
                node={node}
                onAddFile={addFile}
                onAddFolder={addFolder}
                onDelete={removeNode}
                onRename={renameNode}
              />
            ))}
          </div>
        )}
      </div>

      
    </div>
  );
};

export default FileExplorer;
