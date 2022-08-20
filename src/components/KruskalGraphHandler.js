import React from "react";
import P5Wrapper from 'react-p5-wrapper';
import { connect } from "react-redux";
import kruskalGraphSketch from '../sketches/kruskalGraphSketch';
import { store } from "../index";

class KruskalGraphHandler extends React.Component {   
    render() {
        return (
            <P5Wrapper 
                sketch={kruskalGraphSketch} 
                vertices={this.props.vertices}
                edges={this.props.edges}
                type={this.props.type}
                editGraph={this.props.editGraph}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        edges: [ ...state.data.kruskal.edges ],
        vertices: [ ...state.data.kruskal.vertices ],
        type: state.selectedAlgorithm.cycleSearchMethod,
        editGraph: state.editGraph
    }
}

export default connect(mapStateToProps)(KruskalGraphHandler);