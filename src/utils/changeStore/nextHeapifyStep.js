import { store } from "../../index.js";
import {
    updateData,
    updateAlgorithmProgress
    } from "../../actions";
import findObjInTreeByChars from "../treeFunctions/findObjInTreeByChars";
import unfindTreeData from "../treeFunctions/unfindTreeData";
import { changePhase } from "./changeBasicInfo.js";

export default function nextHeapifyStep() {
    const newAlgorithmProgress = { ...store.getState().algorithmProgress };
    const newData = { ...store.getState().data };
    const { nodeToBubble, heapStack } = newAlgorithmProgress.huffman.heapify;
    const { heapTree } = newData.huffman;
    const newHeapTree = { ...heapTree };

    unfindTreeData(newHeapTree, true);
    if (heapStack.length === 0) {
        changePhase("solving");
        return;
    }
    if (nodeToBubble) {
        //if there is a node to bubble, check to see if it is in the correct position or else move it down the heap
        const bubbleObj = findObjInTreeByChars(newHeapTree, nodeToBubble.chars);
        if (bubbleObj.children.length === 0 
            || (bubbleObj.freq <= bubbleObj.children[0].freq && 
                (bubbleObj.children.length === 1 || bubbleObj.freq <= bubbleObj.children[1].freq))) {
            newAlgorithmProgress.huffman.heapify.nodeToBubble = null;
            bubbleObj.selected = true;
        }
        else {
            const minIndex = bubbleObj.children.length === 1 ? 0 : (bubbleObj.children[0].freq <= bubbleObj.children[1].freq ? 0 : 1);
            const { chars, freq } = bubbleObj;
            bubbleObj.chars = bubbleObj.children[minIndex].chars;
            bubbleObj.freq = bubbleObj.children[minIndex].freq;
            bubbleObj.selected = true;
            bubbleObj.children[minIndex].chars = chars;
            bubbleObj.children[minIndex].freq = freq;
            newAlgorithmProgress.huffman.heapify.nodeToBubble = bubbleObj.children[minIndex];
        }
    }
    else {
        //otherwise, use the stack to keep traversing the tree and making swaps.
        //whenever a swap is made, we must bubble the lower node down the tree until it's in the correct
        //position
        const stackObj = findObjInTreeByChars(newHeapTree, heapStack[heapStack.length - 1].chars);
        stackObj.selected = true;
        if (stackObj.children.length === 0
            || stackObj.children.length > 0 && stackObj.children.every(child => child.heapified)) {
                stackObj.heapified = true;
                newAlgorithmProgress.huffman.heapify.heapStack.pop();
                if (newAlgorithmProgress.huffman.heapify.heapStack.length === 0) {
                    changePhase("solving");
                    return;
                }
                else {
                    const parent = findObjInTreeByChars(
                        newHeapTree, 
                        newAlgorithmProgress.huffman.heapify.heapStack[newAlgorithmProgress.huffman.heapify.heapStack.length - 1].chars
                        );
                    if (parent.freq > stackObj.freq) {
                        const { chars, freq } = stackObj;
                        stackObj.chars = parent.chars;
                        stackObj.freq = parent.freq;
                        parent.chars = chars;
                        parent.freq = freq;
                        newAlgorithmProgress.huffman.heapify.nodeToBubble = stackObj;
                        newAlgorithmProgress.huffman.heapify.heapStack[newAlgorithmProgress.huffman.heapify.heapStack.length - 1] = parent;
                    }
                }
        }
        else {
            const pushIndex = stackObj.children.length > 1 && stackObj.children[0].heapified ? 1 : 0;
            newAlgorithmProgress.huffman.heapify.heapStack.push(stackObj.children[pushIndex]);
        }
    }
    newData.huffman.heapTree = newHeapTree;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}