export default function drawVertices(p, vertices, responsiveVertices, diam, defaultColor) {
    for (let i = 0; i < vertices.length; i++) {
        let color = (vertices[i].added && vertices[i].found) ? "goldenrod" : (vertices[i].found ? "white" : defaultColor);
        let fillColor = null;
        if (vertices[i].displayColor && vertices[i].foundAgain) {
            color = 255;
            fillColor = vertices[i].displayColor;
        }
        responsiveVertices[i].renderCircle(p, vertices[i].selected ? diam * 1.5 : diam, color, fillColor);
    }
}