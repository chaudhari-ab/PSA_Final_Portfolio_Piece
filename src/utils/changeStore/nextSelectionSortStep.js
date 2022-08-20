import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

export default function nextSelectionSortStep() {
    const newAlgorithmProgress = { ...store.getState().algorithmProgress };
    const newData = { ...store.getState().data };
    const { edges } = newData.kruskal;
    const newEdges = [...edges];
    newEdges.forEach(edge => edge.sortDisplayColor = null);
    const { iIndex, jIndex, minIndex } = newAlgorithmProgress.kruskal.selectionSort;
    newEdges[jIndex].sortDisplayColor = "cyan";
    newEdges[minIndex].sortDisplayColor = "blue";
    if (edges[jIndex].cost < edges[minIndex].cost) {
        //as jIndex loops through the unsorted edges, minIndex keeps track of the lowest one in each cycle
        newAlgorithmProgress.kruskal.selectionSort.minIndex = jIndex;
    }
    if (jIndex === edges.length - 1) {
        //when we reach the end of the cycle, the edge at minIndex is swapped with that of iIndex
        //iIndex then increases by one for the next cycle
        newEdges[iIndex] = edges[newAlgorithmProgress.kruskal.selectionSort.minIndex];
        newEdges[newAlgorithmProgress.kruskal.selectionSort.minIndex] = edges[iIndex];
        if (iIndex + 2 === edges.length) {
            store.dispatch(updatePhase("choosingCycleSearchMethod"));
        }
        else {
            newAlgorithmProgress.kruskal.selectionSort.iIndex = iIndex + 1;
            newAlgorithmProgress.kruskal.selectionSort.jIndex = iIndex + 1;
            newAlgorithmProgress.kruskal.selectionSort.minIndex = iIndex + 1;
        }
    }
    else {
        newAlgorithmProgress.kruskal.selectionSort.jIndex++;
    }
    newData.kruskal.edges = newEdges;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}