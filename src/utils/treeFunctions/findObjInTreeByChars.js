import unfindTreeData from "./unfindTreeData";

export default function findObjInTreeByChars(tree, chars) {
    unfindTreeData(tree);
    const localStack = [tree];
    while (localStack.length > 0) {
        const stackObj = localStack[localStack.length - 1];
        if (stackObj.chars === chars) {
            return stackObj;
        }
        if (stackObj.children.length === 0) {
            stackObj.visited = true;
            localStack.pop();
        }
        else {
            if (!stackObj.children[0].visited) {
                localStack.push(stackObj.children[0]);
            }
            else if (stackObj.children.length > 1 && !stackObj.children[1].visited) {
                localStack.push(stackObj.children[1]);
            }
            else {
                stackObj.visited = true;
                localStack.pop();
            }
        }
    }
    unfindTreeData(tree);
    return null;
}