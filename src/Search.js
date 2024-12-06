import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import Book from "./Book";

const Search=({books,updateBookShelf,onClose})=>{
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);


    useEffect(() => {
        if (query.length >= 3) {
          const timer = setTimeout(() => {
            BooksAPI.search(query, 20)
              .then((results) => {
                if (results.error) {
                  setSearchResults([]);
                } else {
                  const updatedResults = results.map((result) => {
                    const bookOnShelf = books.find((b) => b.id === result.id);
                    return bookOnShelf ? { ...result, shelf: bookOnShelf.shelf } : { ...result, shelf: "none" };
                  });
                  setSearchResults(updatedResults);
                }
              })
              .catch(() => setSearchResults([]));
          }, 300);
    
          return () => clearTimeout(timer);
        } else {
          setSearchResults([]);
        }
      }, [query, books]);

      return (
        <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={onClose}>
              Close
            </button>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title, author, or ISBN"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {searchResults.map((book) => (
                <Book
                  key={book.id}
                  book={book}
                  updateBookShelf={updateBookShelf}
                />
              ))}
            </ol>
          </div>
        </div>
      );
    };
    
    Search.propTypes = {
      books: PropTypes.array.isRequired,
      updateBookShelf: PropTypes.func.isRequired,
    };
export default Search;