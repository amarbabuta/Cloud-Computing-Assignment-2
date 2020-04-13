import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lgas: this.props.lgas
        }
    }

    render() {
        return (
            <div className="home">
                <CardDeck>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Total Tweets</Card.Title>
                            <Card.Text>{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return { properties: { tweets: (prev.properties.tweets || 0) + (curr.properties.tweets || 0) } };
                                }).properties.tweets
                            }</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Average Tweets per LGA</Card.Title>
                            <Card.Text>{
                                (this.state.lgas.features.reduce((prev, curr) => {
                                    return { properties: { tweets: (prev.properties.tweets || 0) + (curr.properties.tweets || 0) } };
                                }).properties.tweets / this.state.lgas.features.length).toFixed(2)
                            }</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>LGA With Most Tweets</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.tweets > curr.properties.tweets) ? prev : curr
                                }).properties.vic_lga__3
                            }</Card.Subtitle>
                            <Card.Text>{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.tweets > curr.properties.tweets) ? prev : curr
                                }).properties.tweets
                            }</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>LGA With Least Tweets</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.tweets < curr.properties.tweets) ? prev : curr
                                }).properties.vic_lga__3
                            }</Card.Subtitle>
                            <Card.Text>{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.tweets < curr.properties.tweets) ? prev : curr
                                }).properties.tweets
                            }</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
                <br />
                <CardDeck>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Average Tweet Sentiment</Card.Title>
                            <Card.Text>{
                                (this.state.lgas.features.reduce((prev, curr) => {
                                    return { properties: { sentiment: (prev.properties.sentiment || 0) + (curr.properties.sentiment || 0) } };
                                }).properties.sentiment / this.state.lgas.features.length * 100).toFixed(2)
                            }% Negative</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Most Negative LGA</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.sentiment > curr.properties.sentiment) ? prev : curr
                                }).properties.vic_lga__3
                            }</Card.Subtitle>
                            <Card.Text>{
                                (this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.sentiment > curr.properties.sentiment) ? prev : curr
                                }).properties.sentiment * 100).toFixed(2)
                            }% Negative</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card bg="light" style={{ width: '18rem' }}>
                        <Card.Body>
                            <Card.Title>Least Negative LGA</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{
                                this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.sentiment < curr.properties.sentiment) ? prev : curr
                                }).properties.vic_lga__3
                            }</Card.Subtitle>
                            <Card.Text>{
                                (this.state.lgas.features.reduce((prev, curr) => {
                                    return (prev.properties.sentiment < curr.properties.sentiment) ? prev : curr
                                }).properties.sentiment * 100).toFixed(2)
                            }% Negative</Card.Text>
                        </Card.Body>
                    </Card>
                </CardDeck>
            </div>
        )
    }
}

export default Home
