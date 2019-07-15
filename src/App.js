import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Shelves from './components/Shelves';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import SearchButton from './components/SearchButton';
import Header from './components/Header';
import './App.css';

class BooksApp extends Component {
  state = {
    allBooks: [],
    filteredBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({allBooks: books});
    });
  }

  searchBooks = query => {
    if (query) {
      BooksAPI.search(query).then(result => {
        this.updateSearchedResult(result);
        if (result.error !== 'empty query') {
          this.setState({filteredBooks: result});
        } else {
          this.setState({filteredBooks: []});
        }
      });
    } else {
      this.setState({filteredBooks: []});
    }
  };

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updated => {
      BooksAPI.getAll().then(books => {
        this.setState({allBooks: books});
      });
    });
  };

  render() {
    return (
      <div className='app'>
        <Header />
        <Switch>
          <Route
            exact
            path='/'
            render={() => (
              <Shelves
                books={this.state.allBooks}
                updateOption={(book, shelf) =>
                  this.updateBookShelf(book, shelf)
                }
              />
            )}
          />
          <Route
            path='/search'
            render={() => (
              <div>
                <Search
                  filteredBooks={this.state.filteredBooks}
                  searchBooks={query => this.searchBooks(query)}
                  updateOption={(book, shelf) =>
                    this.updateBookShelf(book, shelf)
                  }
                />
              </div>
            )}
          />
          <Route
            component={function NoMatch() {
              return (
                <div className='errorPage'>
                  <h1>404</h1>
                  <h3>Page not Found</h3>
                </div>
              );
            }}
          />
          <SearchButton />
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
