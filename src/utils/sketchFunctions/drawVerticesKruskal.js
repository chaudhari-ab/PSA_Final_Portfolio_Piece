export default function drawVertices(p, responsiveVertices, diam) {
    responsiveVertices.forEach(responsiveVertex => {
        responsiveVertex.renderCircle(p, diam);
    });
}