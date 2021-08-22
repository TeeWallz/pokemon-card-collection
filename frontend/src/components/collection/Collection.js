import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteCollection, updateCollection } from "./CollectionsActions";
import { Button } from "react-bootstrap";

class Collection extends Component {
  // onDeleteClick = () => {
  //   const { collection } = this.props;
  //   this.props.deleteCollection(collection.id);
  // };
  // onUpperCaseClick = () => {
  //   const { collection } = this.props;
  //   this.props.updateCollection(collection.id, {
  //     content: collection.content.toUpperCase()
  //   });
  // };
  // onLowerCaseClick = () => {
  //   const { collection } = this.props;
  //   this.props.updateCollection(collection.id, {
  //     content: collection.content.toLowerCase()
  //   });
  // };
  render() {
    const { collection } = this.props;
    return (
      <div>
        <hr />
        <p>
          (id:{collection.id}) {collection.content}
        </p>
      </div>
    );
  }
}

Collection.propTypes = {
  collection: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteCollection, updateCollection })(
  withRouter(Collection)
);
