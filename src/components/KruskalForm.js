import React from "react";
import ReactDOM from "react-dom";

import { connect} from "react-redux";
import changeFormInput from "../utils/changeStore/changeFormInput";
import { addEdge } from "../utils/changeStore/editInput";

const KruskalForm = props => {

     //sends updated form input to redux store
    const updateForm = e => {
        const payload = {...props.form, [e.target.name]: e.target.value};
        changeFormInput(payload);
    }

    //updates input data in store and closes window
    const onSubmit = () => {
        if ((props.form.vertex1 || props.form.vertex1 === 0) && (props.form.vertex1 || props.form.vertex1 === 0) 
            && props.form.vertex1 < props.totalVertices && props.form.vertex2 < props.totalVertices && props.form.cost
            && props.form.vertex1 !== props.form.vertex2) {
                console.log("calling addEdge");
                addEdge(props.form.vertex1, props.form.vertex2, props.form.cost);
            }
        props.hideForm();
    }

    return ReactDOM.createPortal(
        <div className="ui dimmer modals visible active" onClick={props.hideForm}>
            <div className="ui standard modal visible active custom-padding" onClick={(e) => e.stopPropagation()}>
                <div className="ui form">
                <div className="form-row">
                    <span className="button-row-label" >enter first vertex:</span>
                    <br />
                    <input onChange={updateForm} className="ui input" type="number" name="vertex1" value={props.form.vertex1} autoComplete="off"></input>
                </div>
                <div className="form-row">
                    <span className="button-row-label" >enter second vertex:</span>
                    <br />
                    <input onChange={updateForm} type="number" name="vertex2" value={props.form.vertex2} autoComplete="off"></input>
                </div>
                <div className="form-row">
                    <span className="button-row-label" >enter cost:</span>
                    <br />
                    <input onChange={updateForm} type="number" name="cost" value={props.form.cost} autoComplete="off"></input>
                </div>
                </div>
                <div className="actions">
                    <button onClick={onSubmit} className="ui button primary">Submit</button>
                    <button onClick={props.hideForm} className="ui button">Cancel</button>
                </div>
            </div>
        </div>,
        document.querySelector("#modal")
    );
}

const mapStateToProps = state => {
    return {
        form: state.formInput.kruskal,
        totalVertices: state.data.kruskal.vertices.length
    };
}

export default connect(mapStateToProps)(KruskalForm);