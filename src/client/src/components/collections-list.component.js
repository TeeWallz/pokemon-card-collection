import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import {BootstrapTable, TableHeaderColumn} from "react-bootstrap-table";
import Col from "react-bootstrap/Col";
import "bootstrap-icons/font/bootstrap-icons.css";


class BoardCollections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: []
        };

        // this.openFormatter = this.openFormatter.bind(this);
        this.loadCollectionsIntoTable = this.loadCollectionsIntoTable.bind(this);
        this.optionFormatter = this.optionFormatter.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
        this.onRowClick = this.onRowClick.bind(this);
    }

    componentDidMount() {
        this.loadCollectionsIntoTable();
    }

    loadCollectionsIntoTable(){
        CollectionService.getAll().then(
            response => {
                this.setState({
                    collections: response.data
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

    onRowClick(e, row, rowIndex){
        console.log((e, row, rowIndex))
    }

    onDeleteClick(e){
        if (window.confirm('Are you sure you want to delete? ' + e.currentTarget.id)) {
            // Save it!
            return CollectionService.deleteCollection(e.currentTarget.id)
                .then(() => {
                    this.loadCollectionsIntoTable();
                })
                .catch((e) => {
                    alert("Error!");
                    console.log(e)
                })




        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }

    }

    onOpenClick(e){
        const link = "/collection/" +  e.currentTarget.id;
        window.open(link, "_blank")
    }

    optionFormatter(e){
        const result = (
            <span>
                <span id={e} style={{cursor: 'pointer'}} onClick={(e) => {
                    this.onOpenClick(e)
                }}><i className="bi bi-box-arrow-up-right"></i></span>

                &nbsp;
                &nbsp;
                <span id={e} style={{cursor: 'pointer'}} onClick={(e) => {
                    this.onDeleteClick(e)
                }}><i className="bi bi-trash"></i></span>
            </span>

        )
        return result;
    }

    render() {
        if(this.state.collections.length > 1){
            console.log(this.state.collections[0]);
        }

        const rowEvents = {
            onClick: (e, row, rowIndex) => {
                console.log(row);
            }
        };

        return (
            <div className="container">
                <header className="jumbotron">
                    {/*<h3>{this.state.content}</h3>*/}
                    <h1>All Collections</h1>
                    <Link to="/collection/create" className="btn btn-primary">Create Collection</Link>
                    <div>
                        {/*{collectionList}*/}

                        <BootstrapTable data={this.state.collections}
                                        striped={true}
                                        hover={true}
                                        rowEvents={rowEvents}
                        >
                            <TableHeaderColumn dataField="name" isKey={true} dataAlign="center" dataSort={true}>Name</TableHeaderColumn>
                            <TableHeaderColumn dataField="collectedCardsUnique" dataSort={true}>collectedCardsUnique</TableHeaderColumn>
                            <TableHeaderColumn dataField="totalCards" dataSort={true}>totalCards</TableHeaderColumn>
                            <TableHeaderColumn dataField="status" dataSort={true}>status</TableHeaderColumn>
                            <TableHeaderColumn dataField="filter" dataSort={true}>filter</TableHeaderColumn>
                            {/*<TableHeaderColumn width={"3em"} dataField="id" dataSort={true} dataFormat={this.openFormatter}></TableHeaderColumn>*/}
                            <TableHeaderColumn width={"4em"} dataField="id" dataSort={true} dataFormat={this.optionFormatter}></TableHeaderColumn>
                            {/*<TableHeaderColumn dataField="price" dataFormat={priceFormatter}>Product Price</TableHeaderColumn>*/}
                        </BootstrapTable>

                    </div>
                </header>
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


export default connect(mapStateToProps)(BoardCollections);