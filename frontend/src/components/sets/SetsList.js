import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getSets } from "./SetsActions";

import Set from "./Set";

class SetsList extends Component {
  componentDidMount() {
    console.log("sets componentDidMount")
    this.props.getSets();

  }

  render() {
    console.log("Render")
    const { sets } = this.props.sets;

    if (sets.length === 0) {
      return <h2>Please add your first set</h2>;
    }

    let items = sets.map(set => {
      return <Set key={set.id} set={set} />;
    });

    return (
      <div>
        <h2>Sets</h2>
        <table>
          {items}
        </table>
        <hr /> {/* a */}
      </div>
    );
  }
}

SetsList.propTypes = {
  getSets: PropTypes.func.isRequired,
  sets: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  sets: state.sets
});

export default connect(mapStateToProps, {
  getSets
})(withRouter(SetsList));
