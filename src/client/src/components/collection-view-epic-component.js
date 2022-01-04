import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import filterFactory, { textFilter, selectFilter, multiSelectFilter, numberFilter } from "react-bootstrap-table2-filter";
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
import tcgApi from "../reducers/tcgApi";
import { setCards } from "../actions/tcgApi"
import {enrichCollectionCardsWithTcgData, getCardsNotInLocal} from "../helpers/tcgApiLocalData";
const { SearchBar } = Search;


class CollectionViewEpic extends Component {
    constructor(props) {
        super(props);
        this.handleCardCollectedCheckboxClick = this.handleCardCollectedCheckboxClick.bind(this);
        this.handleSaveCollectionButtonClick = this.handleSaveCollectionButtonClick.bind(this);
        this.handleCardPurchasedCheckboxClick = this.handleCardPurchasedCheckboxClick.bind(this);
        this.loadFilters = this.loadFilters.bind(this);
        // this.cardCollectedToggle = this.cardCollectedToggle.bind(this);

        console.log("------------------");
        console.log(this.props);
        console.log("------------------");

        // debugger;
        this.state = {
            displaySingleCollection: 'id' in this.props,
            collectionId: this.props.id,
            collectionName: '',

            collectionCards:[],
            changedCards: new Set(),
            checkChanged: true,
            propertyValues: {
                setNames: {},
                collectionNames: {},
            },
            filters: {},

        };

        this.setNameFilter = null;
    }

    componentDidMount() {
        let epicFilter = {};
        if (this.state.collectionId != undefined) {
            epicFilter = {"collectionId": this.state.collectionId}
        }

        CollectionService.getEpic(epicFilter).then(
            response => {

                let cardIds = [...new Set(response.map(item => item.cardId))];
                getCardsNotInLocal(cardIds).then((result) => {

                    const new_collectionCards = enrichCollectionCardsWithTcgData(this.state.collectionCards)
                    this.setState({
                        collectionCards: new_collectionCards,
                        propertyValues: this.loadFilters(new_collectionCards)
                    }, () => {
                        this.forceUpdate();
                    });
                })

                this.setState({
                    collectionCards: response,
                    propertyValues: this.loadFilters(response)

                }, () => {
                    // console.log(this.state)
                    this.forceUpdate();
                });
            },
            error => {
                console.log(error)
                alert("Error")
            }
        );
    }

    loadFilters(cards){
        const setNames = [...new Set(cards.map(item => item.setName))].sort();
        const setNamesDict = {};
        setNames.forEach(item => {
            setNamesDict[item] = item
        });

        const setNamesTableFilter = Object.assign({}, ...setNames.map((x) => ({[x]: x})));


        const collectionNames = [...new Set(cards.map(item => item.collectionName))].sort();
        const collectionNamesDict = {};
        collectionNames.forEach(item => {
            collectionNamesDict[item] = item
        });


        return {
            setNames: setNamesDict,
            collectionNames: collectionNamesDict,
        }
    }

    handleCardCollectedCheckboxClick(e) {
        const id = e.currentTarget.htmlFor;
        let {changedCards} = this.state;
        let stateRow = this.state.collectionCards.find(item => item.collection_card_key === id);
        stateRow.count = (stateRow.count) ? 0 : 1;
        changedCards.add(id)
        // debugger;

        this.setState({ collectionCards: this.state.collectionCards , checkChanged: !this.state.checkChanged, changedCards:changedCards}, () => {
            console.log('InOnClick: ', this.state.collectionCards[0].count );
            console.log('InOnClick: ', this.state.checkChanged );
            console.log('InOnClick: ', this.state.changedCards );
            this.forceUpdate();
            this.handleSaveCollectionButtonClick('test');
        });
    }
    handleCardPurchasedCheckboxClick(e) {
        const id = e.currentTarget.htmlFor;

        let stateRow = this.state.collectionCards.find(item => item.collection_card_key === id);
        stateRow.purchased = !stateRow.purchased
        this.state.changedCards.add(id)
        // debugger;

        this.setState({ collectionCards: this.state.collectionCards , checkChanged: !this.state.checkChanged}, () => {
            this.forceUpdate();
        });
    }




    handleSaveCollectionButtonClick(e) {
        const { collectionCards } = { ...this.state };
        // debugger;
        const cardsToSend = [... this.state.changedCards].map((cardId) => {
            let yeet = collectionCards.find(item => item.collection_card_key === cardId);
            return yeet;
        })

        const ass = 1;

        CollectionService.patchCollectionCards( cardsToSend )
            .then((response) => {
                this.setState({ changedCards:new Set() }, () => {
                    this.forceUpdate();
                });
            })
            .catch((err) => {
                alert(err)
            })
    }


    render() {
        let selectOptions = {
            'XY': 'XY'
        };
        selectOptions = this.state.propertyValues.setNames;

        let { collectionCards, filters } = this.state;
        const { tcgApi } = this.props;
        const setNameFilter = filters.setNameFilter ? filters.setNameFilter.filterVal : null;

        let collectionName = '';
        if(this.state.propertyValues.collectionNames != {}){
            collectionName = Object.keys(this.state.propertyValues.collectionNames)[0];
        }

        let completion = 0;
        let collectedCount = this.state.collectionCards.reduce((a, b) => {  return a + b.count; } , 0);
        if(collectionCards.length > 0){
            completion = collectedCount / collectionCards.length
        }
        completion = completion * 100;
        completion = Math.round(completion, 2) + '%';

        // ENrich collectionCards with data  from LocalStorage / TCG API


        const columns = [

            {
                dataField: 'collectionName',
                text: 'collection name',
                searchable: true,
                // headerStyle: (colum, colIndex) => {
                //     return { width: '6em' };
                // },
                //
                filter: selectFilter({
                    // filter: multiSelectFilter({
                    options: this.state.propertyValues.collectionNames,
                    // getFilter: filter => {
                    //     this.setNameFilter = filter;
                    // }
                }),
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
                filter: selectFilter({
                // filter: multiSelectFilter({
                    options: this.state.propertyValues.setNames,
                    // getFilter: filter => {
                    //     this.setNameFilter = filter;
                    // }
                })
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
                dataField: 'count',
                text: 'Collected',
                filter: selectFilter({
                    options: [
                        { value: 0, label: 'N' },
                        { value: 1, label: 'Y' },
                    ]
                }),
                headerStyle: (colum, colIndex) => {
                    return { width: '7em' };
                },
                formatExtraData: {collectionCards: this.state.collectionCards, changed: this.state.checkChanged},
                formatter: (cell, row, rowIndex, formatExtraData ) => {
                    const myFuckingData = formatExtraData.collectionCards;
                    const stateRow = myFuckingData.find(item => item.collection_card_key === row.collection_card_key);
                    return (
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
                            {(stateRow.count) ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-circle"></i>}
                            {/*{(stateRow.count) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>} {stateRow.count}  / {rowIndex}*/}
                        </ToggleButton>

                    )
                },
            },
            {
                dataField: 'purchased',
                text: 'purchased',
                filter: selectFilter({
                    options: [
                        { value: false, label: 'N' },
                        { value: true, label: 'Y' },
                    ]
                }),
                headerStyle: (colum, colIndex) => {
                    return { width: '7em' };
                },
                formatExtraData: {collectionCards: this.state.collectionCards, changed: this.state.checkChanged},
                formatter: (cell, row, rowIndex, formatExtraData ) => {
                    const myFuckingData = formatExtraData.collectionCards;
                    const stateRow = myFuckingData.find(item => item.collection_card_key === row.collection_card_key);
                    return (
                        <ToggleButton
                            className="my-0"
                            id={row.collection_card_key}
                            type="checkbox"
                            variant="outline-primary"
                            checked={stateRow.purchased}
                            value={stateRow.purchased}
                            onClick={this.handleCardPurchasedCheckboxClick}
                            data={row.cardId}
                            size="sm"
                        >
                            {(stateRow.purchased) ? <i className="bi bi-check-circle-fill"></i> : <i className="bi bi-circle"></i>}
                            {/*{(stateRow.purchased) ? <i className="bi bi-check2-circle"></i> : <i className="bi bi-circle"></i>} {stateRow.purchased}  / {rowIndex}*/}
                        </ToggleButton>

                    )
                },
            },



        ];






        return (
            <div className="container-fluid">


                <header className="jumbotron">
                    {this.state.displaySingleCollection ? (
                        <h1>Collection {collectionName} - {completion}</h1>
                    ) : (null )}


                </header>




                <Row>
                    <Col classnames={"col-md-auto"}>
                        <h3>Search for cards:</h3>
                    </Col>
                    <Col xs={1}>
                        <Button variant="primary" onClick={this.handleSaveCollectionButtonClick}>Save</Button>
                    </Col>

                </Row>



                <ToolkitProvider
                    // data={this.state.collectionCards}
                    data={collectionCards}
                    columns={columns}
                    keyField={"collection_card_key"}
                    striped={true}
                    hover={true}
                    exportCSV={ {
                        fileName: 'custom.csv',
                        separator: '|',
                        ignoreHeader: true,
                        noAutoBOM: false
                    } }
                    condensed={true}



                    search
                >
                    {
                        props => (
                            <div>
                                <SearchBar { ...props.searchProps } />
                                <hr />
                                <BootstrapTable
                                    { ...props.baseProps }

                                    srText={"sss"}
                                    formatExtraData={ this.state.collectionCards }
                                    filter={ filterFactory() }
                                    pagination={ paginationFactory({sizePerPageList: [
                                        {
                                            text: '10', value: 10
                                        }
                                        , {
                                            text: '30', value: 30
                                        }
                                        ,
                                            {
                                            text: 'All', value: this.state.collectionCards.length
                                        } ]
                                        // , paginationSize: 'All'
                                    })

                                    }
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
    const { tcgApi } = state;
    // debugger;
    return {
        tcgApi,
    };
}


export default connect(mapStateToProps)(CollectionViewEpic);