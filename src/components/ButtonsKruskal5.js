import React from "react";
import { connect } from "react-redux";

import { store } from "../index";
import nextUnionFindStep from "../utils/changeStore/nextUnionFindStep";
import nextSearchCyclesStep from "../utils/changeStore/nextSearchCyclesStep";


const ButtonsKruskal5 = props => {
    //runs next step of the algorithm each interval and stops when phase changes
    const nextStepHandler = () => {
        const handler = setInterval(() => {
            console.log("iterating");
            const phase = store.getState().phase;
            if (phase !== "solving") {
                clearInterval(handler);
            }
            else {
                nextStep();
            }
        }, props.numberOfEdges > 35 ? 50 : 200);
    }

    const nextStep = props.cycleSearchMethod === "unionFind" ? nextUnionFindStep : nextSearchCyclesStep;

    return (
        <div className="conditional-content">
            <div className="step-display">
                Step 5: Run algorithm
            </div>
            <div className="button-row">
                <button onClick={nextStep} className={"ui button primary"}>Next algorithm step</button>
                <button onClick={nextStepHandler} className={"ui button primary"}>Run algorithm</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        cycleSearchMethod: state.selectedAlgorithm.cycleSearchMethod,
        numberOfEdges: state.data.kruskal.edges.length
    }
}

export default connect(mapStateToProps)(ButtonsKruskal5);