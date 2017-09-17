import React, { Component } from 'react';
import axiosClient from '../../axiosClient';

class BookIndex extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentWillMount() {
    axiosClient.get('/books.json').then(response => {
      this.setState({ books: response.data });
    });
  }

  render() {
    return (
      <div className="BookIndex col-md-12" style={{ marginTop: 10 }}>
        <div className="clearfix">
          <div className="pull-right">
            <button
              onClick={e => this.handleNewBook()}
              className="btn btn-success">
              New Book
            </button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTableBody()}
          </tbody>
        </table>
      </div>
    );
  }

  handleNewBook() {
    this.props.history.push('/books/new');
  }

  renderTableBody() {
    return this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>
            {book.id}
          </td>
          <td>
            {book.title}
          </td>
          <td>
            {book.description}
          </td>
          <td>
            <button
              onClick={e => this.handleEdit(book.id)}
              className="btn btn-primary">
              Edit
            </button>
            &nbsp;
            <button
              onClick={e => this.handleRemove(book.id)}
              className="btn btn-danger">
              Remove
            </button>
          </td>
        </tr>
      );
    });
  }

  handleEdit(bookId) {
    this.props.history.push(`/books/${bookId}/edit`);
  }

  handleRemove(bookId) {
    let books = this.state.books;
    books = books.filter(book => {
      return book.id !== bookId;
    });
    this.setState({ books: books });
    axiosClient.delete(`/books/${bookId}`);
  }
}

export default BookIndex;
