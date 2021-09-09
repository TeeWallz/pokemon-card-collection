import React, {Component, useState} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {addCollection} from "./CollectionsActions";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Multiselect from 'multiselect-react-dropdown';
import Dropdown from "react-bootstrap/Dropdown";
import Select from 'react-select'
import pokemon from 'pokemontcgsdk'
import Collection from "./Collection";
import {getSets} from "../sets/SetsActions"
// import {getCardsFilter} from "../cards/CardsActions";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";
import Col from "react-bootstrap/Col";


import {toastOnError} from "../../utils/Utils";
import {getArtists, getCardsFilter} from "../cards/CardsActions";
import CardsList from "../cards/CardsList";
import {getPokemon} from "../database_objects/pokemon/PokemonsActions";

import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

pokemon.configure({apiKey: '4440c304-d5c0-4939-b533-5befa084795c'})

const pokemon_list_style = {
    maxHeight: '300px',
    marginBottom: '10px',
    overflow: 'scroll',
    overflowScrolling: "touch",
    WebkitOverflowScrolling: "touch",
}

function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function getDropdownButtonLabel({placeholderButtonLabel, value}) {
    if (value && value.some((o) => o.value === "*")) {
        return `${placeholderButtonLabel}: All`;
    } else {
        return `${placeholderButtonLabel}: ${value.length} selected`;
    }
}


class AddCollection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionName: "",
            collectionSource: 'pokemon',
            setCollectionDropdown: '',
            CustomMenu: '',
            SetSelection: '',
            sets: [],
            currentQuery: '',
            pokemonOptions: [],
            selectedPokemon: [],
            selectedOptions: []
        };
        this.props.getSets();
        this.props.getPokemon();
        this.props.getArtists();

        this.onPokemonListChange = this.onPokemonListChange.bind(this)
    }

    onChange = e => {
        console.log(e)
        this.setState({[e.target.name]: e.target.value}, () => {
            console.log(this.state)
        });
    };

    onChangeCollectionSource = e => {
        console.log(e)
        this.setState({'collectionSource': e, 'currentQuery': '', selectedOptions: []}, () => {
            console.log(this.state)
        });
    };

    onChangeSetSelection = e => {
        console.log(e);
        let query = '?set=' + e.value + '&orderBy=number';

        this.props.getCardsFilter(query, () => {
            console.log("FUCK");

        })

        let setName = this.props.sets.filter(obj => obj.id === e.value)[0].name;
        this.setState({'collectionName': setName, 'SetSelection': e.value, 'currentQuery': query}, () => {
            console.log(this.state)
            // this.forceUpdate();
        });
    }

    onPokemonListChange(selectedList, selectedItem) {
        console.log(this.state);
        console.log(selectedList);
        console.log(selectedItem);

    }


    onAddClick = () => {
        if (this.state.collectionSource == 'set') {
            let cards = 1;
        }


        const collection = {
            collectionName: this.state.collectionName,
            collectionSource: this.state.collectionSource,
            query: this.state.SetSelection,
        };
        addCollection(collection);
    };

    CollectionSelector = () => {
        console.log("-----");
        console.log(this.props);
        console.log("-----");

        let showCollectionNameBox = false;
        let formContents = (<React.Fragment></React.Fragment>);

        switch (this.state.collectionSource) {
            case 'set':
                let items = this.props.sets.map(set => {
                    return {
                        value: set.id, label:
                            <span>
                                <img style={{width: "15px"}} src={set.symbol}/> {set.name} - {set.printedtotal} Cards
                            </span>
                    }
                });
                console.log(items)
                formContents = (
                    <Select onChange={this.onChangeSetSelection} options={items}/>
                )
                break;
            case 'pokemon':
                let pokemonNotChosen = "";
                showCollectionNameBox = true;
                formContents = (
                    <Form.Group className="mb-3" controlId="formFromSet">
                        {/*<Form.Label>Collection From P</Form.Label>*/}

                        <Form.Row>
                            <Form.Group as={Col} sm={5}>
                                <Multiselect
                                    options={this.props.pokemonOptions}
                                    displayValue="label"
                                    selectedValues={this.state.selectedOptions}
                                />
                            </Form.Group>
                            <Form.Group as={Col} sm={5}>
                                <ListGroup defaultActiveKey="#link1" styzle={pokemon_list_style}>


                                </ListGroup>
                            </Form.Group>
                        </Form.Row>


                    </Form.Group>
                )
                break;
            case 'artist':
                showCollectionNameBox = true;
                formContents = (<Form.Group className="mb-3" controlId="formFromSet">
                    <Multiselect
                        options={this.props.artists}
                        displayValue="label"
                        selectedValues={this.state.selectedOptions}
                    />
                </Form.Group>)
                break;
            case 'custom query':
                showCollectionNameBox = true;
                formContents = (<Form.Group className="mb-3" controlId="formFromSet">
                    <Form.Label>Collection From Q</Form.Label>
                    Dropdown
                </Form.Group>)
                break;
        }


        return (
            <React.Fragment>
                {showCollectionNameBox &&
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{"display": showCollectionNameBox}}>
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
                }
                <Form.Group className="mb-3" controlId="formSources">
                    {formContents}
                </Form.Group>
            </React.Fragment>

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
        let cards_to_render = [];

        if (this.state.currentQuery in this.props.cards.set_cards) {
            cards_to_render = this.props.cards.set_cards[this.state.currentQuery]
        }


        return (
            <div>

                <Form>
                    <Form.Group controlId="contentId">


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

                {/*<CardsList cards={cards_to_render}/>*/}

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
    let pokemonOptionsVal = state.pokemon.pokemon.map(pokemon => {
        return (
            {
                label: "#" + pad(pokemon.nationaldexnumber, 3) + " " + pokemon.name,
                value: pokemon.nationaldexnumber
            }
        )
    })

    let artists = state.cards.artists.map(artist => {
        return (
            {
                label: artist,
                value: artist
            }
        )
    })

    return {
        // userInfo: state.THE_SPECIFIC_REDUCER.userInfo,
        // loading: state.THE_SPECIFIC_REDUCER.loading,
        // error: state.THE_SPECIFIC_REDUCER.error
        sets: state.sets.sets,
        cards: state.cards,
        pokemon: state.pokemon.pokemon,
        artists: artists,
        pokemonOptions: pokemonOptionsVal
    }
}
// export default connect(mapStateToProps, {addCollection})(withRouter(AddCollection));

export default connect(mapStateToProps, {
    getArtists, getSets, getCardsFilter, getPokemon
})(withRouter(AddCollection));
