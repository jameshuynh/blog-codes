import React, { Component } from 'react';
import axiosClient from '../../axiosClient';
import './Index.css';

class BookForm extends Component {
  state = {
    selectedBookCoverFiles: [],
    submitFormProgress: 0,
    isSubmittingForm: false,
    didFormSubmissionComplete: false,
    book: {
      id: this.props.match.params.id,
      title: '',
      description: '',
      errors: {}
    }
  };

  componentWillMount() {
    if (this.props.match.params.id) {
      axiosClient.get(`/books/${this.props.match.params.id}`).then(response => {
        console.log(response.data);
        this.setState({
          selectedBookCoverFiles: response.data.cover_photos,
          book: {
            id: response.data.id,
            title: response.data.title,
            description: response.data.description,
            errors: {}
          }
        });
      });
    }
  }

  getNumberOfSelectedFiles() {
    return this.state.selectedBookCoverFiles.filter(el => {
      return el._destroy !== true;
    }).length;
  }

  render() {
    return (
      <div className="BookForm">
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              onChange={e => this.handleBookTitleChange(e)}
              value={this.state.book.title}
              className="form-control"
            />
            {this.renderBookTitleInlineError()}
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              type="text"
              onChange={e => this.handleBookDescriptionChange(e)}
              value={this.state.book.description}
              className="form-control"
            />
            {this.renderBookDescriptionInlineError()}
          </div>
          <div className="form-group">
            <label>Covers</label>
            {this.renderUploadCoversButton()}
            {this.renderSelectedBookCoverFiles()}
          </div>
          {this.renderUploadFormProgress()}
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleFormSubmit()}
            className="btn btn-primary">
            {this.state.isSubmittingForm ? 'Saving...' : 'Save'}
          </button>
          &nbsp;
          <button
            disabled={this.state.isSubmittingForm}
            onClick={e => this.handleCancel()}
            className="btn btn-default">
            Cancel
          </button>
        </form>
        <br />
      </div>
    );
  }

  renderUploadCoversButton() {
    let numberOfSelectedCovers = this.getNumberOfSelectedFiles();
    return (
      <div>
        <input
          name="covers[]"
          ref={field => (this.bookCoversField = field)}
          type="file"
          disabled={this.state.isSubmittingForm}
          multiple={true}
          accept="image/*"
          style={{
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
          }}
          id="book_covers"
          onChange={e => this.handleBookCoversChange(e)}
          className="form-control"
        />
        <label
          disabled={this.state.isSubmittingForm}
          className="btn btn-success"
          htmlFor="book_covers">
          <span className="glyphicon glyphicon-cloud-upload" />
          &nbsp; &nbsp;
          {numberOfSelectedCovers === 0
            ? 'Upload Files'
            : `${numberOfSelectedCovers} file${numberOfSelectedCovers !== 1
                ? 's'
                : ''} selected`}
        </label>
      </div>
    );
  }

  renderSelectedBookCoverFiles() {
    let fileDOMs = this.state.selectedBookCoverFiles.map((el, index) => {
      if (el._destroy) {
        return null;
      }

      return (
        <li key={index}>
          <div className="photo">
            <img
              width={150}
              src={el.id ? el.url : URL.createObjectURL(el)}
              style={{ alignSelf: 'center' }}
            />
            <div
              className="remove"
              onClick={() => this.removeSelectedBookCoverFile(el, index)}>
              <span style={{ top: 2 }} className="glyphicon glyphicon-remove" />
            </div>
          </div>
          <div className="file-name">
            {el.name}
          </div>
        </li>
      );
    });

    return (
      <ul className="selected-covers">
        {fileDOMs}
      </ul>
    );
  }

  renderUploadFormProgress() {
    if (this.state.isSubmittingForm === false) {
      return null;
    }

    return (
      <div className="progress">
        <div
          className={
            'progress-bar progress-bar-info progress-bar-striped' +
            (this.state.submitFormProgress < 100 ? 'active' : '')
          }
          role="progressbar"
          aria-valuenow={this.state.submitFormProgress}
          areaValuemin="0"
          areaValuemax="100"
          style={{ width: this.state.submitFormProgress + '%' }}>
          {this.state.submitFormProgress}% Complete
        </div>
      </div>
    );
  }

  removeSelectedBookCoverFile(cover, index) {
    let { selectedBookCoverFiles } = this.state;
    if (cover.id) {
      selectedBookCoverFiles[index]._destroy = true;
    } else {
      selectedBookCoverFiles.splice(index, 1);
    }

    this.setState({
      selectedBookCoverFiles: selectedBookCoverFiles
    });
  }

  handleBookCoversChange() {
    let selectedFiles = this.bookCoversField.files;
    let { selectedBookCoverFiles } = this.state;
    for (let i = 0; i < selectedFiles.length; i++) {
      selectedBookCoverFiles.push(selectedFiles.item(i));
    } //end for

    this.setState(
      {
        selectedBookCoverFiles: selectedBookCoverFiles
      },
      () => {
        this.bookCoversField.value = null;
      }
    );
  }

  handleBookTitleChange(e) {
    let { book } = this.state;
    book.title = e.target.value;
    this.setState({ book: book });
  }

  handleBookDescriptionChange(e) {
    let { book } = this.state;
    book.description = e.target.value;
    this.setState({ book: book });
  }

  renderBookTitleInlineError() {
    if (this.state.book.errors.title) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.book.errors.title.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  renderBookDescriptionInlineError() {
    if (this.state.book.errors.description) {
      return (
        <div className="inline-error alert alert-danger">
          {this.state.book.errors.description.join(', ')}
        </div>
      );
    } else {
      return null;
    }
  }

  handleCancel() {
    this.props.history.push('/books');
  }

  buildFormData() {
    let formData = new FormData();
    formData.append('book[title]', this.state.book.title);
    formData.append('book[description]', this.state.book.description);

    let { selectedBookCoverFiles } = this.state;
    for (let i = 0; i < selectedBookCoverFiles.length; i++) {
      let file = selectedBookCoverFiles[i];
      if (file.id) {
        if (file._destroy) {
          formData.append(`book[covers_attributes][${i}][id]`, file.id);
          formData.append(`book[covers_attributes][${i}][_destroy]`, '1');
        }
      } else {
        formData.append(
          `book[covers_attributes][${i}][photo]`,
          file,
          file.name
        );
      }
    }
    return formData;
  }

  submitForm() {
    let submitMethod = this.state.book.id ? 'patch' : 'post';
    let url = this.state.book.id
      ? `/books/${this.state.book.id}.json`
      : '/books.json';

    axiosClient
      [submitMethod](url, this.buildFormData(), {
        onUploadProgress: progressEvent => {
          let percentage = progressEvent.loaded * 100.0 / progressEvent.total;
          this.setState({
            submitFormProgress: percentage
          });
        }
      })
      .then(response => {
        this.setState({
          didFormSubmissionComplete: true
        });
        this.props.history.push('/books');
      })
      .catch(error => {
        let { book } = this.state;
        book.errors = error.response.data;
        this.setState({
          isSubmittingForm: false,
          submitFormProgress: 0,
          book: book
        });
      });
  }

  handleFormSubmit() {
    let { book } = this.state;
    book.errors = {};
    this.setState(
      {
        isSubmittingForm: true,
        book: book
      },
      () => {
        this.submitForm();
      }
    );
  }
}

export default BookForm;
