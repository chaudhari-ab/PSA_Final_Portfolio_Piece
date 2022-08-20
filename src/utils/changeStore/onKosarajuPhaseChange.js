import { store } from "../../index.js";
import { updateData } from "../../actions";
import generateColors from "../miscellaneous/generateColors";

//simply assigns incoming and outcoming edges of each vertex for convenience when running depth-first searched
export function addInAndOutEdges() {
    const newData = { ...store.getState().data };
    const { vertices, edges } = newData.kosaraju;
    for (let i = 0; i < vertices.length; i++) {
        const outEdges = [];
        const inEdges = [];
        edges.forEach(({start, end}, index) => {
            if (start === i) {
                inEdges.push(index);
            }
            if (end === i) {
                outEdges.push(index);
            }
        });
        newData.kosaraju.vertices[i].inEdges = inEdges;
        newData.kosaraju.vertices[i].outEdges = outEdges;
    }
    store.dispatch(updateData(newData));
}

export function unfindKosarajuData() {
    const newData = { ...store.getState().data };
    newData.kosaraju.vertices.forEach(vertex => vertex.found = false);
    newData.kosaraju.edges.forEach(edge => edge.found = false);
    store.dispatch(updateData(newData));
}

//computes the sccs in advance in order to determine the number of colors to generate
//it then assigns all of the colors ahead of time according to the sccs
export function assignKosarajuColors() {
    unfindKosarajuData();
    const newData = { ...store.getState().data }
    const { vertices, edges, vertexIndex } = newData.kosaraju;
    const stronglyConnectedComponents = [];
    for (let i = vertexIndex.length - 1; i>= 0; i--) {
        if (!vertices[vertexIndex[i]].found) {
            stronglyConnectedComponents.push(findScc(vertexIndex[i], vertices, edges));
        }
    }
    const colorsArray = generateColors(stronglyConnectedComponents.length);
    stronglyConnectedComponents.forEach((scc, index) => {
        scc.forEach(vertex => {
            const color = `rgb(${colorsArray[index][0]},${colorsArray[index][1]},${colorsArray[index][2]})`
            newData.kosaraju.vertices[vertex].displayColor = color;
        });
    });
    unfindKosarajuData();
    store.dispatch(updateData(newData));
}

//runs a depth first search on a vertex to find all accessible in-neighbords
//by running them in order of our vertexIndex at this stage, each search yields an scc
function findScc(vertex, vertices, edges) {
    vertices[vertex].found = true;
    let localStack = [vertex];
    let scc = [];
    while (localStack.length > 0) {
        const index = localStack[localStack.length - 1];
        const nextEdges = vertices[index].inEdges.filter(edge => !edges[edge].found);
        if (nextEdges.length === 0) {
            scc.push(index);
            localStack.pop();
        }
        else {
            edges[nextEdges[0]].found = true;
            if (!vertices[edges[nextEdges[0]].end].found) {
                localStack.push(edges[nextEdges[0]].end);
                vertices[edges[nextEdges[0]].end].found = true;
            }
        }
    }
    return scc;
}
