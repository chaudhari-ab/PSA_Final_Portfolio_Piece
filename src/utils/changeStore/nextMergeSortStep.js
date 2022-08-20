import { store } from "../../index.js";
import {
    updatePhase,
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

export default function nextMergeSortStep() {
    const newAlgorithmProgress = { ...store.getState().algorithmProgress };
    const newData = { ...store.getState().data };
    const { edges } = newData.kruskal;
    const newEdges = [...edges]
    const { partitions, currentPartition, currentSection, loopIndex, numInvisible } = newAlgorithmProgress.kruskal.mergeSort;
    const sectionLength = partitions[currentPartition][currentSection];
    let newSection = false;
    if (numInvisible === 0) {
        //move on to a new section to merge
        newSection = true;
        let edgesInSection = [];
        for (let i = loopIndex; i < loopIndex + sectionLength; i++) {
            edgesInSection.push({cost: edges[i].cost, index: i});
        }
        //sort edges in place and reveal them by setting their visibility back in subsequent steps
        edgesInSection = sortEdges(edgesInSection);
        for (let i = loopIndex; i < loopIndex + sectionLength; i++) {
            newEdges[i] = edges[edgesInSection[i - loopIndex].index];
            newEdges[i].displaySort = i === loopIndex ? true : false;
        }
    }
    else {
        //if we are in the middle of a section that is merging, simply display the next edge
        newEdges[loopIndex].displaySort = true;
    }
    newData.kruskal.edges = newEdges;
    store.dispatch(updateData(newData));
    if (loopIndex + 1 >= edges.length) {
        //find next loop values
        if (currentPartition === 0) {
            store.dispatch(updatePhase("choosingCycleSearchMethod"));
        }
        else {
            newAlgorithmProgress.kruskal.mergeSort.currentPartition = currentPartition - 1;
            newAlgorithmProgress.kruskal.mergeSort.currentSection = 0;
            newAlgorithmProgress.kruskal.mergeSort.loopIndex = 0;
        }
    }
    else {
        newAlgorithmProgress.kruskal.mergeSort.loopIndex = loopIndex + 1;
        newAlgorithmProgress.kruskal.mergeSort.currentSection = (numInvisible === 1 || sectionLength === 1) ? currentSection + 1 : currentSection;
    }
    newAlgorithmProgress.kruskal.mergeSort.numInvisible = newSection ? sectionLength - 1 : numInvisible - 1;
    store.dispatch(updateData(newData));
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}

function sortEdges(edgesInput) {
    let edges = [...edgesInput]
    const sorted = [];
    while (edges.length > 0) {
        let nextEdge = edges[0];
        edges.forEach(edge => {
            if (edge.cost < nextEdge.cost) {
                nextEdge = edge;
            }
        });
        edges = edges.filter(edge => edge.index !== nextEdge.index);
        sorted.push(nextEdge);
    }
    return sorted;
}