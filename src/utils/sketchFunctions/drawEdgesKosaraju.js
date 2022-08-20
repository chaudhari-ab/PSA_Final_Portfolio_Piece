const ARROWHEAD_LENGTH = 10;

export default function drawEdges(p, edges, vertices, diam, defaultColor, reverse) {
    for (let i = 0; i < edges.length; i++) {
        const { start, end } = edges[i];
        let color = (vertices[start].added && vertices[end].added && edges[i].found) ? "goldenrod" : (edges[i].found ? "black" : defaultColor);
        if (vertices[start].displayColor === vertices[end].displayColor && edges[i].foundAgain) {
            color = vertices[start].displayColor;
        } 
        const lineCoords = {
            [reverse ? "xEnd" : "xStart"]: vertices[start].x * p.width,
            [reverse ? "yEnd" : "yStart"]: vertices[start].y * p.height,
            [reverse ? "xStart" : "xEnd"]: vertices[end].x * p.width,
            [reverse ? "yStart" : "yEnd"]: vertices[end].y * p.height
        };
        p.stroke(color);
        p.strokeWeight(2);
        p.line(lineCoords.xStart, lineCoords.yStart, lineCoords.xEnd, lineCoords.yEnd);
        p.fill(color);
        renderArrowHead(p, lineCoords, vertices[reverse ? start : end].selected ? diam * 1.5 : diam);
    }
}

const renderArrowHead = (p, lineCoords, diam) => {
    const { xStart, yStart, xEnd, yEnd} = lineCoords;
    const theta = Math.atan((yEnd - yStart) / (xEnd - xStart));
    const handleNegative = xEnd >= xStart ? 1 : -1;
    const x1 = xEnd - (Math.cos(theta) * handleNegative * diam / 2);
    const y1 = yEnd - (Math.sin(theta) * handleNegative * diam / 2);
    const x2 = x1 - (Math.cos(theta + (Math.PI / 6)) * handleNegative * ARROWHEAD_LENGTH);
    const y2 = y1 - (Math.sin(theta + (Math.PI / 6)) * handleNegative * ARROWHEAD_LENGTH);
    const x3 = x1 - (Math.cos(theta - (Math.PI / 6)) * handleNegative * ARROWHEAD_LENGTH);
    const y3 = y1 - (Math.sin(theta - (Math.PI / 6)) * handleNegative * ARROWHEAD_LENGTH);
    p.noStroke();
    p.beginShape();
    p.vertex(x1, y1);
    p.vertex(x2, y2);
    p.vertex(x3, y3);
    p.endShape(p.CLOSE);
}