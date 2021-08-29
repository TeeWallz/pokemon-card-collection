import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteCard, updateCard } from "./CardsActions";
import { Button } from "react-bootstrap";

class Card extends Component {
  onDeleteClick = () => {
    const { card } = this.props;
    this.props.deleteCard(card.id);
  };
  onUpperCaseClick = () => {
    const { card } = this.props;
    this.props.updateCard(card.id, {
      content: card.content.toUpperCase()
    });
  };
  onLowerCaseClick = () => {
    const { card } = this.props;
    this.props.updateCard(card.id, {
      content: card.content.toLowerCase()
    });
  };
  render() {
    const { card } = this.props;
    return (
      <div>
        <p>
          {card.id} - {card.name}
        </p>
      </div>
    );
  }
}

Card.propTypes = {
  card: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteCard, updateCard })(
  withRouter(Card)
);
