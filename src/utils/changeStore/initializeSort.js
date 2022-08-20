import { store } from "../../index.js";
import {
    updateData,
    updateAlgorithmProgress
    } from "../../actions";

//generates partitions used in merge sort and initializes the unsortedRanges array used by quick sort
//to contain the single range of the full list of edges
export default function initializeSort() {
    const newData = { ...store.getState().data }
    const newAlgorithmProgress = { ...store.getState().algorithmProgress}
    switch (store.getState().selectedAlgorithm.sortMethod) {
        case "merge":
            newAlgorithmProgress.kruskal.mergeSort.partitions = generatePartitions(newData.kruskal.edges.length);
            newAlgorithmProgress.kruskal.mergeSort.currentPartition = newAlgorithmProgress.kruskal.mergeSort.partitions.length - 1;
            store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
            return;
        case "quick":
            newAlgorithmProgress.kruskal.quickSort.unsortedRanges = [[0, newData.kruskal.edges.length - 1]];
            newAlgorithmProgress.kruskal.quickSort.swapIndex = newData.kruskal.edges.length - 1;
            newData.kruskal.edges.forEach(edge => edge.sortDisplayColor = "cyan");
            newData.kruskal.edges[0].sortDisplayColor = "blue";
            store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
            store.dispatch(updateData(newData));
            return;
        default:
            return;
    }
}

//the partitions array shows the different sub-problems of the merge sort algorithm
function generatePartitions(length) {
    const partitionsArray = [[length]];
    while (Math.max(...partitionsArray[partitionsArray.length - 1]) > 2) {
        const nextPartition = [];
        partitionsArray[partitionsArray.length - 1].forEach(value => {
            nextPartition.push(Math.floor(value / 2));
            nextPartition.push(Math.ceil(value / 2));
        });
        partitionsArray.push(nextPartition);
    }
    return partitionsArray;
}