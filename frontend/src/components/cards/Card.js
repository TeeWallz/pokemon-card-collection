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
        <hr />
        <p>
          (id:{card.id}) {card.content}
        </p>
        <Button variant="secondary" size="sm" onClick={this.onUpperCaseClick}>
          Upper case
        </Button>{" "}
        <Button variant="info" size="sm" onClick={this.onLowerCaseClick}>
          Lower case
        </Button>{" "}
        <Button variant="danger" size="sm" onClick={this.onDeleteClick}>
          Delete
        </Button>
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
