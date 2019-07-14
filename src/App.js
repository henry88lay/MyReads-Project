import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Shelves from './components/Shelves';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import SearchButton from './components/SearchButton';
import Header from './components/Header';
import './App.css';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    filteredBooks: []
  };

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

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({allBooks: books});
    });
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(updated => {
      BooksAPI.getAll().then(books => {
        this.setState({allBooks: books});
        this.updateSearchedResult(this.state.filteredBooks);
      });
    });
  };

  render() {
    return (
      <div className='app'>
        <Switch>
          {this.state.showSearchPage ? (
            <Search showSearchPage={this.updateSearchPageState} />
          ) : (
            <div className='list-books'>
              <Header />
              <Shelves
                allBooks={this.state.books}
                changeShelf={this.changeBookShelf}
              />
              <SearchButton showSearchPage={this.updateSearchPageState} />
            </div>
          )}
        </Switch>
      </div>
    );
  }
}

export default BooksApp;
