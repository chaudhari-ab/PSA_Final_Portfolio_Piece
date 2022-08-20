import { combineReducers } from "redux";
import { initialState } from "./initialState";
import {
    UPDATE_SELECTED_ALGORITHM,
    UPDATE_PHASE,
    UPDATE_INPUT,
    UPDATE_EDIT_GRAPH,
    UPDATE_FORM_INPUT,
    UPDATE_DATA,
    UPDATE_ALGORITHM_PROGRESS,
    RESET
} from "../actions/types";

//note that the logic of updating state is not written in either the action creator or reducer
//functions but rather separate functions that can be exported and called without having to access
//the redux score or connect component directly

const selectedAlgorithmReducer = (state={ ...initialState.selectedAlgorithm }, action) => {
    if (action.type === UPDATE_SELECTED_ALGORITHM) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.selectedAlgorithm;
    }
    return state;
}
const phaseReducer = (state=initialState.phase, action) => {
    if (action.type === UPDATE_PHASE) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.phase;
    }
    return state;
}
const inputReducer = (state={ ...initialState.input}, action) => {
    if (action.type === UPDATE_INPUT) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.input;
    }
    return state;
}
const editGraphReducer = (state={ ...initialState.editGraph}, action) => {
    if (action.type === UPDATE_EDIT_GRAPH) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.editGraph;
    }
    return state;
}
const formInputReducer = (state={ ...initialState.formInput}, action) => {
    if (action.type === UPDATE_FORM_INPUT) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.formInput;
    }
    return state;
}
const dataReducer = (state={ ...initialState.data}, action) => {
    if (action.type === UPDATE_DATA) {
        return action.payload;
    }
    if (action.type === RESET) {
        return action.payload.data;
    }
    return state;
}
const algorithmProgressReducer = (state={ ...initialState.algorithmProgress}, action) => {
    if (action.type === UPDATE_ALGORITHM_PROGRESS) {
        return action.payload;
    }
    if (action.type === RESET) {
        console.log("returning kruskal algorithm progress:", initialState.algorithmProgress.kruskal);
        return action.payload.algorithmProgress;
    }
    return state;
}

export default combineReducers({
    selectedAlgorithm: selectedAlgorithmReducer,
    phase: phaseReducer,
    input: inputReducer,
    editGraph: editGraphReducer,
    formInput: formInputReducer,
    data: dataReducer,
    algorithmProgress: algorithmProgressReducer
});
