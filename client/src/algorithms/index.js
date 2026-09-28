import { binarySearchData } from './binarySearch';
import { bubbleSortData } from './bubbleSort';
import { selectionSortData } from './selectionSort';
import { insertionSortData } from './insertionSort';
import { mergeSortData } from './mergeSort';
import { quickSortData } from './quickSort';
import { kadanesAlgorithmData } from './kadanesAlgorithm';
import { dutchNationalFlagData } from './dutchNationalFlag';
import { kmpData } from './kmp';
import { knapsackData } from './knapsack';
import { lcsData } from './lcs';
import { floydWarshallData } from './floydWarshall';
import { nQueensData } from './nQueens';
import { aStarData } from './aStar';
import { bstData } from './bst';
import { treeTraversalsData } from './treeTraversals';
import { trieData } from './trie';
import { bfsData } from './bfs';
import { dfsData } from './dfs';
import { dijkstrasData } from './dijkstras';
import { kahnsData } from './kahns';
import { bellmanFordData } from './bellmanFord';
import { primsData } from './prims';
import { kruskalsData } from './kruskals';
import { tarjansData } from './tarjans';

export const algorithms = {
  binarySearch: binarySearchData,
  bubbleSort: bubbleSortData,
  selectionSort: selectionSortData,
  insertionSort: insertionSortData,
  mergeSort: mergeSortData,
  quickSort: quickSortData,
  kadanesAlgorithm: kadanesAlgorithmData,
  dutchNationalFlag: dutchNationalFlagData,
  kmp: kmpData,
  knapsack: knapsackData,
  lcs: lcsData,
  floydWarshall: floydWarshallData,
  nQueens: nQueensData,
  aStar: aStarData,
  bst: bstData,
  treeTraversals: treeTraversalsData,
  trie: trieData,
  bfs: bfsData,
  dfs: dfsData,
  kahns: kahnsData,
  dijkstras: dijkstrasData,
  bellmanFord: bellmanFordData,
  prims: primsData,
  kruskals: kruskalsData,
  tarjans: tarjansData
};

export const algorithmList = Object.values(algorithms).map(algo => ({
  id: algo.id,
  name: algo.name,
  category: algo.category,
  description: algo.description
}));
