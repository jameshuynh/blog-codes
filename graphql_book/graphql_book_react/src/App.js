import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

class App extends Component {
  state = { email: 'admin@example.com', password: 'secret', jwt: '', books: [] }
  login(e) {
    e.preventDefault()

    let query = `mutation {
      logged_in_user(
        auth: {
          email: "${this.state.email}"
          password: "${this.state.password}"
        }) {
        jwt,
        user {
          id
          email
        }
      }
    }`

    fetch('http://localhost:3000/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        let user = data.data.logged_in_user
        if (user) {
          this.setState({ jwt: user.jwt }, () => {
            this.retrieveBooks()
          })
        } else {
          alert('Incorrect username or password')
        }
      })
  }

  retrieveBooks() {
    let query = `query {
          books {
            id,
            title,
            number_of_comments,
            author {
              id,
              name
            }
          }
        }`

    fetch('http://localhost:3000/graphql', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.state.jwt}`,
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: query
      })
    })
      .then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
        this.setState({ books: data.data.books })
      })
  }

  renderBooksListing() {
    let bookRecords = this.state.books.map(book => {
      return (
        <tr key={book.id}>
          <td>{book.id}</td>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.number_of_comments}</td>
        </tr>
      )
    })
    return (
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Comments Count</th>
          </tr>
        </thead>
        <tbody>{bookRecords}</tbody>
      </table>
    )
  }

  renderLogin() {
    return (
      <div>
        <h3>Login</h3>
        <form>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email"
              className="form-control"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={e => this.login(e)}>
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this.state.jwt == '' && this.renderLogin()}
        {this.state.jwt != '' && this.renderBooksListing()}
      </div>
    )
  }
}

export default App
