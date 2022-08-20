import { store } from "../index.js";
import React from "react";
import { connect } from "react-redux";



import { changeEditGraph } from "../utils/changeStore/editInput";
import addEdgeToSort from "../utils/changeStore/addEdgeToSort";
import KruskalForm from "./KruskalForm";

//buttons displayed when user accesses Kruskal page
const ButtonsKruskal1 = props => {

    //regulates whether the modal form is displayed for adding edge input
    const [displayForm, setDisplayForm] = React.useState(false);

    const hideForm = () => {
        setDisplayForm(false);
    }

    //renders instructions based on edit graph options the user has selected
    const renderText = () => {
        switch (true) {
            case props.editGraph.dragVertex:
                return "(click and drag vertices to change their position)";
            case props.editGraph.addVertex:
                return "(click on the canvas to add a vertex)";
            case props.editGraph.deleteVertex:
                return "(click on vertices to remove them)";
            case props.editGraph.deleteEdge:
                return "(click on two vertices to remove the connecting edge)"
            default:
                return "";
        }
    }

    //adds edges to sort station individually
    const addEdgesHandler = () => {
        const handler = setInterval(() => {
            const phase = store.getState().phase;
            if (phase !== "notStarted") {
                clearInterval(handler);
            }
            else {
                addEdgeToSort();
            }
        }, 10);
    }

    return (
        <div className="conditional-content">
            {displayForm && <KruskalForm hideForm ={hideForm}/>}
            <div className="step-display">
                Step 1: Edit Graph
            </div>
            {/* <div className="button-row">
                <span className="button-row-label" >choose input:</span>
                <br />
                <button onClick={() => changeInput("small")} className={`ui button primary ${props.input === "small" && "selected"}`}>Small Input</button>
                <button onClick={() => changeInput("large")} className={`ui button primary ${props.input === "large" && "selected"}`}>Large Input</button>
            </div> */}
            <div className="button-row">
                <span className="button-row-label" >edit:</span>
                <br />
                <button onClick={() => changeEditGraph("dragVertex")}  className={`ui button danger ${props.editGraph.dragVertex && "selected"}`}>Move Vertices</button>
                <button onClick={() => changeEditGraph("addVertex")} className={`ui button danger ${props.editGraph.addVertex && "selected"}`}>Add Vertices</button>
                <button onClick={() => changeEditGraph("deleteVertex")} className={`ui button danger ${props.editGraph.deleteVertex && "selected"}`}>Delete Vertices</button>
                <button onClick={() => setDisplayForm(true)} className="ui button danger">Add Edges</button>
                <button onClick={() => changeEditGraph("deleteEdge")} className={`ui button danger ${props.editGraph.deleteEdge && "selected"}`}>Delete Edges</button>
            </div>
            <div className="button-row">
                <span className="button-row-label" >start algorithm:</span>
                <br />
                <button onClick={addEdgesHandler} className="ui button primary">Begin</button>
            </div>
            <div className="message-display">
                {renderText()}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        editGraph: state.editGraph,
        input: state.data.kruskal.input,
    }
}

export default connect(mapStateToProps)(ButtonsKruskal1);