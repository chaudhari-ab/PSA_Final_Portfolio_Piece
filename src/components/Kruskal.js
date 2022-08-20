import React from "react";

import { callReset, changeSelectedAlgorithmType } from "../utils/changeStore/changeBasicInfo";
import changeInput from "../utils/changeStore/changeInput";
import Header from "./Header";
import UserInput from "./UserInput";
import KruskalGraphHandler from "./KruskalGraphHandler";
import KruskalSortHandler from "./KruskalSortHandler";

class Kruskal extends React.Component {
    componentDidMount() {
        //resets the redux store when page is accessed
        callReset();
        changeSelectedAlgorithmType("kruskal");
        changeInput("small");
    }

    render() {
        return (
            <div>
                <Header />
                <UserInput />
                <div style={{display: "flex", justifyContent: "center"}}>
                    <KruskalGraphHandler  />
                    <KruskalSortHandler  />
                </div>
            </div>
        );
    }
}

export default Kruskal;