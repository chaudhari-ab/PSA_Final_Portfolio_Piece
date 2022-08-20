export default function appendNodeToHeap(heapTree, nodeToInsert) {
    let maxDepth = 1;
    let inserted = false;
    let searchPhase = 1
    let queue = [heapTree];
    while (!inserted) {
        if (queue.length === 0) {
            queue = [heapTree];
            searchPhase++;
        }
        let queueObj = queue[0];
        if (queueObj.parent) {
            queueObj.depthIndex = queueObj.parent.depthIndex + 1;
            if (queueObj.depthIndex > maxDepth) {
                maxDepth = queueObj.depthIndex;
            }
        }
        if (queueObj.children.length < 1) {
            if (searchPhase === 3 || (searchPhase === 2 && queueObj.depthIndex < maxDepth)) {
                queueObj.assignChild({ ...nodeToInsert});
                inserted = true;
            }
            else {
                queue.shift();
            }
        }
        else if (queueObj.children.length === 1) {
            queueObj.assignChild({ ...nodeToInsert});
                inserted = true;
        }
        else {
            queue.shift();
            queue.push(queueObj.children[0]);
            queue.push(queueObj.children[1]);
        }
    }
    return heapTree;
}

