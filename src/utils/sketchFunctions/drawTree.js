import unfindTreeData from "../treeFunctions/unfindTreeData";
import drawCircles from "../sketchFunctions/drawCirclesHuffman";


export default function drawTree(p, tree, type) {
    if (Object.keys(tree).length === 0) {
        return;
    }
    unfindTreeData(tree);
    const treeInfo = assignCoordinatesAndFrequencies(tree);
    drawCircles(p, tree, type, treeInfo);
}

function assignCoordinatesAndFrequencies(tree) {
    if (!tree.freq && tree.children.length === 0) {
        return { totalLeaves: 0, maxDepth: 0, maxFrequency: 0 };
    }
    let totalLeaves = 0;
    let maxDepth = 1;
    let maxFrequency = 0;
    const stack = [tree];
    while (stack.length > 0) {
        const stackObj = stack[stack.length - 1];
        if (stackObj.children.length === 0) {
            if (stack.length > maxDepth) {
                maxDepth = stack.length;
            }
            if (stackObj.freq > maxFrequency) {
                maxFrequency = stackObj.freq;
            }
            stackObj.coords = {x: totalLeaves, y: stack.length - 1}
            stackObj.visited = true;
            totalLeaves++;
            stack.pop();
        }
        else {
            if (!stackObj.children[0].visited) {
                stack.push(stackObj.children[0]);
            }
            else if (stackObj.children.length > 1 && !stackObj.children[1].visited) {
                stack.push(stackObj.children[1]);
            }
            else {
                stackObj.visited = true;
                const x1 = stackObj.children[0].coords.x;
                const x2 = stackObj.children.length > 1 ? stackObj.children[1].coords.x : x1;
                stackObj.coords = {x: (x1 + x2) / 2, y: stack.length - 1}
                const freq1 = stackObj.children[0].freq;
                const freq2 = stackObj.children.length > 1 ? stackObj.children[1].freq : 0;
                stackObj.freq = stackObj.freq ? stackObj.freq : freq1 + freq2;
                if (stackObj.freq > maxFrequency) {
                    maxFrequency = stackObj.freq;
                }
                stack.pop();
            }
        }
    }
    unfindTreeData(tree);
    return { totalLeaves, maxDepth, maxFrequency}
}
