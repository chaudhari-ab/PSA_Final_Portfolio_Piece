const LINE_AREA = 400;
export default function drawEdges(p, edges, vertices) {
    p.stroke(255);
    for (let i = 0; i < edges.length; i++) {
        if (vertices[edges[i].vertex1].displayColor === vertices[edges[i].vertex2].displayColor) {
            p.stroke(vertices[edges[i].vertex1].displayColor);
        }
        if (edges[i].flash) {
            p.stroke("goldenrod");
        }

        if (edges[i].flash || edges[i].displayGraph) {
            const lineLength = p.dist(
                p.width * vertices[edges[i].vertex1].x, 
                p.height * vertices[edges[i].vertex1].y, 
                p.width * vertices[edges[i].vertex2].x, 
                p.height * vertices[edges[i].vertex2].y
            );
            p.strokeWeight(LINE_AREA  / (Math.pow(lineLength, 0.8) * Math.sqrt(edges[i].cost)));
            p.line(
                p.width * vertices[edges[i].vertex1].x, 
                p.height * vertices[edges[i].vertex1].y, 
                p.width * vertices[edges[i].vertex2].x, 
                p.height * vertices[edges[i].vertex2].y
            );
        }
        p.stroke(255);
    }
}