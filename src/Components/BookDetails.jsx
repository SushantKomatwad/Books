import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import coverImg from '../images/book_cover.jpeg';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const URL = 'https://openlibrary.org/works/';

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json`);
        const data = await response.json();

        if (data) {
          const { description, title, covers, subject_places, subject_times, subjects } = data;
          const newBook = {
            description: description ? description.value : 'No description found',
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(', ') : 'No subject places found',
            subject_times: subject_times ? subject_times.join(', ') : 'No subject times found',
            subjects: subjects ? subjects.join(', ') : 'No subjects found',
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching book details:', error);
        setLoading(false);
      }
    }

    getBookDetails();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;

  return (
    <section className='book-details bg-gray-100 min-h-screen'>
      <div className='container mx-auto p-8'>
        <button
          type='button'
          className='flex items-center bg-purple-500 text-white py-2 px-4 rounded-md mb-4'
          onClick={() => navigate('/book')}
        >
          <FaArrowLeft size={22} className='mr-2' />
          <span className='text-lg font-semibold'>Go Back</span>
        </button>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt='cover img' className='w-full rounded-md' />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='font-semibold text-3xl'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='font-semibold'>Subject Places: </span>
              <span className='italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='font-semibold'>Subject Times: </span>
              <span className='italic'>{book?.subject_times}</span>
            </div>
            <div className='book-details-item'>
              <span className='font-semibold'>Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
