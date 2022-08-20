import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

import nextUnfoundVertexIndex from "../miscellaneous/nextUnfoundVertexIndex";

export default function nextDepthFirstSearchStep() {
    const newData = { ...store.getState().data };
    const { vertices, edges } = newData.kosaraju;
    const newAlgorithmProgress = { ...store.getState().algorithmProgress }
    const newVertexStack = [...newAlgorithmProgress.kosaraju.depthFirstSearch.vertexStack];
    //if the stack is empty, the search is complete and we must move on to another arbitrary unfound vertex in the graph
    if (newVertexStack.length === 0) {
        const index = nextUnfoundVertexIndex(vertices);
        if (index < 0) {
            store.dispatch(updatePhase("readyToUnreverse"));
            return;
        }
        newVertexStack.push(index);
        newData.kosaraju.vertices[index].found = true;
        newData.kosaraju.vertices[index].selected = true;
    }
    else {
        //otherwise, examine all the edges leading into the vertex at the top of our stack (remembering that
        //the graph is reversed during this stage)
        const index = newVertexStack[newVertexStack.length - 1];
        const nextEdges = vertices[index].outEdges.filter(edge => !vertices[edges[edge].start].found);
        //if there are no new edges that lead to vertices that haven't already been found, we add the vertex to
        //our ordered list of vertices in store.data.kosaraju.vertexIndex
        if (nextEdges.length === 0) {
            newData.kosaraju.vertexIndex.push(index);
            newData.kosaraju.vertices[index].added = true;
            newData.kosaraju.vertices[index].selected = false;
            newVertexStack.pop();
            if (newVertexStack.length > 0) {
                newData.kosaraju.vertices[newVertexStack[newVertexStack.length - 1]].selected = true;
            }
        }
        else {
            //otherwise add the next edge to the graph and add the vertex at the end to the stack
            newData.kosaraju.edges[nextEdges[0]].found = true;
            const { start } = newData.kosaraju.edges[nextEdges[0]];
            if (!vertices[start].found) {
                newData.kosaraju.vertices[index].selected = false;
                newData.kosaraju.vertices[start].found = true;
                newData.kosaraju.vertices[start].selected = true;
                newVertexStack.push(start);
            }
        }
    }
    newAlgorithmProgress.kosaraju.depthFirstSearch.vertexStack = newVertexStack;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}