import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';

import Card from 'react-bootstrap/Card';

import config from '../config.js';

class Map extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight,
                latitude: -36.6,
                longitude: 145.5,
                zoom: 6.5
            },
            lgas: this.props.lgas
        };

        this.updateDimensions = this.updateDimensions.bind(this);
        this.getFillColor = this.getFillColor.bind(this);
    }

    updateDimensions() {
        this.setState({
            viewport: {
                ...this.state.viewport,
                width: window.innerWidth,
                height: window.innerHeight - document.getElementById("navbar").offsetHeight
            }
        });
    }

    componentDidMount() {
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    _renderTooltip() {
        const { hoveredObject, pointerX, pointerY } = this.state || {};
        return hoveredObject && (
            <div style={{ position: 'absolute', zIndex: 1, pointerEvents: 'none', left: pointerX, top: pointerY }}>
                <Card style={{ width: '20rem' }}>
                    <Card.Body>
                        <Card.Title>{hoveredObject.properties.vic_lga__3}</Card.Title>
                        <Card.Text>
                            Population: {hoveredObject.properties.population}<br />
                            Tweets: {hoveredObject.properties.tweets}<br />
                            Negative Sentiment: {(hoveredObject.properties.sentiment * 100).toFixed(2)}%<br />
                            Violent Crimes: {hoveredObject.properties.crimes.violent_offences}<br />
                            Violent Crimes per Capita: {(hoveredObject.properties.crimes.violent_offences / hoveredObject.properties.population).toFixed(2)}
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }

    initialize(gl) {
        gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE, gl.ONE_MINUS_DST_ALPHA, gl.ONE);
        gl.blendEquation(gl.FUNC_ADD);
    }

    getFillColor(d) {
        var rgb = [0, 0, 0];
        var rgb1 = [0, 150, 0];
        var rgb2 = [150, 0, 0];

        var p;

        if (this.props.currProperty === "sentiment") {
            p = d.properties.sentiment;
        } else if (this.props.currProperty === "crime") {
            var maxCrime = this.state.lgas.features.reduce((prev, curr) => {
                return (prev.properties.crimes.violent_offences_per_capita > curr.properties.crimes.violent_offences_per_capita) ? prev : curr
            }).properties.crimes.violent_offences_per_capita;
            p = d.properties.crimes.violent_offences_per_capita / maxCrime;
        } else if (this.props.currProperty === "tweets") {
            var maxTweets = this.state.lgas.features.reduce((prev, curr) => {
                return (prev.properties.tweets > curr.properties.tweets) ? prev : curr
            }).properties.tweets;
            p = 1 - (d.properties.tweets / maxTweets);
        }

        for (var i = 0; i < 3; i++) {
            rgb[i] = rgb1[i] * (1.0 - p) + rgb2[i] * p;
        }
        return rgb;
    }

    render() {
        var geojsonLayer = new GeoJsonLayer({
            id: 'lga-layer',
            data: this.state.lgas,
            pickable: true,
            stroked: true,
            filled: true,
            extruded: false,
            lineWidthScale: 20,
            lineWidthMinPixels: 2,
            getLineColor: [0, 0, 0, 255],
            getFillColor: d => this.getFillColor(d),
            getRadius: 100,
            getLineWidth: 1,
            getElevation: 30,
            onHover: ({ object, x, y }) => this.setState({
                hoveredObject: object,
                pointerX: x,
                pointerY: y
            }),
            updateTriggers: {
                getFillColor: this.props.currProperty
            }
        });

        return (
            <div className='map'>
                <ReactMapGL
                    {...this.state.viewport}
                    mapboxApiAccessToken={config.MAPBOX_TOKEN}
                    onViewportChange={(viewport) => this.setState({ viewport })}>
                    <DeckGL
                        viewState={this.state.viewport}
                        layers={geojsonLayer}
                        onWebGLInitialized={this.initialize}>
                        {this._renderTooltip()}
                    </DeckGL>
                </ReactMapGL>
            </div>
        );
    }
}

export default Map;
