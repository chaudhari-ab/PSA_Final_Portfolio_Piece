import React from "react";
import { connect } from "react-redux";

import { store } from "../index";
import nextMergeSortStep from "../utils/changeStore/nextMergeSortStep";
import nextQuickSortStep from "../utils/changeStore/nextQuickSortStep";
import nextBubbleSortStep from "../utils/changeStore/nextBubbleSortStep";
import nextSelectionSortStep from "../utils/changeStore/nextSelectionSortStep";


const ButtonsKruskal3 = props => {
    //runs next step of the algorithm each interval and stops when phase changes
    const nextStepHandler = () => {
        const handler = setInterval(() => {
            console.log("iterating");
            const phase = store.getState().phase;
            if (phase !== "sorting") {
                clearInterval(handler);
            }
            else {
                nextStep();
            }
        }, props.numberOfEdges > 35 ? 10 : 50);
    }

    //determines which sort method to run the next step of based on user-selected sort method option
    const nextStep = () => {
        switch (props.sortMethod) {
            case "merge":
                nextMergeSortStep();
                break;
            case "quick":
                nextQuickSortStep();
                break;
            case "bubble":
                nextBubbleSortStep();
                break;
            default:
                nextSelectionSortStep();
        }
    }

    return (
        <div className="conditional-content">
            <div className="step-display">
                Step 3: Sort the Edges
            </div>
            <div className="button-row">
                <button onClick={nextStep} className={"ui button primary"}>Next sort step</button>
                <button onClick={nextStepHandler} className={"ui button primary"}>Run sort</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        sortMethod: state.selectedAlgorithm.sortMethod,
        numberOfEdges: state.data.kruskal.edges.length
    }
}

export default connect(mapStateToProps)(ButtonsKruskal3);