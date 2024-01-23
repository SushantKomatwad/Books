import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import coverImg from '../images/book_cover.jpeg';
import { BookContext } from '../context/Context';


const BookList = () => {
  const { state } = useContext(BookContext);
  const { books, loading, resultTitle, isLightMode } = state;

  const booksWithCovers = books.map((singleBook) => ({
    ...singleBook,
    id: singleBook.key,
    cover_img: singleBook.cover_i
      ? `https://covers.openlibrary.org/b/id/${singleBook.cover_i}-L.jpg`
      : coverImg,
  }));

  if (loading) {
    return (
        <p>Loading...</p>
    )
  }

  return (
    <section className={`booklist ${isLightMode ? 'dark-bg' : ''}`}>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {booksWithCovers.slice(0, 30).map((book, index) => (
            <div className='book-item flex flex-column justify-evenly mt-4 border-2 ' key={index}>
              <div className='book-item-img'>
                <img src={book.cover_img} alt='cover' className='w-64 h-80 '/>
              </div>
              <div className='book-item-info text-center flex flex-col justify-center items-center font-bold text-yellow-600'>
                <Link to={`/book/${book.id}`} {...book}>
                  <div className='book-item-info-item title fw-7 fs-18'>
                    <span>{book.title}</span>
                  </div>
                </Link>
                <div className='book-item-info-item edition-count fs-15'>
                  <span className='text-capitalize fw-7'>Total Editions: </span>
                  <span>{book.edition_count}</span>
                </div>

                <div className='book-item-info-item publish-year fs-15'>
                  <span className='text-capitalize fw-7'>First Publish Year: </span>
                  <span>{book.first_publish_year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
