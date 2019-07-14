import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Shelf from './Shelf';

export default class Search extends Component {
  render() {
    const {filteredBooks, searchBooks, changeOption} = this.props;

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link
            className='close-search'
            onClick={event => searchBooks(event.target.value)}
          >
            Close
          </Link>
          <div className='search-books-input-wrapper'>
            <input type='text' placeholder='Search by title or author' />
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {filteredBooks.map(book => (
              <Shelf book={book} key={book.id} updateOption={changeOption} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
