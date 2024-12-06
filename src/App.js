import "./App.css";
import { useState, useEffect } from "react";
import Search from "./Search";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";

function App() {
  //Books state - list of books.
  const [books,setBooks] = useState([]);
  //show Search page state
  const [showSearchPage, setShowSearchpage] = useState(false);

  const handleSearchClick=()=>{

    setShowSearchpage(!showSearchPage);
  };

  //Fetch books on initial load
  useEffect(() =>{
    BooksAPI.getAll().then((books)=>setBooks(books));    
  },[]);

  const updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      // Update state to reflect shelf change
      setBooks((prevBooks) => {
        const updatedBooks = prevBooks.filter((b) => b.id !== book.id);
        if (shelf !== "none") {
          book.shelf = shelf; // Update the book's shelf locally
          updatedBooks.push(book);
        }
        return updatedBooks;
      });
    });
  };

  return (
    <div className="app">
      {showSearchPage ? (
      <Search books={books} updateBookShelf={updateBookShelf} onClose={() => setShowSearchpage(false)}/>
      ) : (
        //This sets up the Three sections currently reading, want to read and read
        //Main Page
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf 
              title="Currently Reading"
              books={books.filter((book)=> book.shelf === "currentlyReading" )}  
              updateBookShelf={updateBookShelf}           
            />
             <BookShelf 
              title="Want to Read"
              books={books.filter((book)=> book.shelf === "wantToRead")}  
              updateBookShelf={updateBookShelf}          
            />
             <BookShelf 
              title="Read"
              books={books.filter((book)=> book.shelf === "read")}
              updateBookShelf={updateBookShelf}       
            />          
          </div>           
          <div className="open-search">
            <a onClick={() => setShowSearchpage(!showSearchPage)}>Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
