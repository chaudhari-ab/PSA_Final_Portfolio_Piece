import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./UserInput.css";
import { callReset, changeSelectedAlgorithmType } from "../utils/changeStore/changeBasicInfo";
import changeInput from "../utils/changeStore/changeInput";

import ButtonsKruskal1 from "./ButtonsKruskal1";
import ButtonsKruskal2 from "./ButtonsKruskal2";
import ButtonsKruskal3 from "./ButtonsKruskal3";
import ButtonsKruskal4 from "./ButtonsKruskal4";
import ButtonsKruskal5 from "./ButtonsKruskal5";
// import ButtonsKosaraju1 from "./ButtonsKosaraju1";
// import ButtonsKosaraju2 from "./ButtonsKosaraju2";
// import ButtonsKosaraju3 from "./ButtonsKosaraju3";
// import ButtonsKosaraju4 from "./ButtonsKosaraju4";
// import ButtonsKosaraju5 from "./ButtonsKosaraju5";
// import ButtonsHuffman1 from "./ButtonsHuffman1";
// import ButtonsHuffman2 from "./ButtonsHuffman2";
// import ButtonsHuffman3 from "./ButtonsHuffman3";
import ButtonsCompleted from "./ButtonsCompleted";

const UserInput = props => {

    const resetPage = () => {
        window.location.reload()
        const { type } = props;
        callReset();
        changeSelectedAlgorithmType(type);
        if (type === "kruskal" || type ==="kosaraju") {
            changeInput("small")
        }
        else {
            changeInput("");
        }
    }

    //determines which content to render based on algorithm selected and phase
    const renderButtons = (type, phase) => {
        if (type === "kruskal") {
            switch (phase) {
                case "notStarted":
                    return <ButtonsKruskal1 />;
                case "choosingSort":
                    return <ButtonsKruskal2 />;
                case "sorting":
                    return <ButtonsKruskal3 />;
                case "choosingCycleSearchMethod":
                    return <ButtonsKruskal4 />;
                case "solving":
                    return <ButtonsKruskal5 />;
                case "completed":
                    return <ButtonsCompleted />;
                default:
                    return;
            }
        }
        if (type === "kosaraju") {
            switch (phase) {
                // case "notStarted":
                //     return <ButtonsKosaraju1 />;
                // case "readyToReverse":
                //     return <ButtonsKosaraju2 />;
                // case "depthFirstSearch":
                //     return <ButtonsKosaraju3 />;
                // case "readyToUnreverse":
                //     return <ButtonsKosaraju4 />;
                // case "solving":
                //     return <ButtonsKosaraju5 />;
                case "completed":
                    return <ButtonsCompleted />
                default:
                    return;
            }
        }
        if (type === "huffman") {
            switch (phase) {
                // case "notStarted":
                //     return <ButtonsHuffman1 />;
                // case "heapifying":
                //     return <ButtonsHuffman2 />;
                // case "solving":
                //     return <ButtonsHuffman3 />;
                // case "completed":
                //     return <ButtonsCompleted />
                default:
                    return;
            }
        }
    }

    return (
        <div className={props.type === "huffman" ? "user-input-wrapper-huffman" : "user-input-wrapper"}>
            <div className={props.type === "huffman" ? "user-input-huffman" : "user-input"}>
                {renderButtons(props.type, props.phase)}
                <div className="permanent-content">
                    <div className="parmanent-buttons-wrapper">
                        <button onClick={resetPage} className="ui secondary button">Reset</button>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        type: state.selectedAlgorithm.type, 
        phase: state.phase
    };
}

export default connect(mapStateToProps)(UserInput);