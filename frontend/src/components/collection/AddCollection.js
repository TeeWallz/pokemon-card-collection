import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Form, FormControl} from "react-bootstrap";
import {addCollection} from "./CollectionsActions";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Dropdown from "react-bootstrap/Dropdown";
import Select from 'react-select'

import Collection from "./Collection";
import {getSets} from "../sets/SetsActions"

const options = [
    {value: 'chocolate',
        label: <div><img src={"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"}
                         height="30px" width="30px"/>Chocolate </div>
    },
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'},
];


class AddCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionName: "",
            collectionSource: 'set',
            setCollectionDropdown: '',
            CustomMenu: '',
            SetSelection: '',
            sets: [],
        };
        this.props.getSets();
    }

    onChange = e => {
        console.log(e)
        this.setState({[e.target.name]: e.target.value}, () => {
            console.log(this.state)
        });
    };

    onChangeCollectionSource = e => {
        console.log(e)
        this.setState({'collectionSource': e}, () => {
            console.log(this.state)
        });
    };

    onChangeSetSelection = e => {
        console.log(e);
        // let setName = this.props.sets.filter(obj => obj.name === e.value)[0].name;
        this.setState({'collectionName': e.value}, () => {
            console.log(this.state)
            this.forceUpdate();
        });
    }


    onAddClick = () => {
        const collection = {
            content: this.state.content
        };
        this.props.addCollection(collection);
    };

    CollectionSelector = () => {
        let kek = 1;
        console.log(this.props)
        let formContents = (<React.Fragment></React.Fragment>);

        switch (this.state.collectionSource) {
            case 'set':
                // if(this.props.sets)
                // const options = [
                //     {value: 'chocolate',
                //         label: <div><img
                //             src={"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"}
                //             height="30px" width="30px"/>Chocolate </div>
                //     },
                //     {value: 'strawberry', label: 'Strawberry'},
                //     {value: 'vanilla', label: 'Vanilla'},
                // ];
                let items = this.props.sets.map(set => {
                    return {value: set.name, label:
                            <span>
                                <img style={{width:"15px"}} src={set.symbol} /> {set.name} - {set.printedtotal} Cards
                            </span>
                    }
                });
                console.log(items)
                formContents = (
                    <Select onChange={this.onChangeSetSelection}                        options={items}/>
                )
                break;
            case 'pokemon':
                formContents = (<Form.Group className="mb-3" controlId="formFromSet">
                    <Form.Label>Collection From P</Form.Label>
                    Dropdown
                </Form.Group>)
                break;
            case 'artist':
                formContents = (<Form.Group className="mb-3" controlId="formFromSet">
                    <Form.Label>Collection From A</Form.Label>
                    Dropdown
                </Form.Group>)
                break;
            case 'custom query':
                formContents = (<Form.Group className="mb-3" controlId="formFromSet">
                    <Form.Label>Collection From Q</Form.Label>
                    Dropdown
                </Form.Group>)
                break;
        }


        return (
            <Form.Group className="mb-3" controlId="formSources">
                {formContents}
            </Form.Group>
        )
    }


    // The forwardRef is important!!
    // Dropdown needs access to the DOM node in order to position the Menu
    CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <a
            href=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            &#x25bc;
        </a>
    ));

    // forwardRef again here!
    // Dropdown needs access to the DOM of the Menu to measure it
    CustomMenu = React.forwardRef(
        ({children, style, className, 'aria-labelledby': labeledBy}, ref) => {
            return (
                <div
                    ref={ref}
                    style={style}
                    className={className}
                    aria-labelledby={labeledBy}
                >
                    <FormControl
                        autoFocus
                        className="mx-3 my-2 w-auto"
                        placeholder="Type to filter..."
                        onChange={this.onChangeSetSelection}
                        value={this.state.SetSelection}
                    />
                    <ul className="list-unstyled">
                        {React.Children.toArray(children).filter(
                            (child) =>
                                !this.state.SetSelection || child.props.children.toLowerCase().startsWith(this.state.SetSelection),
                        )}
                    </ul>
                </div>
            );
        },
    );


    render() {


        return (
            <div>
                <h2>Add new collection /{this.state.collectionName}/</h2>
                <Form>
                    <Form.Group controlId="contentId">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Collection Name {this.state.collectionName}</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter name"
                                          name="collectionName"
                                          value={this.state.collectionName}
                                          onChange={this.onChange}/>
                            {/*<Form.Text className="text-muted">*/}
                            {/*    We'll never share your email with anyone else.*/}
                            {/*</Form.Text>*/}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formSourceLocation">
                            <Form.Label>Collection Source</Form.Label>
                            <div key={`inline-radio`} className="mb-3">
                                <ToggleButtonGroup type="radio" value={this.state.collectionSource}
                                                   onChange={this.onChangeCollectionSource} name={'collectionSource'}>

                                    <ToggleButton id="tbg-btn-1" value={'set'}>
                                        Set
                                    </ToggleButton>
                                    <ToggleButton id="tbg-btn-2" value={'pokemon'}>
                                        Pokemon
                                    </ToggleButton>
                                    <ToggleButton id="tbg-btn-3" value={'artist'}>
                                        Artist
                                    </ToggleButton>
                                    <ToggleButton id="tbg-btn-3" value={'custom query'}>
                                        Custom Query
                                    </ToggleButton>

                                </ToggleButtonGroup>
                            </div>
                        </Form.Group>

                        <this.CollectionSelector props={this.props.sets}/>


                    </Form.Group>
                </Form>

                <Button variant="success" onClick={this.onAddClick}>
                    Add collection
                </Button>
            </div>
        );
    }
}
//
// AddCollection.propTypes = {
//     addCollection: PropTypes.func.isRequired
// };

const mapStateToProps = (state) => {
    console.log(state);

    return {
        // userInfo: state.THE_SPECIFIC_REDUCER.userInfo,
        // loading: state.THE_SPECIFIC_REDUCER.loading,
        // error: state.THE_SPECIFIC_REDUCER.error
        sets: state.sets.sets
    };
}

// export default connect(mapStateToProps, {addCollection})(withRouter(AddCollection));

export default connect(mapStateToProps, {
    getSets
})(withRouter(AddCollection));
