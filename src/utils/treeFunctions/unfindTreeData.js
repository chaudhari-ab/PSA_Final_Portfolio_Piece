export default function unfindTreeData(treeData, removeSelected=false) {
    if (Object.keys(treeData).length === 0) {
        return;
    }
    let stack = [treeData];
    let phase = 1;
    while (phase <= 2) {
        const stackObj = stack[stack.length - 1];
        if (stackObj.children.length === 0) {
            stackObj.visited = false;
            stackObj.searched = phase === 1;
            if (removeSelected) {
                stackObj.selected = false;
            }
            stack.pop();
        }
        else {
            if (stackObj.children[0].searched === (phase === 2) || stackObj.children[0].searched === undefined) {
                stack.push(stackObj.children[0]);
            }
            else if (stackObj.children.length > 1) {
                if (stackObj.children[1].searched === (phase === 2) || stackObj.children[1].searched === undefined) {
                    stack.push(stackObj.children[1]);
                }
                else {
                    stackObj.visited = false;
                    stackObj.searched = phase === 1;
                    if (removeSelected) {
                        stackObj.selected = false;
                    }
                    stack.pop();
                }
            }
            else {
                stackObj.visited = false;
                stackObj.searched = phase === 1;
                if (removeSelected) {
                    stackObj.selected = false;
                }
                stack.pop();
            }
        }
        if (stack.length === 0) {
            stack = [treeData];
            phase++;
        }
    }
}