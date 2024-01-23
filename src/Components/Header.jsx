import React from 'react';
import Navbar from './Navbar';
import SearchForm from './SearchForm';
import bgimage from '../images/books.jpg';

const Header = () => {
  return (
    <>
      <Navbar />
      <header className='bg-cover bg-center relative ' style={{ backgroundImage: `url(${bgimage})` }}>
        <div className='flex flex-col text-4xl text-white font-semibold px-36 py-24 space-y-12 text-center'>
          <h2>
            Find Your Book Of Choice.
          </h2>
          <p className='text-2xl'>
            Explore a vast collection of books and discover your next favorite read. Our curated selection covers a wide range of genres, ensuring there's something for every reader. Use the search bar above to embark on a journey through the literary world.
          </p>
        </div>
        <SearchForm />
      </header>
    </>
  );
};

export default Header;
