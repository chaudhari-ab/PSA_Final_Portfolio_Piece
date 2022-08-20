import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

export default function nextBubbleSortStep() {
    const { edges } = store.getState().data.kruskal;
    const numEdges = edges.length;
    const newEdges = [...edges];
    const newAlgorithmProgress = { ...store.getState().algorithmProgress};
    const { iIndex, jIndex } = newAlgorithmProgress.kruskal.bubbleSort; //the two loop indexes used in bubble sort
    const newDataPayload = { ...store.getState().data };
    newEdges[jIndex].sortDisplayColor = null;
    newEdges[jIndex + 1].sortDisplayColor = null;
    if (edges[jIndex].cost > edges[jIndex + 1].cost) { //determines whether to swap edges
        newEdges[jIndex] = edges[jIndex + 1];
        newEdges[jIndex + 1] = edges[jIndex];
    }
    if (jIndex === numEdges - iIndex - 2) {
        if (iIndex === numEdges - 2) {
            store.dispatch(updatePhase("choosingCycleSearchMethod"));
        }
        else {
            newAlgorithmProgress.kruskal.bubbleSort.iIndex = iIndex + 1;
            newAlgorithmProgress.kruskal.bubbleSort.jIndex = 0;
        }
    }
    else {
        newAlgorithmProgress.kruskal.bubbleSort.jIndex = jIndex + 1;
    }
    const newJIndex = newAlgorithmProgress.kruskal.bubbleSort.jIndex
    //sets display to red if edges will be swapped and blue otherwise
    const nextDisplayColor = newEdges[newJIndex].cost > newEdges[newJIndex + 1].cost ? "red" : "blue"; 
    newEdges[newJIndex].sortDisplayColor = nextDisplayColor;
    newEdges[newJIndex + 1].sortDisplayColor = nextDisplayColor;
    newDataPayload.kruskal.edges = newEdges;
    store.dispatch(updateData(newDataPayload));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}