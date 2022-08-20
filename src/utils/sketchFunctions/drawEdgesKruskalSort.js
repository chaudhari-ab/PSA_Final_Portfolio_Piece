const BAR_WIDTH = 4;
const MARGIN = 10;

export default function drawEdges(p, edges) {
    const unitHeight = (p.height - MARGIN * 2) / edges.length;
    const unitWidth = (p.width - MARGIN * 2);
    let max = 0;
    edges.forEach(edge => {
        if (edge.cost > max) {
            max = edge.cost;
        }
    });
    for (let i = 0; i < edges.length; i++) {
        if (edges[i].displaySort) {
            let color = edges[i].sortDisplayColor || 255;
            if (edges[i].flash) {
                color = "goldenrod";
            }
            p.fill(color);
            p.rect(
                MARGIN,
                MARGIN + unitHeight * (i + 0.5) - BAR_WIDTH / 2, 
                unitWidth * edges[i].cost / max, 
                BAR_WIDTH);
        }
    }
}