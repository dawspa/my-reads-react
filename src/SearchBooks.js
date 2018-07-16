import React from 'react'
import {Link} from 'react-router-dom'
import Shelf from './Bookshelves'

const SearchBooks = () => {

    const {booksFiltered, booksSearch, updateOption} = this.props

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
          <ol className="books-grid">
            {booksFiltered.map(book => (<Shelf book={book} key={book.id} updateOption={updateOption}/>))}
          </ol>
        </div>
      </div>
    )
}
export default SearchBooks
