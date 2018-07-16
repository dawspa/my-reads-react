import React from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Bookshelves'

const SearchBooks = (props) => {

    const {booksFiltered, booksSearch, updateOption} = props

    return (
      <div>
        <div className="search-books-bar">
          <Link to='/' className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input
              className='search-books-results'
              type='text'
              placeholder='Search books..'
              onChange={(event) => booksSearch(event.target.value)}/>
          </div>
        </div>

        <div className="search-books-results">
          {booksFiltered.length > 0 && (
          <ol className="books-grid">
            {booksFiltered.map(book => (<Shelf book={book} key={book.id} updateOption={updateOption}/>))}
          </ol>
          )}
          {booksFiltered.length <= 0 && (
            <div>
                <h3>No books found</h3>
            </div>
          )}
        </div>
      </div>
    )
}
export default SearchBooks
