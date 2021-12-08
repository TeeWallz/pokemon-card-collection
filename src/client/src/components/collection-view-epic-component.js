import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import {ArrowRight, CaretDownSquare} from 'react-bootstrap-icons';
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
// import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table-next";
import BootstrapTable from 'react-bootstrap-table-next';
import Col from "react-bootstrap/Col";
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
const { SearchBar } = Search;


class CollectionViewEpic extends Component {
    constructor(props) {
        super(props);
        // this.handleCardCollectedCheckboxClick = this.handleCardCollectedCheckboxClick.bind(this);
        // this.handleSaveCollectionButtonClick = this.handleSaveCollectionButtonClick.bind(this);
        // this.cardCollectedToggle = this.cardCollectedToggle.bind(this);

        this.state = {
            collectionCards:[],
            collectionId: this.props.id,
        };
    }

    componentDidMount() {
        CollectionService.getEpic().then(
            response => {
                this.setState({
                    collectionCards: response.data
                }, () => {
                    console.log(this.state)
                });
            },
            error => {
                alert("Error")
            }
        );
    }

    // cardCollectedToggle(cell, row, enumObject) {
    //     // console.log(">", cell, row, enumObject);
    //     // return 1;
    //     // debugger;
    //     console.log(row.cardId)
    //     let ass =  (
    //         <ToggleButton
    //             className="my-0"
    //             id={row.cardId}
    //             type="checkbox"
    //             variant="outline-primary"
    //             checked={row.count}
    //             value={row.count}
    //             onClick={this.handleCardCollectedCheckboxClick}
    //             data={row.cardId}
    //             size="sm"
    //         >
    //             {/*{(card.count) ? <i className="bi bi-check-circle-fill"></i> : <i class="bi bi-circle"></i>}*/}
    //             {(row.count) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>}
    //         </ToggleButton>
    //     )
    //     // debugger;
    //     return ass;
    // }
    //
    // handleCardCollectedCheckboxClick(e) {
    //     console.log(e.currentTarget.id);
    //     // Why in the living fuck is this null, why does the toogle's ID not inherit correctly
    //     // Do this bullshit instead
    //     const id = e.currentTarget.htmlFor;
    //
    //     const { collection } = { ...this.state };
    //     const currentState = collection;
    //
    //     for (let card of collection.collectionCards) {
    //         if(card.cardId === id){
    //             card.count = (card.count) ? 0 : 1;
    //             break;
    //         }
    //     }
    //
    //
    //     this.setState({ collection: currentState });
    // }
    //
    //
    // handleSaveCollectionButtonClick(e) {
    //     const { collection } = { ...this.state };
    //     const currentCollection = JSON.parse(JSON.stringify(collection));
    //
    //     let collectionToSubmit = {"name": this.state.collection.name};
    //
    //     const l = new Set(['orderNumber', 'count', 'cardId']);
    //
    //     for (let obj of currentCollection.collectionCards) {
    //         for (let prop of Object.keys(obj)) {
    //             if (!l.has(prop)) {
    //                 delete obj[prop];
    //             }
    //         }
    //     }
    //     collectionToSubmit.cards = currentCollection.collectionCards;
    //     CollectionService.putCollection( this.state.collectionId, collectionToSubmit)
    // }


    render() {
        console.log(this.state.collection);

        const columns = [
            {
                dataField: 'collection_card_key',
                text: 'collection_card_key',
                hidden: true,

            },
            {
                dataField: 'orderNumber',
                text: 'col',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em'};
                },

            },
            {
                dataField: 'binderPageNo',
                text: 'pg',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em' };
                },
            },
            {
                dataField: 'binderSlotNo',
                text: 'slot',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em' };
                },
            },
            {
                dataField: 'numberFull',
                text: 'number',
                searchable: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '6em' };
                },
            },
            {
                dataField: 'cardId',
                text: 'cardId',
                searchable: true,
                hidden: true,
            },
            {
                dataField: 'name',
                text: 'name',
                searchable: true,
            },
            {
                dataField: 'rarity',
                text: 'rarity',
                searchable: true,
            },
            {
                dataField: 'setName',
                text: 'setName',
                searchable: true,
            },
            {
                dataField: 'setReleaseDate',
                text: 'setReleaseDate',
                searchable: true,
            },
            {
                dataField: 'Collected',
                text: 'Collected'
            }



        ];



        return (
            <div className="container">
                {/*<header className="jumbotron">*/}
                {/*    /!*<h3>{this.state.content}</h3>*!/*/}
                {/*    <h1>Collection - {this.state.collection?.name}</h1>*/}
                {/*</header>*/}
                {/*<Button onClick={this.handleSaveCollectionButtonClick} >Save Collection</Button>*/}
                {/*<div>*/}



                <ToolkitProvider
                    data={this.state.collectionCards}
                    columns={columns}
                    keyField={"collection_card_key"}
                    striped={true}
                    hover={true}
                    srText={"sss"}


                    search
                >
                    {
                        props => (
                            <div>
                                <h3>Search for cards:</h3>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    pagination={ paginationFactory() }
                                    srText={"sss"}
                                >
                                </BootstrapTable>
                            </div>
                        )
                    }
                </ToolkitProvider>


                {/*</div>*/}
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


export default connect(mapStateToProps)(CollectionViewEpic);