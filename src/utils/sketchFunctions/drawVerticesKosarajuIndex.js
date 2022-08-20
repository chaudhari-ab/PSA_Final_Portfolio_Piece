export default function drawVertices(p, vertices, responsiveVertices, diam, defaultColor) {
    for (let i = 0; i < responsiveVertices.length; i++) {
        let color = (vertices[responsiveVertices[i].index].added && vertices[responsiveVertices[i].index].found) ? "goldenrod" : (vertices[responsiveVertices[i].index].found ? "white" : defaultColor);
        let fillColor = null;
        if (vertices[responsiveVertices[i].index].displayColor && vertices[responsiveVertices[i].index].foundAgain) {
            color = 255;
            fillColor = vertices[responsiveVertices[i].index].displayColor;
        }
        responsiveVertices[i].renderCircle(p, vertices[responsiveVertices[i].index].selected ? diam * 1.5 : diam, color, fillColor);
    }
}