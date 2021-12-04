import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import {ArrowRight, CaretDownSquare} from 'react-bootstrap-icons';
import "bootstrap-icons/font/bootstrap-icons.css";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Col from "react-bootstrap/Col";


class CollectionView extends Component {
    constructor(props) {
        super(props);
        this.handleCardCollectedCheckboxClick = this.handleCardCollectedCheckboxClick.bind(this);
        this.handleSaveCollectionButtonClick = this.handleSaveCollectionButtonClick.bind(this);
        this.cardCollectedToggle = this.cardCollectedToggle.bind(this);

        this.state = {
            collection: {collectionCards:[]},
            collectionId: this.props.id,
        };
    }

    componentDidMount() {
        CollectionService.getOneDetail(this.props.id).then(
            response => {
                this.setState({
                    collection: response.data
                }, () => {
                    console.log(this.state)
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    handleCardCollectedCheckboxClick(e) {
        console.log(e.currentTarget.id);

        const { collection } = { ...this.state };
        const currentState = collection;

        for (let card of collection.collectionCards) {
            if(card.cardId === e.currentTarget.id){
                card.count = (card.count) ? 0 : 1;
                break;
            }
        }


        this.setState({ collection: currentState });
    }

    handleSaveCollectionButtonClick(e) {
        const { collection } = { ...this.state };
        const currentCollection = JSON.parse(JSON.stringify(collection));

        let collectionToSubmit = {"name": this.state.collection.name};

        const l = new Set(['orderNumber', 'count', 'cardId']);

        for (let obj of currentCollection.collectionCards) {
            for (let prop of Object.keys(obj)) {
                if (!l.has(prop)) {
                    delete obj[prop];
                }
            }
        }
        collectionToSubmit.cards = currentCollection.collectionCards;
        CollectionService.putCollection( this.state.collectionId, collectionToSubmit)
    }

    cardCollectedToggle(cell, row, enumObject) {
        console.log(">", cell, row, enumObject);
        // return 1;
        return (
            <ToggleButton
                className="mb-2"
                id={row.card.cardId}
                type="checkbox"
                variant="outline-primary"
                checked={row.card.count}
                value={row.card.count}
                // onChange={this.handleCardCollectedCheckboxClick}
            >
                {/*{(card.count) ? <i className="bi bi-check-circle-fill"></i> : <i class="bi bi-circle"></i>}*/}
                {(row.card.count) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>}
            </ToggleButton>
        )
    }


    render() {
        console.log(this.state.collection);



        return (
            <div className="container">
                <header className="jumbotron">
                    {/*<h3>{this.state.content}</h3>*/}
                    <h1>Collection - {this.state.collectionId}</h1>
                </header>
                <Button onClick={this.handleSaveCollectionButtonClick} >Save Collection</Button>
                <div>


                    <BootstrapTable data={this.state.collection?.collectionCards} striped={true} hover={true}>
                        <TableHeaderColumn dataField="orderNumber" dataAlign="center" dataSort={true}>orderNumber</TableHeaderColumn>
                        <TableHeaderColumn dataField="cardId" isKey={true} dataAlign="center" dataSort={true}>cardId</TableHeaderColumn>
                        <TableHeaderColumn dataField="name" dataSort={true}>name</TableHeaderColumn>
                        <TableHeaderColumn dataField="rarity" dataSort={true}>rarity</TableHeaderColumn>
                        <TableHeaderColumn dataField="Collected" dataSort={true} dataFormat={this.cardCollectedToggle}>Collected</TableHeaderColumn>
                        <TableHeaderColumn dataField="setReleaseDate" dataSort={true}>Release Date</TableHeaderColumn>
                        {/*<TableHeaderColumn dataField="price" dataFormat={cardCollectedToggle}>Product Price</TableHeaderColumn>*/}
                    </BootstrapTable>
                </div>
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


export default connect(mapStateToProps)(CollectionView);


// TODO ADD BOOTSTRAPTABLE INTO COLLECTION VIEW TO ORDERNUM AND DATE CAN BE SORTED
// ALSO DO "START COLLECTION" SCREEB TO SHOW ALL CaretDownSquare
// ADD TYPING FILTER?