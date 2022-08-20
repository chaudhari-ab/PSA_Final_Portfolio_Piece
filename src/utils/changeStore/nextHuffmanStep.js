import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";
import unfindTreeData from "../treeFunctions/unfindTreeData";
import findObjInTreeByChars from "../treeFunctions/findObjInTreeByChars";
import findParentOf from "../treeFunctions/findParentOf";
import appendNodeToHeap from "../treeFunctions/appendNodeToHeap";
import TreeNode from "../dataClasses/TreeNode";
import { getNewEncodingTree, getNewChart} from "./changeHuffmanDataOnInputChange";

export default function nextHuffmanStep() {
    const newAlgorithmProgress = { ...store.getState().algorithmProgress };
    const newData = { ...store.getState().data };
    const { nodeToRemove, nodeToInsert } = newAlgorithmProgress.huffman.algorithm;
    const { frequencies, heapTree, } = newData.huffman;
    let newHeapTree = { ...heapTree };
    unfindTreeData(newHeapTree, true);
    if (nodeToRemove) {
        //if there is a node to remove, keep bubbling it down the tree until it's a leaf and then remove it
        const stackObj = findObjInTreeByChars(newHeapTree, nodeToRemove.chars);
        if (stackObj.children.length === 0) {
            const parent = findParentOf(newHeapTree, stackObj.chars);
            if (parent) {
                if (parent.children[0].chars === stackObj.chars) {
                    parent.children.shift();
                }
                else {
                    parent.children.pop();
                }
            }
            else {
                newHeapTree = null;
            }
            //once a node is removed, add it to our list of extracted minimum frequency values
            newAlgorithmProgress.huffman.algorithm.extractedMins.push({chars: stackObj.chars, freq: stackObj.freq});
            if (newAlgorithmProgress.huffman.algorithm.extractedMins.length < 2) {
                newAlgorithmProgress.huffman.algorithm.nodeToRemove = newHeapTree;
                newHeapTree.selected = true;
                //if there is only one extracted minimum value, retrive the next by setting the current top of the tree
                //as the next node to remove
            }
            else {
                //if there are now two extracted minimum values, create a new node with both nodes as children
                //the nodes stored in the frequencies array will contain all previous children of the extracted
                //minimum values, which we will need for the encoding tree
                let newChild1;
                let newChild2;
                frequencies.forEach(freqObj => {
                    if (freqObj.chars === newAlgorithmProgress.huffman.algorithm.extractedMins[0].chars) {
                        newChild1 = freqObj;
                    }
                    if (freqObj.chars === newAlgorithmProgress.huffman.algorithm.extractedMins[1].chars) {
                        newChild2 = freqObj;
                    }
                });
                //remove the extracted nodes from the frequencies array
                newData.huffman.frequencies = frequencies.filter(freqObj => {
                    return (
                        freqObj.chars !== newAlgorithmProgress.huffman.algorithm.extractedMins[0].chars 
                        && freqObj.chars !== newAlgorithmProgress.huffman.algorithm.extractedMins[1].chars);
                });
                newAlgorithmProgress.huffman.algorithm.nodeToRemove = null;
                const newChars = newAlgorithmProgress.huffman.algorithm.extractedMins[0].chars + newAlgorithmProgress.huffman.algorithm.extractedMins[1].chars;
                const newFreq = newAlgorithmProgress.huffman.algorithm.extractedMins[0].freq + newAlgorithmProgress.huffman.algorithm.extractedMins[1].freq;
                const newTreeObj = new TreeNode(newChars, newFreq);
                const newHeapObj = new TreeNode(newChars, newFreq);
                //the new node we create will be a single node for the heap tree and a full branch consisting of 
                //all previous children for the encoding tree
                newTreeObj.assignChild(newChild1);                
                newTreeObj.assignChild(newChild2);
                newData.huffman.frequencies.push(newTreeObj);
                newData.huffman.encodingTree = getNewEncodingTree(newData.huffman.frequencies);
                newData.huffman.chart = getNewChart(newData.huffman.encodingTree);
                //set the new node as the node to insert back into the heap
                newAlgorithmProgress.huffman.algorithm.nodeToInsert = newHeapObj;
                if (newData.huffman.frequencies.length === 1) {
                    store.dispatch(updatePhase("completed"));
                }
            }
        }
        else {
            //bubble the node to remove down the heap tree
            const minIndex = (stackObj.children[1] && stackObj.children[1].freq < stackObj.children[0].freq) ? 1 : 0;
            const { chars, freq } = stackObj;
            stackObj.chars = stackObj.children[minIndex].chars;
            stackObj.freq = stackObj.children[minIndex].freq;
            stackObj.children[minIndex].chars = chars;
            stackObj.children[minIndex].freq = freq;
            stackObj.children[minIndex].selected = true;
            newAlgorithmProgress.huffman.algorithm.nodeToRemove = stackObj.children[minIndex];
        }
    }
    else if (nodeToInsert) {
        //if there is a node to insert, bubble it up the heap tree until it's in the correct position
        const stackObj = findObjInTreeByChars(newHeapTree, nodeToInsert.chars);
        if (stackObj) {
            stackObj.selected = true;
            const parent = findParentOf(newHeapTree, nodeToInsert.chars);
            if (parent && parent.freq > stackObj.freq) {
                const { chars, freq } = stackObj;
                    stackObj.chars = parent.chars;
                    stackObj.freq = parent.freq;
                    parent.chars = chars;
                    parent.freq = freq;
                    parent.selected = true;
                    newAlgorithmProgress.huffman.algorithm.nodeToInsert = parent;
            }
            else  {
                newHeapTree.selected = true;
                newAlgorithmProgress.huffman.algorithm.nodeToRemove = newHeapTree;
                newAlgorithmProgress.huffman.algorithm.nodeToInsert = null;
                newAlgorithmProgress.huffman.algorithm.extractedMins = [];
            }
        }
        else {
            nodeToInsert.selected = true;
            newHeapTree = appendNodeToHeap(newHeapTree, nodeToInsert);
        }
    }
    newData.huffman.heapTree = newHeapTree;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}
