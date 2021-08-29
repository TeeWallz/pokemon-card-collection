import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { deleteTemplate, updateTemplate } from "./TemplatesActions";
import { Button } from "react-bootstrap";

class Template extends Component {
  onDeleteClick = () => {
    const { template } = this.props;
    this.props.deleteTemplate(template.id);
  };
  onUpperCaseClick = () => {
    const { template } = this.props;
    this.props.updateTemplate(template.id, {
      content: template.content.toUpperCase()
    });
  };
  onLowerCaseClick = () => {
    const { template } = this.props;
    this.props.updateTemplate(template.id, {
      content: template.content.toLowerCase()
    });
  };
  render() {
    const { template } = this.props;
    return (
      <div>
        <p>
          {template.id} - {template.name}
        </p>
      </div>
    );
  }
}

Template.propTypes = {
  template: PropTypes.object.isRequired
};
const mapStateToProps = state => ({});

export default connect(mapStateToProps, { deleteTemplate, updateTemplate })(
  withRouter(Template)
);
