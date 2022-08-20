import React from "react";
import { connect } from "react-redux";

import Header from "./Header";
import "./About.css";

class About extends React.Component {

    //renderText displays the explanation text for each algorithm depending on which page the About page has been accessed from 
    renderText() {
        
            // case "kruskal":
                return (
                    <div>
                        <h2>Kruskal's algorithm</h2>
                        <p>
                        Kruskal’s algorithm computes the minimum spanning tree (or, rather, a minimum spanning tree) for a weighted undirected graph.  In simpler terms, a weighted undirected graph is a set of points or vertices connected by a set of edges, each with an associated cost.  On the graph below, the vertices are displayed as circles and indexed numerically.  The edges are sized both according to the distance between the points they connect (the greater the distance, the thinner the edge) as well to their cost (the lower the cost, the wider the edge, so that a wider edge indicates greater connectivity between two vertices).  A minimum spanning tree is a subset of the set of edges that connect all vertices with a minimized total cost.
                        </p>
                        <p>
                        Kruskal’s algorithm begins by taking all of the edges on the graph and sorting them by cost.  Then, beginning with the lowest cost edge and proceeding one by one, it attempts to add each edge back to the graph but only does so if there are no cycles.  In order to check for cycles, the algorithm either runs a depth-first-search on the vertices connected by the edge being tested or else it employs a more efficient Union-Find data structure in which the vertices keep track of which other vertices they are already connected to (represented in the below display by colors).
                        </p>
                    </div>
                );
                
        
    }

    render() {
        return (
            <div class="about-global-wrapper">
                <Header />
                <div className="about-outer-wrapper">
                    <div className="about-inner-wrapper" >
                        <div className="about-content">
                           {this.renderText()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {selectedAlgorithmType: state.selectedAlgorithm.type};
}

export default connect(mapStateToProps)(About);