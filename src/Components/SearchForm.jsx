import React, { useContext, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { BookContext, actionTypes } from '../context/Context';

const SearchForm = () => {
    
  const { state, dispatch, fetchBooks } = useContext(BookContext);
  const { isLightMode } = state;
  const searchText = useRef();
  const navigate = useNavigate();

  useEffect(() => searchText.current.focus(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tempSearchTerm = searchText.current.value.trim();
    if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
        dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: 'the lost world' });
        dispatch({ type: actionTypes.SET_RESULT_TITLE, payload: 'Please Enter Something ...' });
      } else {
        dispatch({ type: actionTypes.SET_SEARCH_TERM, payload: searchText.current.value });
      }
       await fetchBooks();
      navigate('/book');
    };
  
    return (
      <>
        <div className={`flex justify-center ${isLightMode ? 'dark-bg' : ''}`}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder='The Lost World...' ref={searchText} className='border-2 border-gray-800 mb-4 rounded-lg' />
            <button className={`ml-4 text-purple-300 ${isLightMode ? 'dark-mode-btn' : ''}`}>
              <FaSearch />
            </button>
          </form>
        </div>
      </>
    );
  };
  
  export default SearchForm;
  

