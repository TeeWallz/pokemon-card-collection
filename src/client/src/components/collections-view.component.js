import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";
import ToggleButton from "react-bootstrap/ToggleButton";
import { ArrowRight } from 'react-bootstrap-icons';
import "bootstrap-icons/font/bootstrap-icons.css";


class CollectionView extends Component {
    constructor(props) {
        super(props);
        this.handleCardCollectedCheckboxClick = this.handleCardCollectedCheckboxClick.bind(this);
        this.handleSaveCollectionButtonClick = this.handleSaveCollectionButtonClick.bind(this);

        this.state = {
            collection: {},
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


    render() {
        console.log(this.state.collection);
        let CollectionList = "No Cards in collection";
        if(this?.state?.collection?.collectionCards?.length > 0 ){

            // debugger;
            CollectionList = (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Rarity</th>
                        <th>Collected</th>
                        <th>Completion Status</th>
                    </tr>
                    </thead>
                    <tbody>



                    {this?.state?.collection?.collectionCards?.map((card, i) => {
                        console.log(this?.add && this.add);
                        // debugger;

                        return (
                            <tr key={i}
                                // onClick={()=>window.location = '/collection/' + collection.id}
                            >
                                <td>{card.cardId}</td>
                                <td>{card.card.card_localisations[0].name}</td>
                                <td>{card.card.rarity}</td>
                                {/*<td>{card.count}</td>*/}
                                <td>
                                    <ToggleButton
                                        className="mb-2"
                                        id={card.cardId}
                                        type="checkbox"
                                        variant="outline-primary"
                                        checked={card.count}
                                        value={card.count}
                                        onChange={this.handleCardCollectedCheckboxClick}
                                    >
                                        {/*{(card.count) ? <i className="bi bi-check-circle-fill"></i> : <i class="bi bi-circle"></i>}*/}
                                        {(card.count) ? <i className="bi bi-check2-circle"></i> : <i class="bi bi-circle"></i>}
                                    </ToggleButton>
                                </td>
                                <td>{card.cardId}</td>
                            </tr>
                        )
                    })}

                    </tbody>
                </Table>
            )
        }

        return (
            <div className="container">
                <header className="jumbotron">
                    {/*<h3>{this.state.content}</h3>*/}
                    <h1>Collection - {this.state.collectionId}</h1>
                </header>
                <div>
                    {CollectionList}
                </div>
                <Button onClick={this.handleSaveCollectionButtonClick} >Save Collection</Button>
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