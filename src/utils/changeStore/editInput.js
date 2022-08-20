import { store } from "../../index.js";
import {
    updateEditGraph,
    updateData
    } from "../../actions";
import generateColors from "../miscellaneous/generateColors";

//changes which properties of the graph are editable
export function changeEditGraph(editType=null) {
    const payload = {
        dragVertex: false,
        addVertex: false,
        deleteVertex: false,
        deleteEdge: false
    }
    if (editType) {
        payload[editType] = true;
    }
    store.dispatch(updateEditGraph(payload));
}

//adds a vertex to kosaraju or kruskal graphs with specified coordinates
export function addVertex(x, y) {
    const payload = { ...store.getState().data }
    const { type } = store.getState().selectedAlgorithm;
    payload[type].vertices.push({x, y});
    if (type === "kruskal") {
        const colorsArray = generateColors(payload[type].vertices.length);
        payload[type].vertices.forEach((vertex, index) => vertex.displayColor = colorsArray[index]);
    }
    store.dispatch(updateData(payload));
}

//returns a function that is called when a vertex is clicked.  
//when the cache contains an index, any edge connecting both vertices is removed
export function deleteEdgeHandler() {
    let cache = null;
    return index => {
        if (!cache) {
            cache = index;
        }
        else {
            const payload = { ...store.getState().data }
            const { type } = store.getState().selectedAlgorithm;
            const prop1 = type === "kruskal" ? "vertex1" : "start";
            const prop2 = type === "kruskal" ? "vertex2" : "end";
            payload[type].edges = payload[type].edges.filter(edge => {
                return !((edge[prop1] === index || edge[prop1] === cache) && (edge[prop2] === index || edge[prop2] === cache));
            });
            cache = null;
            store.dispatch(updateData(payload));
        }
    }
}

export function addEdge(v1, v2, cost) {
    const payload = { ...store.getState().data }
    const { type } = store.getState().selectedAlgorithm;
    const newEdge = type === "kruskal" ? {vertex1: Number(v1), vertex2: Number(v2), cost: Number(cost), displayGraph: true} 
        : {start: Number(v1), end: Number(v2)};
    payload[type].edges.push(newEdge);
    store.dispatch(updateData(payload));
}

//deletes vertex, removes edges reaching vertex and reassigns indices of higher-index vertices and the 
//edges that connect them
export function deleteVertex(index) {
    let payload = { ...store.getState().data }
    const { type } = store.getState().selectedAlgorithm;
    let newData = type === "kruskal" ? payload.kruskal : payload.kosaraju;
    newData.vertices = newData.vertices.filter((vertex, i) => i !== index);
    if (type === "kruskal") {
        newData.edges = newData.edges.filter(edge => edge.vertex1 !== index && edge.vertex2 !== index);
        newData.edges.forEach(edge => {
            edge.vertex1 = edge.vertex1 > index ? edge.vertex1 - 1 : edge.vertex1;
            edge.vertex2 = edge.vertex2 > index ? edge.vertex2 - 1 : edge.vertex2;
        });
        const colorsArray = generateColors(newData.vertices.length);
        newData.vertices.forEach((vertex, index) => vertex.displayColor = colorsArray[index]);
        payload.kruskal = newData;
    }
    else {
        newData.edges = newData.edges.filter(edge => edge.start !== index && edge.end !== index);
        newData.edges.forEach(edge => {
            edge.start = edge.start > index ? edge.start - 1 : edge.start;
            edge.end = edge.end > index ? edge.end - 1 : edge.end;
        });
        payload.kruskal = newData;
    }
    store.dispatch(updateData(payload));
}

//changes coordinates of vertex in response to mouse drag
export function changeVertex(index, x, y) {
    const payload = { ...store.getState().data }
    const { type } = store.getState().selectedAlgorithm;
    if (type === "kruskal") {
        payload.kruskal.vertices[index].x = x;
        payload.kruskal.vertices[index].y = y;
    }
    else {
        payload.kosaraju.vertices[index].x = x;
        payload.kosaraju.vertices[index].y = y;
    }
    store.dispatch(updateData(payload));
}