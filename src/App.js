import React, {Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Switch, Route} from 'react-router-dom'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
  state = {
    booksAll: [],
    booksFiltered: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {this.setState({booksAll: books})})
  }

  booksSearch = (query) => {
    if (query) {
      BooksAPI.search(query).then((result) => {
        if (result.error !== 'empty query') {
          this.searchResultUpdate(result)
          this.setState({booksFiltered: result})
        } else {
          this.setState({booksFiltered: []})
        }
      })
    } else {
      this.setState({booksFiltered: []})
    }
  }

  shelfUpdate = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updated => (BooksAPI.getAll().then((books) => {
      this.setState({booksAll: books})
      this.searchResultUpdate({booksFiltered: books})
    })))
  }

  searchResultUpdate = (values) => {
    for (let value in values) {
      for (let book of this.state.booksAll) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
    }
    this.setState({booksFiltered: values})
  }

  render() {
    return (
      <div className="app">

        <Switch>
            <Route exact path="/" render={() => (<ListBooks books={this.state.booksAll}
                updateOption={(book, shelf) => this.shelfUpdate(book, shelf)}/>)}/>
            <Route path="/search" render={() => (
                <div>
                    <SearchBooks booksFiltered={this.state.booksFiltered}
                      booksSearch={(query) => this.booksSearch(query)}
                      updateOption={(book, shelf) => this.shelfUpdate(book, shelf)}/>
                </div>
            )}/>

          <Route component={function notFound() {
            return (
              <div className="page404">
                <h1>404 Not Found</h1>
                <h3>Page not Found</h3>
              </div>
            )
          }}/>

        </Switch>

      </div>
    )
  }
}

export default BooksApp
