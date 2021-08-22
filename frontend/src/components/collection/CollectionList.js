import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCollections } from "./CollectionsActions";

import Collection from "./Collection";

class CollectionsList extends Component {
  componentDidMount() {
    console.log("collections componentDidMount")
    this.props.getCollections();

  }

  render() {
    console.log("Render")
    const { collections } = this.props.collections;

    if (collections.length === 0) {
      return <h2>Please add your first collection</h2>;
    }

    let items = collections.map(collection => {
      return <Collection key={collection.id} collection={collection} />;
    });

    return (
      <div>
        <h2>Collections</h2>
        {items}
        <hr /> {/* a */}
      </div>
    );
  }
}

CollectionsList.propTypes = {
  getCollections: PropTypes.func.isRequired,
  collections: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  collections: state.collections
});

export default connect(mapStateToProps, {
  getCollections
})(withRouter(CollectionsList));
