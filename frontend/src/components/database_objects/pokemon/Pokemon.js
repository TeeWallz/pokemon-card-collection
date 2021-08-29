import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deletePokemon, updatePokemon } from "./PokemonsActions";
import { Button } from "react-bootstrap";

class Pokemon extends Component {
  onDeleteClick = () => {
    const { pokemon } = this.props;
    this.props.deletePokemon(pokemon.id);
  };
  onUpperCaseClick = () => {
    const { pokemon } = this.props;
    this.props.updatePokemon(pokemon.id, {
      content: pokemon.content.toUpperCase()
    });
  };
  onLowerCaseClick = () => {
    const { pokemon } = this.props;
    this.props.updatePokemon(pokemon.id, {
      content: pokemon.content.toLowerCase()
    });
  };
  render() {
    const { pokemon } = this.props;
    return (
      <div>
        <p>
          {pokemon.id} - {pokemon.name}
        </p>
      </div>
    );
  }
}

Pokemon.propTypes = {
  pokemon: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deletePokemon, updatePokemon })(
  withRouter(Pokemon)
);
