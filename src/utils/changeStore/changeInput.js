import { store } from "../../index.js";
import { updateInput, updateData } from "../../actions";
import { kruskalInputSmall } from "../../inputs/kruskalInputSmall";
import { kruskalInputLarge } from "../../inputs/kruskalInputLarge";
//import { kosarajuInputSmall } from "../../inputs/kosarajuInputSmall";
// import { kosarajuInputLarge } from "../../inputs/kosarajuInputLarge";
import changeHuffmanDataOnInputChange from "./changeHuffmanDataOnInputChange";
import generateColors from "../miscellaneous/generateColors";
 
//manages input change for different algorithms and calls methods to update data as a result
export default function changeInput(inputString) {
    let payload;
    const { type } = store.getState().selectedAlgorithm;
    if (type === "kruskal") {
        payload = inputString === "small" ? { ...kruskalInputSmall } : { ...kruskalInputLarge };
        changeKruskalDataOnInputChange(payload, inputString);
    }
    if (type === "kosaraju") {
       // payload = inputString === "small" ? { ...kosarajuInputSmall } : { ...kosarajuInputLarge };
        changeKosarajuDataOnInputChange(payload, inputString);
    }
    if (type === "huffman") {
        payload = inputString.toUpperCase().split("").map(alpha => {
            return /\s/.test(alpha) ? " " : alpha;
        }).filter(alpha => /[A-Z\s]/.test(alpha)).join("");
        changeHuffmanDataOnInputChange(payload);
    }
    store.dispatch(updateInput(payload));
}

//adds displayGraph property to edges and displayColors property to vertices using the generateColors
//function to assign a unique color to each vertex
function changeKruskalDataOnInputChange(newInput, inputString) {
    const payload = { ...store.getState().data };
    payload.kruskal.vertices = newInput.vertices;
    const colorsArray = generateColors(payload.kruskal.vertices.length);
    payload.kruskal.vertices.forEach((vertex, index) => vertex.displayColor = colorsArray[index]);
    payload.kruskal.edges = newInput.edges;
    payload.kruskal.edges.forEach(edge => edge.displayGraph = true);
    payload.kruskal.input = inputString;
    store.dispatch(updateData(payload));
}

//ensures that found, foundAgain and added properties of edges and vertices are initialized as false
function changeKosarajuDataOnInputChange(newInput, inputString) {
    const payload = { ...store.getState().data };
    payload.kosaraju.vertices = newInput.vertices;
    payload.kosaraju.vertices.forEach(vertex => {
        vertex.found = false;
        vertex.foundAgain = false;
        vertex.added = false;
    })
    payload.kosaraju.edges = newInput.edges;
    payload.kosaraju.edges.forEach(edge => {
        edge.found = false;
        edge.foundAgain = false;
        edge.added = false;
    })
    payload.kosaraju.input = inputString;
    payload.kosaraju.vertexIndex = [];
    store.dispatch(updateData(payload));
}