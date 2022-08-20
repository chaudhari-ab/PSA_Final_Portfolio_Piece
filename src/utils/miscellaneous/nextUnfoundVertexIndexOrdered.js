export default function nextUnfoundVertexIndexOrdered(vertices, vertexIndex) {
    for (let i = vertexIndex.length - 1; i >= 0; i--) {
        if (!vertices[vertexIndex[i]].foundAgain) {
            return vertexIndex[i];
        }
    }
    return -1;
}