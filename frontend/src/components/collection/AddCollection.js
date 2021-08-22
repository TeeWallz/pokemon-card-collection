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

const options = [
    { value: 'chocolate', label: <div><img src={"https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"} height="30px" width="30px"/>Chocolate </div> },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
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
        };
    }

    onChange = e => {
        this.setState({[e.target.name]: e.target.value}, () => {
            console.log(this.state)
        });
    };

    onChangeCollectionSource = e => {
        this.setState({'collectionSource': e}, () => {
            console.log(this.state)
        });
    };


    onAddClick = () => {
        const collection = {
            content: this.state.content
        };
        this.props.addCollection(collection);
    };

    CollectionSelector = () => {
        let formContents = (<React.Fragment></React.Fragment>);

        switch (this.state.collectionSource) {
            case 'set':
                formContents = (
                    <select>
                        <option value="A">Apple</option>
                        <option value="B">Banana</option>
                        <option value="C">Cranberry</option>
                    </select>
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
                <h2>Add new collection /{this.collectionName}/</h2>
                <Form>
                    <Form.Group controlId="contentId">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Collection Name {this.collectionName}</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Enter name"
                                          name="collectionName"
                                          value={this.collectionName}
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

                        {/*<this.CollectionSelector/>*/}

                        <Select
                                options={options}/>

                    </Form.Group>
                </Form>

                <Button variant="success" onClick={this.onAddClick}>
                    Add collection
                </Button>
            </div>
        );
    }
}

AddCollection.propTypes = {
    addCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {addCollection})(withRouter(AddCollection));
