import React, { Component } from 'react';
import BookForm from '../Form';

class BookEdit extends Component {
  render() {
    return (
      <div className="BookEdit col-md-8 col-md-offset-2">
        <h2>Edit Book</h2>
        <BookForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default BookEdit;
