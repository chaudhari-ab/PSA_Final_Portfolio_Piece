import React from "react";
import { connect } from "react-redux";

import { changePhase, changeSelectedAlgorithmSortMethod } from "../utils/changeStore/changeBasicInfo";


const ButtonsKruskal2 = props => {

    return (
        <div className="conditional-content">
            <div className="step-display">
                Step 2: Make Edges Set
            </div>
            {/* <div className="button-row">
                <button onClick={() => changeSelectedAlgorithmSortMethod("merge")} className={`ui button primary ${props.sortMethod === "merge" && "selected"}`}>Merge Sort (fast)</button>
                <button onClick={() => changeSelectedAlgorithmSortMethod("quick")} className={`ui button primary ${props.sortMethod === "quick" && "selected"}`}>Quick Sort (fast)</button>
                <button onClick={() => changeSelectedAlgorithmSortMethod("bubble")} className={`ui button primary ${props.sortMethod === "bubble" && "selected"}`}>Bubble Sort (slow)</button>
                <button onClick={() => changeSelectedAlgorithmSortMethod("selection")} className={`ui button primary ${props.sortMethod === "selection" && "selected"}`}>Selection Sort (slow)</button>
            </div> */}
            <div className="button-row">
                <span className="button-row-label" >start algorithm:</span>
                <br />
                <button onClick={() => changePhase("sorting")} className="ui button primary">Continue</button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        sortMethod: state.selectedAlgorithm.sortMethod
    }
}

export default connect(mapStateToProps)(ButtonsKruskal2);