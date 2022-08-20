import React from "react";
import { HashRouter, Route } from "react-router-dom";

import Home from "./Home";
import Kruskal from "./Kruskal";
import About from "./About";

const App = () => {

    return (
        <HashRouter>
            <Route path="/" exact component={Kruskal} />
            <Route path="/kruskal" exact component={Kruskal} />
            {/* <Route path="/kosaraju" exact />
            <Route path="/huffman" /> */}
            <Route path="/about" exact component={About} />
        </HashRouter>
    );
}

export default App;