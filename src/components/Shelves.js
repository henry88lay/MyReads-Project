import React, {Component} from 'react';
import Shelf from './Shelf';

export default class Shelves extends Component {
  render() {
    const allBooks = this.props.allBooks;
    const currentlyReading = allBooks.filter(
      Book => Book.shelf === 'currentlyReading'
    );
    const wantToRead = allBooks.filter(Book => Book.shelf === 'wantToRead');
    const read = allBooks.filter(Book => Book.shelf === 'read');
    return (
      <div className='list-books-content'>
        <div>
          <Shelf
            books={currentlyReading}
            title={'Currently Reading'}
            changeShelf={this.props.changeShelf}
          />
          <Shelf
            books={wantToRead}
            title={'Want to Read '}
            changeShelf={this.props.changeShelf}
          />
          <Shelf
            books={read}
            title={'Read'}
            changeShelf={this.props.changeShelf}
          />
        </div>
      </div>
    );
  }
}
