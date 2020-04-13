import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import DropdownItem from 'react-bootstrap/DropdownItem';

class Header extends Component {
    render() {
        return (
            <Navbar id="navbar" bg="dark" variant="dark" expand="lg">
                <Navbar.Brand href="/">COMP90024 Team 33</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#map">Map</Nav.Link>
                    <Nav.Link href="#graph">Graph</Nav.Link>
                </Nav>
                <Form inline>
                    {this.props.location.pathname === "/map" &&
                        <DropdownButton title="Select Property" variant="info" className="mr-sm-2" alignRight>
                            <DropdownItem eventKey="sentiment" active={"sentiment" === this.props.currProperty} onSelect={this.props.setCurrProperty}>Sentiment</DropdownItem>
                            <DropdownItem eventKey="crime" active={"crime" === this.props.currProperty} onSelect={this.props.setCurrProperty}>Crime per Capita</DropdownItem>
                            <DropdownItem eventKey="tweets" active={"tweets" === this.props.currProperty} onSelect={this.props.setCurrProperty}>Tweets</DropdownItem>
                        </DropdownButton>
                    }
                    {this.props.location.pathname === "/graph" &&
                        <DropdownButton title="Select Comparison" variant="info" className="mr-sm-2" alignRight>
                            <DropdownItem eventKey="violent_crimes" active={"violent_crimes" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Violent Crimes per Capita</DropdownItem>
                            <DropdownItem eventKey="burglary" active={"burglary" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Burglary per Capita</DropdownItem>
                            <DropdownItem eventKey="assault" active={"assault" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Assault per Capita</DropdownItem>
                            <DropdownItem eventKey="sexual" active={"sexual" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Sexual Offences per Capita</DropdownItem>
                            <DropdownItem eventKey="disorderly" active={"disorderly" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Disorderly Conduct per Capita</DropdownItem>
                            <DropdownItem eventKey="robbery" active={"robbery" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Robbery per Capita</DropdownItem>
                            <DropdownItem eventKey="stalking" active={"stalking" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Stalking per Capita</DropdownItem>
                            <DropdownItem eventKey="homicide" active={"homicide" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Homicide per Capita</DropdownItem>
                            <DropdownItem eventKey="theft" active={"theft" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Theft per Capita</DropdownItem>
                            <DropdownItem eventKey="abduction" active={"abduction" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Abduction per Capita</DropdownItem>
                            <DropdownItem eventKey="arson" active={"arson" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Arson per Capita</DropdownItem>
                            <DropdownItem eventKey="mental" active={"mental" === this.props.currComparison} onSelect={this.props.setCurrComparison}>Mental Illness per Capita</DropdownItem>
                        </DropdownButton>
                    }
                    <Button variant="info" onClick={this.props.refreshData}>Refresh</Button>
                </Form>
            </Navbar>
        )
    }
}

export default Header;
