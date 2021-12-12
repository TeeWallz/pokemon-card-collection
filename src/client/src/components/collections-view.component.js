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
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";


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

    cardCollectedToggle(cell, row, enumObject) {
        // console.log(">", cell, row, enumObject);
        // return 1;
        // debugger;
        console.log(row.cardId)
        let ass =  (
            <ToggleButton
                className="my-0"
                id={row.cardId}
                type="checkbox"
                variant="outline-primary"
                checked={row.count}
                value={row.count}
                onClick={this.handleCardCollectedCheckboxClick}
                data={row.cardId}
                size="sm"
            >
                {/*{(card.count) ? <i className="bi bi-check-circle-fill"></i> : <i class="bi bi-circle"></i>}*/}
                {(row.count) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>}
            </ToggleButton>
        )
        // debugger;
        return ass;
    }

    handleCardCollectedCheckboxClick(e) {
        console.log(e.currentTarget.id);
        // Why in the living fuck is this null, why does the toogle's ID not inherit correctly
        // Do this bullshit instead
        const id = e.currentTarget.htmlFor;

        const { collection } = { ...this.state };
        const currentState = collection;

        for (let card of collection.collectionCards) {
            if(card.cardId === id){
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


    render() {
        console.log(this.state.collection);

        let collectedCount = this.state.collection.collectionCards.reduce((previousValue, currentValue) => previousValue + Math.min(currentValue, 1), 0);

        collectedCount = this.state.collection.collectionCards.reduce((a, b) => {
            // console.log(a);
            // debugger;
            return a + b.count;
            }
            , 0);



        let completion = 0;
        if(this.state.collection.collectionCards.length > 0){
            completion = collectedCount / this.state.collection.collectionCards.length
        }
        completion = completion * 100;
        completion = Math.round(completion, 2) + '%';

        if(this.state.collection.collectionCards.length > 0){
            // debugger;
        }


        return (
            <div className="container">
                <header className="jumbotron">
                    <h1>Collection {this.state.collection?.name} - {completion}</h1>
                </header>
                <Button onClick={this.handleSaveCollectionButtonClick} >Save Collection</Button>
                <div>
                    {/*<ToolkitProvider*/}
                    {/*    // data={this.state.collectionCards}*/}
                    {/*    data={this.state.collection?.collectionCards}*/}
                    {/*    columns={columns}*/}
                    {/*    keyField={"collection_card_key"}*/}
                    {/*    striped={true}*/}
                    {/*    hover={true}*/}
                    {/*    srText={"sss"}*/}



                    {/*    search*/}
                    {/*>*/}
                    {/*    {*/}
                    {/*        props => (*/}
                    {/*            <div>*/}
                    {/*                <BootstrapTable*/}
                    {/*                    { ...props.baseProps }*/}
                    {/*                    pagination={ paginationFactory({paginationSize: 20}) }*/}
                    {/*                    srText={"sss"}*/}
                    {/*                    formatExtraData={ this.state.collectionCards }*/}
                    {/*                    filter={ filterFactory() }*/}
                    {/*                >*/}
                    {/*                </BootstrapTable>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*</ToolkitProvider>*/}

                    {/*<BootstrapTable data={this.state.collection?.collectionCards} striped={true} hover={true}>*/}
                    {/*    <TableHeaderColumn dataField="orderNumber" dataAlign="center" dataSort={true}>orderNumber</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="binderPageNo" dataAlign="center" dataSort={true}>binderPageNo</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="binderSlotNo" dataAlign="center" dataSort={true}>binderSlotNo</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="cardId" isKey={true} dataAlign="center" dataSort={true}>cardId</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="name" dataSort={true}>name</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="rarity" dataSort={true}>rarity</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="setName" dataSort={true}>setName</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="Collected" dataSort={true} dataFormat={this.cardCollectedToggle}>Collected</TableHeaderColumn>*/}
                    {/*    <TableHeaderColumn dataField="setReleaseDate" dataSort={true}>Release Date</TableHeaderColumn>*/}
                    {/*    /!*<TableHeaderColumn dataField="price" dataFormat={cardCollectedToggle}>Product Price</TableHeaderColumn>*!/*/}
                    {/*</BootstrapTable>*/}
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
