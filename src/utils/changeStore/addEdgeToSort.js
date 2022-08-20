import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

//changes displayGraph and displaySort properties of edges one at a time    
export default function addEdgeToSort() {
    const { algorithmProgress } = store.getState();
    const { count } = algorithmProgress.kruskal.addEdges;
    const progressPayload = { ...algorithmProgress };
    const dataPayload = { ...store.getState().data};
    dataPayload.kruskal.edges[count].displayGraph = false;
    dataPayload.kruskal.edges[count].displaySort = true;
    store.dispatch(updateData(dataPayload));
    progressPayload.kruskal.addEdges.count++;
    store.dispatch(updateAlgorithmProgress(progressPayload));
    if (count + 1 === dataPayload.kruskal.edges.length) {
        store.dispatch(updatePhase("choosingSort"));
    }
}

