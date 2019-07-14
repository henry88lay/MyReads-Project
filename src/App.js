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

  updateSearchPageState = state => {
    this.setState({showSearchPage: state});
  };

  componentDidMount() {
    BooksAPI.getAll().then(resp => this.setState({books: resp}));
  }

  changeBookShelf = (book, shelf) => {
    this.setState({
      books: this.state.books.map(b => {
        b.id === book.id ? (b.shelf = shelf) : b;
        return b;
      })
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
