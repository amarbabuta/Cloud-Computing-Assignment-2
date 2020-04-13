import React, { Component } from 'react';
import { HashRouter, Route, Switch } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

import Header from './Header';
import Home from './Home';
import Map from './Map';
import Graph from './Graph';

import config from '../config';
import VIC from '../data/vic';
import VIC_CODES from '../data/vic_codes';

import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';

const db = require('nano')(`http://${config.DB_HOST}:5984/tweets`);

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            views: {
                AvgSentiment: null,
                TopWords: null,
                TweetsCount: null,
                VicCrimes: null,
                VicHealth: null
            },
            lgas: VIC,
            currProperty: "sentiment",
            currComparison: "violent_crimes",
            loading: true
        };

        this.setCurrProperty = this.setCurrProperty.bind(this);
        this.setCurrComparison = this.setCurrComparison.bind(this);
        this.refreshData = this.refreshData.bind(this);
    }

    componentDidMount() {
        this.refreshData();
    }

    setCurrProperty(eventKey) {
        this.setState({ currProperty: eventKey });
    }

    setCurrComparison(eventKey) {
        this.setState({ currComparison: eventKey });
    }

    refreshData() {
        var AvgSentiment = db.view('Analysis', 'AvgSentiment', { reduce: true, group: true });
        var TopWords = db.view('Analysis', 'TopWords', { reduce: true, group: true });
        var TweetsCount = db.view('Analysis', 'TweetsCount', { reduce: true, group: true });
        var VicCrimes = db.view('Analysis', 'VicCrimes');
        var VicHealth = db.view('Analysis', 'VicHealth');

        Promise.all([AvgSentiment, TopWords, TweetsCount, VicCrimes, VicHealth])
            .then(([AvgSentiment, TopWords, TweetsCount, VicCrimes, VicHealth]) => {
                var lgas = this.state.lgas;
                lgas.features = lgas.features.filter(lga => VIC_CODES[lga.properties.vic_lga__3]).map(lga => {
                    var code = VIC_CODES[lga.properties.vic_lga__3];
                    lga.properties.lga_code = code;
                    lga.properties.sentiment = AvgSentiment.rows.find(lga => lga.key === code).value;
                    lga.properties.top_words = TopWords.rows.find(lga => lga.key === code).value;
                    lga.properties.tweets = TweetsCount.rows.find(lga => lga.key === code).value;
                    lga.properties.crimes = VicCrimes.rows.find(lga => lga.key === code).value;
                    lga.properties.population = VicCrimes.rows.find(lga => lga.key === code).value.population;
                    delete lga.properties.crimes.population;
                    lga.properties.mental_illness = VicHealth.rows.find(lga => lga.key === code).value;
                    return lga;
                });
                this.setState({ lgas: lgas, loading: false });
            });
    }

    render() {
        return (
            <div>
                <HashRouter>
                    <Route path="/" render={(routeProps) => (
                        <Header {...routeProps} refreshData={this.refreshData} loading={this.state.loading} lgas={this.state.lgas} currProperty={this.state.currProperty} setCurrProperty={this.setCurrProperty} currComparison={this.state.currComparison} setCurrComparison={this.setCurrComparison} />
                    )} />
                    {this.state.loading ? (
                        <Spinner id="spinner" animation="border" variant="dark" />
                    ) : (
                            <Switch>
                                <Route exact path="/" render={(routeProps) => (
                                    <Home {...routeProps} lgas={this.state.lgas} />
                                )} />
                                <Route exact path="/map" render={(routeProps) => (
                                    <Map {...routeProps} lgas={this.state.lgas} currProperty={this.state.currProperty} />
                                )} />
                                <Route exact path="/graph" render={(routeProps) => (
                                    <Graph {...routeProps} lgas={this.state.lgas} currComparison={this.state.currComparison} />
                                )} />
                            </Switch>
                        )}
                </HashRouter>
            </div>
        );
    }
}

export default App;
