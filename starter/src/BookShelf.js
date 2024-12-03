import Book from "./Book"

function BookShelf({title,books,updateBookShelf}){
    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books.map((book)=> (
                        <Book key={book.id} book={book} updateBookShelf={updateBookShelf}/>
                    ))} 
                </ol>
            </div>
        </div>
    );

};

export default BookShelf;








