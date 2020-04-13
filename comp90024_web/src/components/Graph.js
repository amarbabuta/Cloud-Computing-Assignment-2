import React, { Component } from 'react';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, MarkSeries } from 'react-vis';
import Card from 'react-bootstrap/Card'

import 'react-vis/dist/style.css';

class Graph extends Component {
    constructor(props) {
        super(props);

        this.state = {
            scatter: this.getData(props),
            hover: false,
            hovered: {},
            mouse: {},
            comparison: "Violent Crimes per Capita",
            width: window.innerWidth,
            height: window.innerHeight
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.getData = this.getData.bind(this);
        this.onHover = this.onHover.bind(this);
        this.convertRemToPixels = this.convertRemToPixels.bind(this);
    }

    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight - document.getElementById("navbar").offsetHeight
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillReceiveProps(newProps) {
        this.setState({ scatter: this.getData(newProps) });
    }

    getData(props) {
        if (!props) {
            return;
        }
        var scatter = [];
        if (props.currComparison === "violent_crimes") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.violent_offences_per_capita || 0),
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Violent Crimes per Capita" });
            });
        } else if (props.currComparison === "burglary") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.burglary || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Burglary per Capita" });
            });
        } else if (props.currComparison === "assault") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.assault || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Assault per Capita" });
            });
        } else if (props.currComparison === "sexual") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.sexual || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Sexual Offences per Capita" });
            });
        } else if (props.currComparison === "disorderly") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.disorderly || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Disorderly Conduct per Capita" });
            });
        } else if (props.currComparison === "robbery") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.robbery || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Robbery per Capita" });
            });
        } else if (props.currComparison === "stalking") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.stalking || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Stalking per Capita" });
            });
        } else if (props.currComparison === "homicide") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.homicide || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Homicide per Capita" });
            });
        } else if (props.currComparison === "theft") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.theft || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Theft per Capita" });
            });
        } else if (props.currComparison === "abduction") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.abduction || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Abduction per Capita" });
            });
        } else if (props.currComparison === "arson") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.crimes.arson || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Arson per Capita" });
            });
        } else if (props.currComparison === "mental") {
            props.lgas.features.forEach(lga => {
                scatter.push({
                    x: lga.properties.sentiment,
                    y: (lga.properties.mental_illness || 0) / lga.properties.population,
                    lga: lga.properties.vic_lga__3,
                    tweets: lga.properties.tweets
                });
                this.setState({ comparison: "Mental Illness per Capita" });
            });
        }

        return scatter;
    }

    onHover(datapoint, event) {
        this.setState({
            hover: true,
            hovered: datapoint,
            mouse: {
                x: (event.event.clientX < (window.innerWidth - this.convertRemToPixels(20)) ? event.event.clientX : (window.innerWidth - this.convertRemToPixels(20))),
                y: (event.event.clientY < (window.innerHeight - this.convertRemToPixels(9.4)) ? event.event.clientY : (window.innerHeight - this.convertRemToPixels(9.4)))
            }
        });
    }

    convertRemToPixels(rem) {    
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }

    render() {
        return (
            <div>
                <XYPlot width={this.state.width} height={this.state.height} onMouseLeave={() => { this.setState({ hover: false }) }}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis title="Negative Sentiment" />
                    <YAxis title={this.state.comparison} />
                    <MarkSeries onNearestXY={this.onHover} data={this.state.scatter} />
                </XYPlot>
                {this.state.hover &&
                    <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: this.state.mouse.x, top: this.state.mouse.y }}>
                        <Card style={{ width: '20rem' }}>
                            <Card.Body>
                                <Card.Title>{this.state.hovered.lga}</Card.Title>
                                <Card.Text>
                                    Tweets: {this.state.hovered.tweets}<br />
                                    Negative Sentiment: {(this.state.hovered.x * 100).toFixed(2)}%<br />
                                    {this.state.comparison}: {(this.state.hovered.y).toFixed(4)}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                }
            </div>
        )
    }
}

export default Graph
