import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

import nextUnfoundVertexIndexOrdered from "../miscellaneous/nextUnfoundVertexIndexOrdered";

//runs nearly identicaly to nextDepthFirstSearch, but uses the store.data.kosaraju.vertexIndex array
//to find the next starting vertex for each depth first search
export default function nextKosarajuStep() {
    const newData = { ...store.getState().data };
    const { vertices, edges, vertexIndex } = newData.kosaraju;
    const newAlgorithmProgress = { ...store.getState().algorithmProgress }
    const newVertexStack = newAlgorithmProgress.kosaraju.algorithm.vertexStack;

    if (newVertexStack.length === 0) {
        const index = nextUnfoundVertexIndexOrdered(vertices, vertexIndex);
        if (index < 0) {
            store.dispatch(updatePhase("completed"));
            return;
        }
        newVertexStack.push(index);
        newData.kosaraju.vertices[index].foundAgain = true;
        newData.kosaraju.vertices[index].selected = true;
    }
    else {
        const index = newVertexStack[newVertexStack.length - 1];
        const nextEdges = vertices[index].inEdges.filter(edge => !edges[edge].foundAgain);
        if (nextEdges.length === 0) {
            newData.kosaraju.vertices[index].selected = false;
            newVertexStack.pop();
            if (newVertexStack.length > 0) {
                newData.kosaraju.vertices[newVertexStack[newVertexStack.length - 1]].selected = true;
            }
        }
        else {
            newData.kosaraju.edges[nextEdges[0]].foundAgain = true;
            const { end } = edges[nextEdges[0]];
            if (!vertices[end].foundAgain) {
                newData.kosaraju.vertices[index].selected = false;
                newData.kosaraju.vertices[end].foundAgain = true;
                newData.kosaraju.vertices[end].selected = true;
                newVertexStack.push(end);
            }
        }
    }
    newAlgorithmProgress.kosaraju.algorithm.vertexStack = newVertexStack;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}
