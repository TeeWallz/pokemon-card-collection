import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { deleteSet, updateSet } from "./SetsActions";
import { Button } from "react-bootstrap";

const SetLogo = {
  // height: "100px",
    maxWidth: "155px",
    maxHeight: "50px",
}



class Set extends Component {

  render() {
    const { set } = this.props;
    return (
        <tr>
            <img src={set.logo} style={SetLogo}/>
            <td>{set.name}</td>
            <td>{set.series}</td>
            <td>{set.releasedate}</td>
            <td>{set.printedtotal}</td>
            <td>
                <Button>Start Collection</Button>
            </td>
        </tr>
    );
  }
}

Set.propTypes = {
  set: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, {  })(
  withRouter(Set)
);
