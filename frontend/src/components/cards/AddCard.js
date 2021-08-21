import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { addCard } from "./CardsActions";

class AddCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onAddClick = () => {
    const card = {
      content: this.state.content
    };
    this.props.addCard(card);
  };

  render() {
    return (
      <div>
        <h2>Add new card</h2>
        <Form>
          <Form.Group controlId="contentId">
            <Form.Label>Card</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="content"
              placeholder="Enter card"
              value={this.content}
              onChange={this.onChange}
            />
          </Form.Group>
        </Form>
        <Button variant="success" onClick={this.onAddClick}>
          Add card
        </Button>
      </div>
    );
  }
}

AddCard.propTypes = {
  addCard: PropTypes.func.isRequired
};

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addCard })(withRouter(AddCard));
