import React, { Component } from "react";
import { connect } from "react-redux";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Spinner } from 'react-bootstrap';

import pokemon from 'pokemontcgsdk'



function showDescription(cell, row) {
    return cell.description;
}

function priceFormatter(cell, row){
    return '<i class="glyphicon glyphicon-usd"></i> ' + cell;
}


class CollectionsCreate extends Component {
    constructor(props) {
        super(props);

        this.searchTcgApiCard = this.searchTcgApiCard.bind(this);
        this.changeSearchTerm = this.changeSearchTerm.bind(this);
        this.changeCollectionName = this.changeCollectionName.bind(this);
        this.saveCollection = this.saveCollection.bind(this);
        this.Speeeeeeen = this.Speeeeeeen.bind(this);
        this.saveAndRedirectClick = this.saveAndRedirectClick.bind(this);
        this.saveAndCreateAnotherClick = this.saveAndCreateAnotherClick.bind(this);


        this.state = {
            searchCards: [],
            searchTerm: 'name:blastoise',
            collectionName: '',
            isLoading: false,
        };
    }

    componentDidMount() {

    }

    changeSearchTerm(e) {
        this.setState({ searchTerm: e.target.value }, () =>  {
            console.log(this.state)
        })
    }
    changeCollectionName(e) {
        this.setState({ collectionName: e.target.value }, () =>  {
            console.log(this.state)
        })
    }

    Speeeeeeen(){
        if(this.state.isLoading){
            return (
                <div style={{display: 'flex', alignContent: 'center', justifyContent: 'center'}}>
                    <div style={{display:"inline-block"}}>
                        <Spinner animation="border" role="status" >
                            {/*<span className="sr-only">Loading.Weeeeeee</span>*/}
                        </Spinner>
                    </div>
                </div >
            );
        }
        else{
            return "";
        }
    }


    searchTcgApiCard(query){
        this.setState({isLoading: true})
        CollectionService.getTcgApiQuery(this.state.searchTerm)
            .then((cards) => {
                let cards_enriched = cards.data;



                this.setState({searchCards: cards.data, isLoading: false}, () =>  {
                    console.log(this.state)
                })
            })
            .catch((ex) => {
                alert("Error.");
                this.setState({ isLoading: false}, () =>  {
                    console.log(this.state)
                })
            })
    }

    saveAndRedirectClick(){
        this.saveCollection()
            .then((response) => {
                window.location = "/collection/" + response.data.id;
            })
            .catch((err) => {
                alert(err);
            })
    }

    saveAndCreateAnotherClick(){
        this.saveCollection()
            .then((response) => {
                window.location = "/collection/create";
            })
            .catch((err) => {
                alert(err);
            })
    }

    saveCollection(){
        if(this.state.collectionName === ""){
            alert("CollectionName empty. Stopping save.");
            return;
        }
        if(this.state.searchCards.length === 0){
            alert("No cards to save. Stopping save.");
            return;
        }

        const { searchCards } = { ...this.state };
        const currentSearchCards = JSON.parse(JSON.stringify(searchCards));

        let collectionToSubmit = {
            name: this.state.collectionName,
            filter: this.state.searchTerm,
            cards: []
        };

        for (let obj of currentSearchCards) {
            collectionToSubmit.cards.push({id: obj.id, count: 0 })
        }



        return CollectionService.postCollection(collectionToSubmit)


    }



    render() {
        let collectionList = []

        const isLoadingClass = this.state.isLoading ? 'none' : 'none';


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
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Collection Name"
                                    value={this.state.collectionName}
                                    onChange={this.changeCollectionName}
                                />
                            </Col>
                        </Row>
                    </Container>




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
                            <Col xs={"12"} >
                                {this.Speeeeeeen()}
                                <Button className={"float-right"} variant="primary" type="submit" onClick={this.saveAndRedirectClick}>
                                    Save
                                </Button>
                                &nbsp;
                                <Button className={"float-right"} variant="primary" type="submit" onClick={this.saveAndCreateAnotherClick}>
                                    Save And create another
                                </Button>
                            </Col>
                            <Col xs lg="12">
                                {/*{collectionList}*/}
                                <div>
                                    {this.state.searchCards.length} Cards
                                </div>
                                <BootstrapTable data={this.state.searchCards} striped={true} hover={true}>
                                    <TableHeaderColumn dataField="id" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                                    <TableHeaderColumn dataField="name" dataSort={true}>Card No</TableHeaderColumn>
                                    <TableHeaderColumn dataField="fullCardNumber" dataSort={true}>fullCardNumber</TableHeaderColumn>
                                    <TableHeaderColumn dataField="supertype" dataSort={true}>Supertype</TableHeaderColumn>
                                    <TableHeaderColumn dataField="setName" dataSort={true}>setName</TableHeaderColumn>
                                    <TableHeaderColumn dataField="setReleaseDate" dataSort={true}>Release Date</TableHeaderColumn>
                                    <TableHeaderColumn dataField="rarity" dataSort={true}>Rarity</TableHeaderColumn>
                                    {/*<TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>*/}
                                </BootstrapTable>
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