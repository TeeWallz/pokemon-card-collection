import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getNotes } from "./NotesActions";

import Note from "./Note";

class NotesList extends Component {
  componentDidMount() {
    console.log("notes componentDidMount")
    this.props.getNotes();

  }

  render() {
    console.log("Render")
    const { notes } = this.props.notes;

    if (notes.length === 0) {
      return <h2>Please add your first note</h2>;
    }

    let items = notes.map(note => {
      return <Note key={note.id} note={note} />;
    });

    return (
      <div>
        <h2>Notes</h2>
        {items}
        <hr /> {/* a */}
      </div>
    );
  }
}

NotesList.propTypes = {
  getNotes: PropTypes.func.isRequired,
  notes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  notes: state.notes
});

export default connect(mapStateToProps, {
  getNotes
})(withRouter(NotesList));
