import { store } from "../../index.js";
import {
    updateFormInput,
    } from "../../actions";

export default function changeFormInput(newInput) {
    const payload = { ...store.getState().formInput }
    const { type } = store.getState().selectedAlgorithm;
    payload[type] = newInput; //note that this relies on the fact that the properties of formInput are spelled the same
                                //as the selectedAlgorithm.type options
    store.dispatch(updateFormInput(payload));
}
