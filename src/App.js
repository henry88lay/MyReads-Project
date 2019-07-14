import React from 'react';
import Shelves from './components/Shelves';
import Search from './components/Search';
// import * as BooksAPI from './BooksAPI'
import './App.css';
import SearchButton from './components/SearchButton';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  };

  updateSearchPageState = state => {
    this.setState({showSearchPage: state});
  };

  render() {
    return (
      <div className='app'>
        {this.state.showSearchPage ? (
          /* Search Component */
          <Search showSearchPage={this.updateSearchPageState} />
        ) : (
          <div className='list-books'>
            {/* Header Component */}
            <div className='list-books-title'>
              <h1>MyReads</h1>
            </div>
            {/* Shelves Component */}
            <Shelves />
            {/* Search Button Component */}
            <SearchButton showSearchPage={this.updateSearchPageState} />
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
