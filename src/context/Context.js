import { createContext, useReducer } from 'react';
import axios from 'axios';

const BookContext = createContext();

const initialState = {
    books: [],
    loading: true,
    resultTitle: '',
    searchTerm: 'the lost world',
    error: null,
};

const actionTypes = {
    SET_BOOKS: 'SET_BOOKS',
    SET_LOADING: 'SET_LOADING',
    SET_RESULT_TITLE: 'SET_RESULT_TITLE',
    SET_SEARCH_TERM: 'SET_SEARCH_TERM',
    SET_ERROR: 'SET_ERROR',
};

const BookReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_BOOKS:
            return {
                ...state,
                books: action.payload,
            };
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case actionTypes.SET_RESULT_TITLE:
            return {
                ...state,
                resultTitle: action.payload,
            };
        case actionTypes.SET_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case actionTypes.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        default:
            return state;
    }
};

const BookProvider = ({ children }) => {
    const [state, dispatch] = useReducer(BookReducer, initialState);

    const fetchBooks = async () => {
        dispatch({ type: actionTypes.SET_LOADING, payload: true });
        try {
            const response = await axios.get(`http://openlibrary.org/search.json?title=${state.searchTerm}`);
            console.log('Fetched books:', response.data.docs); 
            dispatch({ type: actionTypes.SET_BOOKS, payload: response.data.docs });
        } catch (error) {
            console.error('Error fetching books:', error);
            dispatch({ type: actionTypes.SET_ERROR, payload: error.message });
        } finally {
            dispatch({ type: actionTypes.SET_LOADING, payload: false });
        }
    };

    return (
        <BookContext.Provider value={{ state, dispatch, fetchBooks }}>
            {children}
        </BookContext.Provider>
    );
};

export { BookContext, BookProvider, actionTypes };
