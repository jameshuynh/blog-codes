import React, { Component } from 'react';
import BookForm from '../Form';

class BookNew extends Component {
  render() {
    return (
      <div className="BookNew col-md-8 col-md-offset-2">
        <h2>New Book</h2>
        <BookForm history={this.props.history} match={this.props.match} />
      </div>
    );
  }
}

export default BookNew;
