import React from "react";
import P5Wrapper from 'react-p5-wrapper';
import { connect } from "react-redux";
import kruskalSortSketch from '../sketches/kruskalSortSketch';

class KruskalSortHandler extends React.Component {

    render() {
        return (
            <P5Wrapper 
                sketch={kruskalSortSketch} 
                edges={this.props.edges}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        edges: [...state.data.kruskal.edges],
    }
}

export default connect(mapStateToProps)(KruskalSortHandler);