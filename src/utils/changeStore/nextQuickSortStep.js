import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

export default function nextQuickSortStep() {
    const newAlgorithmProgress = { ...store.getState().algorithmProgress };
    const newData = { ...store.getState().data };
    const { edges } = newData.kruskal;
    const newEdges = [...edges];
    //for each range to sort, the pivot index will begin at the beginning and bubble up and the swap index
    //will begin at the top and bubble down
    const { unsortedRanges, pivotIndex, swapIndex } = newAlgorithmProgress.kruskal.quickSort;
    if (edges[pivotIndex].cost < edges[pivotIndex + 1].cost) {
        //if the next edge is greater than the pivot, switch it with the swap index and decrease the swap index
        newEdges[pivotIndex + 1] = edges[swapIndex];
        newEdges[swapIndex] = edges[pivotIndex + 1];
        newAlgorithmProgress.kruskal.quickSort.swapIndex--;
    }
    else {
        //otherwise switch it with the pivot index and increase the pivot index
        newEdges[pivotIndex + 1] = edges[pivotIndex];
        newEdges[pivotIndex] = edges[pivotIndex + 1];
        newAlgorithmProgress.kruskal.quickSort.pivotIndex++;
    }
    if (newAlgorithmProgress.kruskal.quickSort.pivotIndex === newAlgorithmProgress.kruskal.quickSort.swapIndex) {
        //when the pivot and swap index are equal, we are done with this range and can move onto the subrange below
        //the pivot index if it is greater than one
        for (let i = unsortedRanges[0][0]; i <= unsortedRanges[0][1]; i++) {
            newEdges[i].sortDisplayColor = null;
        }
        const newUnsortedRanges = [];
        if (unsortedRanges[0][0] < newAlgorithmProgress.kruskal.quickSort.pivotIndex - 1) {
            newUnsortedRanges.push([unsortedRanges[0][0], newAlgorithmProgress.kruskal.quickSort.pivotIndex - 1]);
        }
        if (unsortedRanges[0][1] > newAlgorithmProgress.kruskal.quickSort.pivotIndex + 1) {
            newUnsortedRanges.push([newAlgorithmProgress.kruskal.quickSort.pivotIndex + 1, unsortedRanges[0][1]]);
        }
        for (let i = 1; i < unsortedRanges.length; i++) {
            newUnsortedRanges.push(unsortedRanges[i]);
        }
        if (newUnsortedRanges.length === 0) {
            store.dispatch(updatePhase("choosingCycleSearchMethod"));
        }
        else {
            newAlgorithmProgress.kruskal.quickSort.unsortedRanges = newUnsortedRanges;
            newAlgorithmProgress.kruskal.quickSort.pivotIndex = newUnsortedRanges[0][0];
            newAlgorithmProgress.kruskal.quickSort.swapIndex = newUnsortedRanges[0][1];
            for (let i = newUnsortedRanges[0][0]; i <= newUnsortedRanges[0][1]; i++) {
                newEdges[i].sortDisplayColor = "cyan";
            }
            newEdges[newAlgorithmProgress.kruskal.quickSort.pivotIndex].sortDisplayColor = "blue";
        }
    }
    newData.kruskal.edges = newEdges;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}