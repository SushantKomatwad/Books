import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import BookList from './Components/BookList';
import BookDetails from './Components/BookDetails';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/book' element={<BookList />} />
        <Route path='/book/:id' element={<BookDetails />} />
      </Routes>
    </>
  );
};

export default App;
