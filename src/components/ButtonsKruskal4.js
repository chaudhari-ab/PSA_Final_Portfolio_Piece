import React from "react";
import { connect } from "react-redux";

import { changePhase, changeSelectedAlgorithmCycleSearchMethod } from "../utils/changeStore/changeBasicInfo";


const ButtonsKruskal4 = props => {

    return (
        <div className="conditional-content">
            <div className="step-display">
                Step 4: Start Kruskal's algorithm
            </div>
            <div className="button-row">
                {/* <button 
                    onClick={() => changeSelectedAlgorithmCycleSearchMethod("unionFind")} 
                    className={`ui button primary ${props.cycleSearchMethod === "unionFind" && "selected"}`}
                >
                    Union-Find (fast)
                </button>
                <button 
                    onClick={() => changeSelectedAlgorithmCycleSearchMethod("depthFirstSearch")} 
                    className={`ui button primary ${props.cycleSearchMethod === "depthFirstSearch" && "selected"}`}
                >
                    Search for cycles (slow)
                </button> */}
            </div>
            <div className="button-row">
                <span className="button-row-label" >Start algorithm:</span>
                <br />
                <button onClick={() => changePhase("solving")} className="ui button primary">Continue</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cycleSearchMethod: state.selectedAlgorithm.cycleSearchMethod
    }
}

export default connect(mapStateToProps)(ButtonsKruskal4);