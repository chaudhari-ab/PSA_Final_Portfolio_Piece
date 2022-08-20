import unfindTreeData from "../treeFunctions/unfindTreeData";

const DIAM = 25;
const CHARS_TEXT = 14;
const FREQ_TEXT = 12;
const BIT_TEXT = 10;

export default function drawCircles(p, tree, type, treeInfo) {
    const stack = [tree];
    while (stack.length > 0) {
        const stackObj = stack[stack.length - 1];
        if (stackObj.children.length === 0) {
            stackObj.visited = true;
            drawOneCircle(p, stackObj, type, treeInfo);
            stack.pop();
        }
        else {
            if (!stackObj.visited) {
                stackObj.visited = true;
                stackObj.children.forEach(childObj => {
                    drawLine(p, stackObj, childObj, type, treeInfo);
                    if (!childObj.visited) {
                        stack.push(childObj);
                    }
                });
            }
            else {
                drawOneCircle(p, stackObj, type, treeInfo);
                stack.pop();
            }
        }
    }
    unfindTreeData(tree);
}

function drawOneCircle(p, stackObj, type, treeInfo) {
    const colorValue =  Math.floor(255 * (treeInfo.maxFrequency - stackObj.freq) / treeInfo.maxFrequency);
    const color = type === "encodingTree" ? `rgb(255,${colorValue}, ${colorValue})` : `rgb(${colorValue},${colorValue},255)`;
    const xCoord = (stackObj.coords.x + 0.5) * p.width / treeInfo.totalLeaves;
    const yCoord = (stackObj.coords.y + 0.5) * p.height / treeInfo.maxDepth;
    p.fill(color);
    p.stroke(0);
    p.strokeWeight(1);
    p.circle(xCoord, yCoord, DIAM * (stackObj.selected ? 1.3 : 1));
    p.fill(0);
    p.noStroke();
    if (stackObj.chars) {
        p.textSize(stackObj.chars.length > 1 ? CHARS_TEXT / 1.3 : CHARS_TEXT);
        p.textAlign(stackObj.chars.length > 1 ? p.LEFT : p.CENTER);
        p.text(
            stackObj.chars.replace(" ", "-"), 
            xCoord + (stackObj.chars.length > 1 ? DIAM / 2 + CHARS_TEXT / 5 : 0), 
            yCoord + CHARS_TEXT / (stackObj.chars.length > 1 ? 4 : 3)
        );
    }
    p.textAlign(p.CENTER);
    p.textSize(FREQ_TEXT);
    p.text(stackObj.freq, xCoord, yCoord + DIAM);

}

function drawLine(p, stackObj, childObj, type, treeInfo) {
    p.stroke(0);
    p.strokeWeight(2);
    const x1 = (stackObj.coords.x + 0.5) * p.width / treeInfo.totalLeaves;
    const y1 = (stackObj.coords.y + 0.5) * p.height / treeInfo.maxDepth;
    const x2 = (childObj.coords.x + 0.5) * p.width / treeInfo.totalLeaves;
    const y2 = (childObj.coords.y + 0.5) * p.height / treeInfo.maxDepth;
    p.line(x1, y1, x2, y2);
    if (type === "encodingTree") {
        const textX = (x1 + x2) / 2;
        const textY = (y1 + y2) / 2;
        p.fill(255);
        p.noStroke();
        p.circle(textX, textY, BIT_TEXT * 2);
        p.textSize(BIT_TEXT);
        p.fill(0);
        p.text(childObj.localWidthIndex, textX, textY + BIT_TEXT / 3);
    }
}