import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiSun, FiMoon } from 'react-icons/fi';
import { BookContext, actionTypes } from '../context/Context';

const Navbar = () => {
  const { state, dispatch } = useContext(BookContext);
  const { isLightMode } = state;

  const handleThemeToggle = () => {
    dispatch({ type: actionTypes.SET_LIGHT_MODE, payload: !isLightMode });
  };

  return (
    <>
      <nav>
        <div className='flex justify-evenly py-2 font-semibold text-lg text-purple-600 bg-gray-200'>
          <h1>BOOKHUB</h1>
          <Link to='/'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
          <button
            onClick={handleThemeToggle}
            className='mr-4 p-2 rounded-full'
            style={{
              backgroundColor: isLightMode ? '#fff' : '#333',
              color: isLightMode ? '#333' : '#fff',
            }}
          >
            {isLightMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
