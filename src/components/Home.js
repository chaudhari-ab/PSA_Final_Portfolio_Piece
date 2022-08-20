import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

import LinkDisplay from "./LinkDisplay";

const FADE_TIME = 3000;

class Home extends React.Component {

    //opacity levels in state changed by fade-in functions called by componentDidMount
    state = {
        opacityLevels: {
            title: 0,
            kruskal: 0,
            kosaraju: 0,
            huffman: 0
        }
    };

    componentDidMount = () => {
        console.log("componentDidMount in Home.js called")
        this.fadeInElements();
    }

    //title and links fade in when users access page
    fadeInElements = () => {
        setTimeout(() => this.fadeInOneElement("title"), FADE_TIME * 0.25);
        setTimeout(() => this.fadeInOneElement("kruskal"), FADE_TIME * 0.75);
        setTimeout(() => this.fadeInOneElement("kosaraju"), FADE_TIME * 1.25);
        setTimeout(() => this.fadeInOneElement("huffman"), FADE_TIME * 1.75);
    }

    fadeInOneElement = element => {
        let count = 0;
        const INTERVAL_TIME = 10;
        const handler = setInterval(() => {
            count++;
            const newOpacity = count * INTERVAL_TIME / FADE_TIME;
            this.setState({
                opacityLevels: {
                    ...this.state.opacityLevels,
                    [element]: newOpacity
                }
            });
            if (count >= FADE_TIME / INTERVAL_TIME) {
                clearInterval(handler);
            }
        }, INTERVAL_TIME);
    }

    render() {
        return (
            <div className="home">
                <div className="title" style={{opacity: this.state.opacityLevels.title}}>
                    <h4>A L G O R I T H M S</h4>
                </div>
                <div className="links">
                    <Link to="/kruskal">
                        <LinkDisplay name="KRUSKAL" opacity={this.state.opacityLevels.kruskal} />
                    </Link>
                    <Link>
                        <LinkDisplay name="KOSARAJU - SHAHRIR" opacity={this.state.opacityLevels.kosaraju} />
                    </Link>
                    <Link >
                        <LinkDisplay name="HUFFMAN" opacity={this.state.opacityLevels.huffman} />
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;