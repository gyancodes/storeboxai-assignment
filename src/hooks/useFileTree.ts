import { useState } from 'react';
import type { FileNode } from '../types';

export const useFileTree = (initialData: FileNode[]) => {
  const [tree, setTree] = useState<FileNode[]>(initialData);

  const insertNode = (treeData: FileNode[], parentId: string | null, name: string, isFolder: boolean): FileNode[] => {
    if (parentId === null) {
      return [...treeData, { id: Date.now().toString(), name, isFolder, children: isFolder ? [] : undefined, parentId: null }];
    }

    return treeData.map((node) => {
      if (node.id === parentId && node.isFolder) {
        return {
          ...node,
          children: [
            ...(node.children || []),
            { id: Date.now().toString(), name, isFolder, children: isFolder ? [] : undefined, parentId },
          ],
        };
      } else if (node.children) {
        return { ...node, children: insertNode(node.children, parentId, name, isFolder) };
      }
      return node;
    });
  };

  const deleteNode = (treeData: FileNode[], id: string): FileNode[] => {
    return treeData
      .filter((node) => node.id !== id)
      .map((node) => {
        if (node.children) {
          return { ...node, children: deleteNode(node.children, id) };
        }
        return node;
      });
  };

  const updateNode = (treeData: FileNode[], id: string, name: string): FileNode[] => {
    return treeData.map((node) => {
      if (node.id === id) {
        return { ...node, name };
      } else if (node.children) {
        return { ...node, children: updateNode(node.children, id, name) };
      }
      return node;
    });
  };

  const addFile = (parentId: string | null, name: string) => {
    setTree((prev) => insertNode(prev, parentId, name, false));
  };

  const addFolder = (parentId: string | null, name: string) => {
    setTree((prev) => insertNode(prev, parentId, name, true));
  };

  const removeNode = (id: string) => {
    setTree((prev) => deleteNode(prev, id));
  };

  const renameNode = (id: string, name: string) => {
    setTree((prev) => updateNode(prev, id, name));
  };

  return { tree, addFile, addFolder, removeNode, renameNode };
};
