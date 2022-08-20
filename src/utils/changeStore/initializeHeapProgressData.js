import { store } from "../../index.js";
import {
    updateAlgorithmProgress,
    } from "../../actions";

//sets the top node of the heap tree as the first node in the stack that keeps track of heapTree navigation
export default function initializeHeapProgressData() {
    const newAlgorithmProgress = store.getState().algorithmProgress;
    newAlgorithmProgress.huffman.heapify.heapStack = [store.getState().data.huffman.heapTree];
    store.dispatch(updateAlgorithmProgress(newAlgorithmProgress));
}