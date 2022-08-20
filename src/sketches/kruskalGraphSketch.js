import drawEdges from "../utils/sketchFunctions/drawEdgesKruskalGraph";
import drawVertices from "../utils/sketchFunctions/drawVerticesKruskal";
import SketchVertex from "../utils/dataClasses/SketchVertex";

import { addVertex, deleteEdgeHandler, deleteVertex, changeVertex } from "../utils/changeStore/editInput";

const DIAM = 20;

export default function kruskalGraphSketch(p){
    let draw = false;
    let canvasWidth = 800;
    let canvasHeight = 500;
    let edges = [];
    let vertices = [];
    let type = "unionFind";
    let editGraph = {};
    let responsiveVertices = [];
    let selectedIndex = null;
    const deleteEdge = deleteEdgeHandler();

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {
          edges = newProps.edges;
          vertices = newProps.vertices;
          type = newProps.type;
          editGraph = newProps.editGraph;
          responsiveVertices = getResponsiveVertices(canvasWidth, canvasHeight, vertices, type === "unionFind");
          draw = true;
      }

    
    p.setup = () => {
        p.createCanvas(canvasWidth, canvasHeight);
        p.noStroke();
    }



    p.draw = () => {
        if (draw) {
            p.background("black");
            drawEdges(p, edges, vertices);
            drawVertices(p, responsiveVertices, DIAM);
            draw = false;
        }
    }
    //assigns the selectedIndex variable to any vertex whose display was clicked
    p.mousePressed = () => {
        if (editGraph.dragVertex) {
            responsiveVertices.forEach(vertex => {
                const vertexData = vertex.sendData(p, DIAM);
                if (vertexData) {
                    selectedIndex = vertexData.index;
                }
            });
        }
    }
    //determines if vertex was clicked and in which ways the graph is being edited
    p.mouseClicked = () => {
        if (editGraph.addVertex) {
            if (p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
                addVertex(p.mouseX / p.width, p.mouseY / p.height);
            }
        }
        else {
            responsiveVertices.forEach(vertex => {
                const vertexData = vertex.sendData(p, DIAM);
                if (vertexData) {
                    if (editGraph.deleteVertex) {
                        deleteVertex(vertexData.index);
                    }
                    if (editGraph.deleteEdge) {
                        deleteEdge(vertexData.index);
                    }
                }
            });
        }
    }

    p.mouseDragged = () => {
        if ((selectedIndex || selectedIndex === 0) && editGraph.dragVertex && p.mouseX >= 0 && p.mouseX <= p.width && p.mouseY >= 0 && p.mouseY <= p.height) {
            changeVertex(selectedIndex, p.mouseX / p.width, p.mouseY / p.height)
        }
    }

    p.mouseReleased = () => {
        selectedIndex = null;
    }
}
//adds input vertices to an array of custom objects with methods that return vertex data when the display is clicked
function getResponsiveVertices(width, height, vertices, showColor) {

    const responsiveVertices = [];
    vertices.forEach((vertex, index) => {
        const color = showColor ? `rgb(${vertex.displayColor[0]},${vertex.displayColor[1]},${vertex.displayColor[2]})` : 0;
        const newResponsiveVertex = new SketchVertex(vertex.x * width, vertex.y * height, color, index);
        responsiveVertices.push(newResponsiveVertex);
    });
    return responsiveVertices;
}