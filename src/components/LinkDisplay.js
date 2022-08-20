import React from "react";

const LinkDisplay = props => {
    return (
        <div className="link-display-wrapper">
            <div className="link-display" style={{opacity: props.opacity}}>
                <h3>{props.name}</h3>
            </div>
        </div>
    );
}

export default LinkDisplay;