import React, { Component } from "react";
import { connect } from "react-redux";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import pokemon from 'pokemontcgsdk'

class CollectionsCreate extends Component {
    constructor(props) {
        super(props);

        this.searchTcgApiCard = this.searchTcgApiCard.bind(this);
        this.changeSearchTerm = this.changeSearchTerm.bind(this);

        this.state = {
            searchCards: [],
            searchTerm: 'name:blastoise',
        };
    }

    componentDidMount() {

    }

    changeSearchTerm(e) {
        this.setState({ searchTerm: e.target.value }, () =>  {
            console.log(this.state)
        })
    }

    searchTcgApiCard(query){
        CollectionService.getTcgApiQuery(this.state.searchTerm)
            .then((cards) => {
                this.setState({searchCards: cards.data}, () =>  {
                    console.log(this.state)
                })
            })

    }

    render() {
        const collectionList = (
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Card No</th>
                    <th>Name</th>
                    <th>Supertype</th>
                    <th>Set</th>
                    <th>Release Date</th>
                    <th>Rarity</th>
                </tr>
                </thead>
                <tbody>
                {this.state.searchCards.length ? (

                    this.state.searchCards.map(function (card, i) {
                        // debugger;

                        return (
                            <tr key={i} >
                                <td>{card.id}</td>
                                <td>{card.number + "/" + card.set.printedTotal}</td>
                                <td>{card.name}</td>
                                <td>{card.supertype}</td>
                                <td>{card.set.name}</td>
                                <td>{card.set.releaseDate}</td>
                                <td>{card.rarity}</td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                )}

                </tbody>
            </Table>
        )

        return (
            <div className="container">
                <header className="jumbotron">
                    <Container>

                        <Row className="justify-content-md-center">
                            <Col xs lg="5">
                                <div style={{fontSize: '2.5em', textAlign: 'center'}}>Create Collection</div>
                            </Col>
                        </Row>
                    </Container>
                </header>
                <section style={{marginTop: '20px'}}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="5">
                                <Form.Label>Filter</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="example: name:charizard"
                                    value={this.state.searchTerm}
                                    onChange={this.changeSearchTerm}
                                />
                                <Button variant="primary" type="submit" onClick={this.searchTcgApiCard}>
                                    Search
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </section>

                <section style={{marginTop: '20px'}}>
                    <Container>
                        <Row className="justify-content-md-center">
                            <Col xs lg="8">
                                {collectionList}
                            </Col>
                        </Row>
                    </Container>
                </section>

            </div>
        );
    }
}

function mapStateToProps(state) {
    // const { message } = state.message;
    return {
        // message,
    };
}


export default connect(mapStateToProps)(CollectionsCreate);