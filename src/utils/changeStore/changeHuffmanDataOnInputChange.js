import { store } from "../../index.js";
import { updateData } from "../../actions";
import TreeNode from "../dataClasses/TreeNode";
import unfindTreeData from "../treeFunctions/unfindTreeData.js";
import appendNodeToHeap from "../treeFunctions/appendNodeToHeap";

export default function changeHuffmanDataOnInputChange(newInput) {
    let payload = { ...store.getState().data };
    if (newInput.length > 0) {
        const frequencies = getNewFrequencies(newInput);
        const heapTree = getNewHeapTreeFromFrequencies(frequencies);
        const encodingTree = getNewEncodingTree(frequencies);
        const chart = getNewChart(encodingTree);
        payload.huffman = {
            ...payload.huffman,
            frequencies,
            encodingTree,
            heapTree,
            chart,
            input: newInput
        }
    }
    else {
        payload.huffman = {
            frequencies: [],
            encodingTree: null,
            heapTree: null,
            chart: [],
            input: ""
        }
    }
    store.dispatch(updateData(payload));
}

//returns list of characters and frequencies as an array of objects of class TreeNode
function getNewFrequencies(input) {
    const hashSet = {};
    const frequencies = [];
    for (let i = 0; i < input.length; i++) {
        const alpha = input[i];
        if (!hashSet[alpha] && hashSet[alpha] !== 0) {
            hashSet[alpha] = frequencies.length;
            const node = new TreeNode(alpha, 1)
            frequencies.push(node);
        }
        else {
            const index = hashSet[alpha];
            frequencies[index].freq++;
        }
    }
    return frequencies;
}

//takes nodes from frequencies array and puts them in tree structure (does not sort them yet)
export function getNewHeapTreeFromFrequencies(frequencies) {
    if (frequencies.length === 0) {
        return [];
    }
    let heapTree = new TreeNode(frequencies[0].chars, frequencies[0].freq);
    for (let i = 1; i < frequencies.length; i++) {
        const newNode = new TreeNode(frequencies[i].chars, frequencies[i].freq); 
        heapTree = appendNodeToHeap(heapTree, newNode);
    }
    return heapTree;
}

//takes nodes from frequencies array and puts them as leaves in tree structure.
//the higher order nodes will not have characters but will have frequencies equal to the
//sum of the frequencies of the leaves underneath them
export function getNewEncodingTree(frequencies) {
    let tree = [ ...frequencies];
    while (tree.length > 1) {
        const nextTreeStep = [];
        for (let i = 0; i < tree.length; i += 2) {
            let branch;
            if (i + 1 < tree.length) {
                branch = new TreeNode;
                const newNode1 = tree[i].copy();
                const newNode2 = tree[i + 1].copy();
                branch.assignChild(newNode1);
                branch.assignChild(newNode2);
            }
            else {
                branch = tree[i].copy();
            }
            nextTreeStep.push(branch);
        }
        tree = nextTreeStep;
    }
    return tree[0];
}

//for each leaf of the tree, retrieves a list of paths from top node to leaf, assining them as 
//zeroes and ones in a string
export function getNewChart(tree) {
    let chart = [];
    let stack = [tree];
    while (stack.length > 0) {
        const stackObj = stack[stack.length - 1];
        if (stackObj.children.length === 0) {
            chart.push(getChartObj(stackObj));
            stackObj.visited = true;
            stack.pop();
        }
        else if (stackObj.children.every(child => child.visited)) {
            stackObj.visited = true;
            stack.pop();
        }
        else {
            if (stackObj.children.length > 1) {
                stack.push(stackObj.children[1]);
            }
            if (!stackObj.children[0].visited) {
                stack.push(stackObj.children[0]);
            }
        }
    }
    unfindTreeData(tree);
    return chart;
}

//uses parent property of TreeNode objects to traverse the tree from each leaf to the top node
//in order to retrieve the bit code for each character
function getChartObj(stackObj) {
    const bitCodeArray = [];
    let pointer = stackObj;
    while (pointer.parent) {
        bitCodeArray.push(pointer.localWidthIndex);
        pointer = pointer.parent;
    }
    return {char: stackObj.chars, freq: stackObj.freq, code: bitCodeArray.reverse().join("")};
}
