import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";


 //uses a cache of vertices and edges to keep track of which ones have been found by the current search   
export default function nextSearchCyclesStep() {
    const newData = { ...store.getState().data };
    const { vertices, edges } = newData.kruskal;
    const { algorithmProgress } = store.getState();
    const { testing, vertexCache, edgeCache, vertexStack, edgesChecked, edgesAdded } = algorithmProgress.kruskal.searchCycles;
    const newAlgorithmProgress = { ...algorithmProgress };
    const edgeToTest = edges[edgesChecked];
    if (!testing) {
        //if an edge is not currently being tested for cycles, add the next one
        newAlgorithmProgress.kruskal.searchCycles.edgeCache = {[edgesChecked]: true};
        newAlgorithmProgress.kruskal.searchCycles.testing = true;
        newAlgorithmProgress.kruskal.searchCycles.vertexCache = { [edgeToTest.vertex2]: true };
        newAlgorithmProgress.kruskal.searchCycles.vertexStack = [edgeToTest.vertex2];
        newData.kruskal.edges[edgesChecked].flash = true;
    }
    else if (vertexStack.length === 0) {
        if (edgesAdded >= vertices.length - 2) {
            store.dispatch(updatePhase("completed"));
        }
        //if the stack is zero and we haven't run into our starting point, there are no cycles and we can
        //add the edge to our graph, reset the search data and continue
        newAlgorithmProgress.kruskal.searchCycles.edgesChecked++;
        newAlgorithmProgress.kruskal.searchCycles.edgesAdded++;
        newAlgorithmProgress.kruskal.searchCycles.edgeCache = {};
        newAlgorithmProgress.kruskal.searchCycles.testing = false;
        newAlgorithmProgress.kruskal.searchCycles.vertexCache = {};
        newAlgorithmProgress.kruskal.searchCycles.vertexStack = [];
        newData.kruskal.edges[edgesChecked].displayGraph = true;
        newData.kruskal.edges[edgesChecked].displaySort = false;
        newData.kruskal.edges.forEach(edge => edge.flash = false);
    }
    else if (vertexStack[vertexStack.length - 1] === edgeToTest.vertex1) {
        if (edgesChecked >= edges.length - 1) {
            store.dispatch(updatePhase("completed"));
        }
        //if the vertex at the top of the stack is equal to the other vertex on the edge we're testing,
        //then we have discovered a cycle and the edge is not added to the graph
        newAlgorithmProgress.kruskal.searchCycles.edgesChecked++;
        newAlgorithmProgress.kruskal.searchCycles.edgeCache = {};
        newAlgorithmProgress.kruskal.searchCycles.testing = false;
        newAlgorithmProgress.kruskal.searchCycles.vertexCache = {};
        newAlgorithmProgress.kruskal.searchCycles.vertexStack = [];
    }
    else {
        //otherwise, find the next edges leading out of the vertex at the top of the stack
        const nextEdges = findEdgesKruskal(vertexStack[vertexStack.length - 1], edges, edgeCache);
        if (nextEdges.length === 0) {
            newAlgorithmProgress.kruskal.searchCycles.vertexStack.pop();
        }
        else {
            newAlgorithmProgress.kruskal.searchCycles.edgeCache[nextEdges[0]] = true;
            newData.kruskal.edges[nextEdges[0]].flash = true;
            const nextVertex = edges[nextEdges[0]].vertex1 === vertexStack[vertexStack.length - 1] ?
                edges[nextEdges[0]].vertex2 : edges[nextEdges[0]].vertex1;
            if (!vertexCache[nextVertex]) {
                newAlgorithmProgress.kruskal.searchCycles.vertexStack.push(nextVertex);
                newAlgorithmProgress.kruskal.searchCycles.vertexCache[nextVertex] = true;
            }
        }
    }
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}

function findEdgesKruskal(vertex, edges, edgeCache) {
    const nextEdges = [];
    edges.forEach((edge, index) => {
        if ((edge.vertex1 === vertex || edge.vertex2 === vertex) && !edgeCache[index] && edge.displayGraph) {
            nextEdges.push(index);
        }
    });
    return nextEdges;
}