import React from 'react';
import Shelves from './components/Shelves';
import Search from './components/Search';
import * as BooksAPI from './BooksAPI';
import SearchButton from './components/SearchButton';
import Header from './components/Header';
import './App.css';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: ''
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
      </div>
    );
  }
}

export default BooksApp;
