import React, { Component } from "react";
import { connect } from "react-redux";
import {Link, useNavigate} from "react-router-dom";

import CollectionService from "../services/collection.service";
import Button from 'react-bootstrap/Button';
import Table from "react-bootstrap/Table";



function HandleClick(path) {
    const navigation = useNavigate();
    navigation.push(path);
}

class BoardCollections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collections: []
        };
    }

    componentDidMount() {
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

    render() {



        let collectionList = "Ain't Nobody Here But Us Chickens";

        if(this.state.collections.length > 0){
            collectionList = (
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.collections.map(function (collection, i) {
                        // console.log(collection);
                        return (
                            <tr key={i}>
                                <td>{collection.name}</td>
                                <td>{collection.creatorId}</td>
                                <td>10%</td>
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
                    <h1>All Collections</h1>
                    <Link to="/collection/create" className="btn btn-primary">Create Collection</Link>
                    <div>
                        {collectionList}
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