import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
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
import Row from "react-bootstrap/Row";
const { SearchBar } = Search;


class CollectionViewEpic extends Component {
    constructor(props) {
        super(props);
        this.handleCardCollectedCheckboxClick = this.handleCardCollectedCheckboxClick.bind(this);
        // this.handleSaveCollectionButtonClick = this.handleSaveCollectionButtonClick.bind(this);
        // this.cardCollectedToggle = this.cardCollectedToggle.bind(this);

        this.state = {
            collectionCards:[],
            changedCards: new Set(),
            collectionId: this.props.id,
            checkChanged: true,
        };
    }

    componentDidMount() {
        CollectionService.getEpic().then(
            response => {
                this.setState({
                    collectionCards: response.data
                }, () => {
                    // console.log(this.state)
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
    handleCardCollectedCheckboxClick(e) {
        // console.log(e.currentTarget.id);
        // Why in the living fuck is this null, why does the toogle's ID not inherit correctly
        // Do this bullshit instead
        const id = e.currentTarget.htmlFor;

        let stateRow = this.state.collectionCards.find(item => item.collection_card_key === id);
        stateRow.count = (stateRow.count) ? 0 : 1;
        this.state.changedCards.add(id)
        // debugger;

        this.setState({ collectionCards: this.state.collectionCards , checkChanged: !this.state.checkChanged}, () => {
            console.log('InOnClick: ', this.state.collectionCards[0].count );
            console.log('InOnClick: ', this.state.checkChanged );
            console.log('InOnClick: ', this.state.changedCards );
            this.forceUpdate();
        });
    }

    //
    // //
    // handleSaveCollectionButtonClick(e) {
    //     const { collectionCards } = { ...this.state };
    //     const currentCollectionCards= JSON.parse(JSON.stringify(currentCollectionCards));
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
        // console.log('---');
        // console.log(this.state.collectionCards);
        // console.log('---');
        const columns = [
            {
                dataField: 'collection_card_key',
                text: 'collection_card_key',
                hidden: true,
                sort: true,

            },
            {
                dataField: 'orderNumber',
                text: 'col',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em'};
                },
                sort: true,

            },
            {
                dataField: 'binderPageNo',
                text: 'pg',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em' };
                },
                sort: true,
            },
            {
                dataField: 'binderSlotNo',
                text: 'slot',
                headerStyle: (colum, colIndex) => {
                    return { width: '3em' };
                },
                sort: true,
            },
            {
                dataField: 'collectionName',
                text: 'collection name',
                searchable: true,
                // headerStyle: (colum, colIndex) => {
                //     return { width: '6em' };
                // },
                sort: true,
            },
            {
                dataField: 'numberFull',
                text: 'number',
                searchable: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '6em' };
                },
                sort: true,
            },
            {
                dataField: 'cardId',
                text: 'cardId',
                searchable: true,
                hidden: true,
                sort: true,
            },
            {
                dataField: 'name',
                text: 'name',
                searchable: true,
                sort: true,
                // headerStyle: (colum, colIndex) => {
                //     return { width: '15em' };
                // },
            },
            {
                dataField: 'rarity',
                text: 'rarity',
                searchable: true,
                sort: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '10em' };
                },
            },
            {
                dataField: 'setName',
                text: 'setName',
                searchable: true,
                style: (row, rowIndex) => {
                    return {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                    }
                },
                sort: true,
            },
            {
                dataField: 'setReleaseDate',
                text: 'release date',
                searchable: true,
                sort: true,
                headerStyle: (colum, colIndex) => {
                    return { width: '7em' };
                },
            },
            {
                dataField: 'Collected',
                text: 'Collected',
                headerStyle: (colum, colIndex) => {
                    return { width: '7em' };
                },
                formatExtraData: {collectionCards: this.state.collectionCards, changed: this.state.checkChanged},
                formatter: (cell, row, rowIndex, formatExtraData ) => {
                    const myFuckingData = formatExtraData.collectionCards;
                    const stateRow = myFuckingData.find(item => item.collection_card_key === row.collection_card_key);


                    let ass =  (
                        <ToggleButton
                            className="my-0"
                            id={row.collection_card_key}
                            type="checkbox"
                            variant="outline-primary"
                            checked={(stateRow.count) == 1 ? true : false}
                            value={stateRow.count}
                            onClick={this.handleCardCollectedCheckboxClick}
                            data={row.cardId}
                            size="sm"
                        >
                            {/*{(card.count) ? <i className="bi bi-check-circle-fill"></i> : <i class="bi bi-circle"></i>}*/}
                            {(stateRow.count) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>} {stateRow.count}  / {rowIndex}
                        </ToggleButton>

                    )
                    // debugger;
                    return ass;
                },
            }



        ];



        return (
            <div className="container-fluid">

                <Row>
                    <Col classNames={"col-md-auto"}>
                        <h3>Search for cards:</h3>
                    </Col>
                    <Col xs={1}>
                        <Button variant="primary">Save</Button>
                    </Col>

                </Row>



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
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }
                                    pagination={ paginationFactory({paginationSize: 20}) }
                                    srText={"sss"}
                                    formatExtraData={ this.state.collectionCards }
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