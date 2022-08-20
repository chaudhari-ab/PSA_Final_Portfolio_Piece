import { store } from "../../index.js";
import {
    updateSelectedAlgorithm,
    updatePhase,
    reset,
    updateAlgorithmProgress
    } from "../../actions";
import { changeEditGraph } from "./editInput";
import initializeSort from "./initializeSort";
import initializeHeapProgressData from "./initializeHeapProgressData";
import { addInAndOutEdges, assignKosarajuColors } from "./onKosarajuPhaseChange";

export function changeSelectedAlgorithmType(type) {
    const payload = { ...store.getState().selectedAlgorithm, type};
    store.dispatch(updateSelectedAlgorithm(payload));
}

export function changeSelectedAlgorithmSortMethod(sortMethod) {
    const payload = { ...store.getState().selectedAlgorithm, sortMethod};
    store.dispatch(updateSelectedAlgorithm(payload));
}
export function changeSelectedAlgorithmCycleSearchMethod(cycleSearchMethod) {
    const payload = { ...store.getState().selectedAlgorithm, cycleSearchMethod};
    store.dispatch(updateSelectedAlgorithm(payload));
}

export function callReset() {
    store.dispatch(reset());
}

//changes phase and calls appropriate functions when other data needs to be updated as a result
export function changePhase(newPhase) {
    const currentPhase = store.getState().phase;
    console.log(currentPhase, newPhase);
    if (currentPhase === "notStarted") {
        changeEditGraph();
    }
    if (newPhase === "sorting") {
        initializeSort();
    }
    if (newPhase === "heapifying") {
        initializeHeapProgressData();
    }
    if (currentPhase === "heapifying" && newPhase === "solving") {
        console.log("updating huffman info on algorithm change")
        const { heapTree } = store.getState().data.huffman;
        const payload = { ...store.getState().algorithmProgress};
        payload.huffman.algorithm.nodeToRemove = heapTree;
        store.dispatch(updateAlgorithmProgress(payload));
    }
    if (newPhase === "readyToReverse") {
        addInAndOutEdges();
    }
    if (currentPhase === "readyToUnreverse" && newPhase === "solving") {
        assignKosarajuColors();
    }
    if (newPhase === "solving" && store.getState().selectedAlgorithm.cycleSearchMethod === "unionFind") {
        const payload = { ...store.getState().data};
        payload.kruskal.vertices.forEach((vertex, index) => {
            vertex.leader = index;
            vertex.followers = [index];
        });
    }
    store.dispatch(updatePhase(newPhase));
}