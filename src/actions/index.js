import {
    UPDATE_SELECTED_ALGORITHM,
    UPDATE_PHASE,
    UPDATE_INPUT,
    UPDATE_EDIT_GRAPH,
    UPDATE_FORM_INPUT,
    UPDATE_DATA,
    UPDATE_ALGORITHM_PROGRESS,
    RESET
} from "./types";
import { initialState } from "../reducers/initialState";

//note that the logic of updating state is not written in either the action creator or reducer
//functions but rather separate functions that can be exported and called without having to access
//the redux score or connect component directly

export const updateSelectedAlgorithm = payload => {
    return {
        type: UPDATE_SELECTED_ALGORITHM,
        payload
    }
}

export const updatePhase = payload => {
    return {
        type: UPDATE_PHASE,
        payload
    }
}

export const updateInput = payload => {
    return {
        type: UPDATE_INPUT,
        payload
    }
}

export const updateEditGraph = payload => {
    return {
        type: UPDATE_EDIT_GRAPH,
        payload
    }
}

export const updateFormInput = payload => {
    return {
        type: UPDATE_FORM_INPUT,
        payload
    }
}

export const updateData = payload => {
    return {
        type: UPDATE_DATA,
        payload
    }
}

export const updateAlgorithmProgress = payload => {
    return {
        type: UPDATE_ALGORITHM_PROGRESS,
        payload
    }
}

export const reset = () => {
    return {
        type: RESET,
        payload: initialState
    }
}
