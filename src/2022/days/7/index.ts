// https://adventofcode.com/2022/day/7
import { getEntries } from 'utils';

type Node = {
  parentId: string | null;
  type: 'dir' | 'file';
  fileSize: number | null;
};

type Nodes = Record<string, Node>;

type DirectoriesBySize = Record<string, number>;

const maxTotalSize = 100000;

const getNodes = (commands: string[]): Nodes => {
  const nodes = {} as Nodes;
  let currentDir = null;
  let pwd = '/';
  for (let i = 0; i < commands.length; i++) {
    const command = commands[i];
    if (command.includes('$ cd')) {
      // changing directory
      const dir = command.split(' ')[2];
      if (dir === '..' && currentDir && currentDir !== '/') {
        currentDir = nodes[currentDir]?.parentId;
      } else {
        if (!nodes[dir]) {
          nodes[dir] = {
            parentId: currentDir,
            type: 'dir',
            fileSize: null,
          };
        }
        currentDir = dir;
      }
    }
    if (command.includes('$ ls')) {
      // listing directory
      for (let j = i + 1; j < commands.length; j++) {
        const nextCommand = commands[j];
        if (!nextCommand.includes('$ ')) {
          const filelisting = nextCommand.split(' ');
          const fileSize = filelisting[0];
          const fileName = filelisting[1];
          if (fileSize !== 'dir') {
            nodes[fileName] = {
              parentId: currentDir,
              type: 'file',
              fileSize: parseInt(fileSize),
            };
          }
        } else {
          i = j - 1;
          break;
        }
      }
    }
  }
  return nodes;
};

const addToParentDir = (
  nodes: Nodes,
  node: Node,
  directories: DirectoriesBySize,
  fileSize: number
) => {
  const dir = node.parentId;
  if (dir) {
    directories[dir] += fileSize || 0;
    addToParentDir(nodes, nodes[dir], directories, fileSize);
  }
};

const getDirectorySizes = (nodes: Nodes): DirectoriesBySize => {
  let directories = {} as DirectoriesBySize;
  for (const nodeKey in nodes) {
    const node = nodes[nodeKey];
    // first sort the files and dirs and get total file size
    if (node.type === 'dir') {
      // add dir entry
      directories[nodeKey] = 0;
    }

    if (node.type == 'file') {
      if (node.parentId && node.fileSize) {
        // add up the file size to the parent dir
        // directories[node.parentId] += node.fileSize;
        // console.log('directories', directories);
        // add the new file size to all parents
        addToParentDir(nodes, node, directories, node.fileSize || 0);
      }
    }

    console.log('directories', directories);
  }

  // // final step - compound any child dir sizes into their parent total size
  // for (const dirKey in directories) {
  //   const parentId = nodes[dirKey].parentId;
  //   if (parentId) {
  //     const dirSize = directories[dirKey];
  //     directories[parentId] += dirSize;
  //   }
  // }
  return directories;
};

// What is the sum of the total sizes of those directories?
export const part1 = (pathToFile: string): number => {
  const commands = getEntries(pathToFile);
  const nodes = getNodes(commands);
  console.log('nodes', nodes);
  let totalDirSizeUnderMax = 0 as number;
  const dirSizes = getDirectorySizes(nodes);
  for (const dirSizesKey in dirSizes) {
    const dirSize = dirSizes[dirSizesKey];
    if (dirSize <= maxTotalSize) {
      totalDirSizeUnderMax += dirSize;
    }
  }
  console.log(
    'The sum of the total sizes of the directories is',
    totalDirSizeUnderMax
  );
  return totalDirSizeUnderMax;
};

const run = (pathToFile: string) => {
  console.log('Day 7:');
  part1(pathToFile);
};

export default run;
