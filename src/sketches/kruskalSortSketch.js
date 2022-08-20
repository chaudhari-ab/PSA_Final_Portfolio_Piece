import drawEdges from "../utils/sketchFunctions/drawEdgesKruskalSort";

const TEXT_SIZE = 14;

export default function graphSketch(p){
    let draw = false;
    let canvasWidth = 200;
    let canvasHeight = 500;
    let edges = [];

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
          edges = newProps.edges;
          draw = true;
      }

    
    p.setup = () => {
        p.textSize(TEXT_SIZE);
        p.createCanvas(canvasWidth, canvasHeight);
        p.noStroke();
    }



    p.draw = () => {
        if (draw) {
            p.background("black");
            drawEdges(p, edges);
            draw = false;
        }
    }
}