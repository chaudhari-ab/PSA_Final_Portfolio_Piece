export default function nextUnfoundVertexIndex(vertices) {
    for (let i = 0; i < vertices.length; i++) {
        if (!vertices[i].found && !vertices[i].foundAgain) {
            return i;
        }
    }
    return -1;
}