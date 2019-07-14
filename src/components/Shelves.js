import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Shelf from './Shelf';

export default class Shelves extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  };

  render() {
    const {books, changeOption} = this.props;

    return (
      <div className='list-books-content'>
        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Currently Reading</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {books
                .filter(book => book.shelf === 'currentlyReading')
                .map(book => (
                  <Shelf
                    book={book}
                    key={book.id}
                    updateOption={changeOption}
                  />
                ))}
            </ol>
          </div>
        </div>

        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Want To Read</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {books
                .filter(book => book.shelf === 'wantToRead')
                .map(book => (
                  <Shelf
                    book={book}
                    key={book.id}
                    updateOption={changeOption}
                  />
                ))}
            </ol>
          </div>
        </div>

        <div className='bookshelf'>
          <h2 className='bookshelf-title'>Read</h2>
          <div className='bookshelf-books'>
            <ol className='books-grid'>
              {books
                .filter(book => book.shelf === 'read')
                .map(book => (
                  <Shelf
                    book={book}
                    key={book.id}
                    updateOption={changeOption}
                  />
                ))}
            </ol>
          </div>
        </div>

        <div className='open-search'>
          <Link to='/search'>Add a book</Link>
        </div>
      </div>
    );
  }
}
