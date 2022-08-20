import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

export default function nextUnionFindStep() {
    const newData = { ...store.getState().data };
    const { vertices, edges } = newData.kruskal;
    const newAlgorithmProgress = { ...store.getState().algorithmProgress }
    const { edgesChecked, edgesAdded } = newAlgorithmProgress.kruskal.unionFind;
    const edgeToTest = edges[edgesChecked];
    const { vertex1, vertex2 } = edgeToTest;
    newAlgorithmProgress.kruskal.unionFind.edgesChecked++;
    newData.kruskal.edges[edgesChecked].flash = true;
    if (vertices[vertex1].leader === vertices[vertex2].leader) {
        //if the vertices on both ends of the edge have the same leader, a cycle would be created and the edge
        //is not added to the graph
        if (edgesChecked >= edges.length - 1) {
            store.dispatch(updatePhase("completed"));
            return;
        }
    }
    else {
        //otherwise we add the edge and update the followers of the smaller group to have the same leader 
        //and color as the larger group
        newAlgorithmProgress.kruskal.unionFind.edgesAdded++;
        newData.kruskal.edges[edgesChecked].displayGraph = true;
        newData.kruskal.edges[edgesChecked].displaySort = false;
        const newLeader = vertices[vertices[vertex1].leader].followers.length > vertices[vertices[vertex2].leader].followers.length ? vertices[vertex1].leader : vertices[vertex2].leader;
        const newFollower = vertices[vertices[vertex1].leader].followers.length > vertices[vertices[vertex2].leader].followers.length ? vertices[vertex2].leader : vertices[vertex1].leader;
        for (let i = 0; i < vertices[newFollower].followers.length; i++) {
            const follower = vertices[newFollower].followers[i];
            newData.kruskal.vertices[follower].leader = newLeader;
            newData.kruskal.vertices[follower].displayColor = vertices[newLeader].displayColor;
            newData.kruskal.vertices[newLeader].followers.push(follower);
        }
        if (edgesAdded === vertices.length - 2) {
            store.dispatch(updatePhase("completed"));
        }
    }
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
    const newestData = { ...newData }
    newestData.kruskal.edges[edgesChecked] = { ...newData.kruskal.edges[edgesChecked]};
    newestData.kruskal.edges[edgesChecked].flash = false;
    setTimeout(() => {
        store.dispatch(updateData(newestData));
    }, 100)
}