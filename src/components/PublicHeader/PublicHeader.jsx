import React from 'react';
import { Link } from 'react-router-dom';

export const PublicHeader = () => {
  return (
      <header className='bg-dark py-2'>
        <div className='container'>
          <div className='d-flex align-items-center'>
            <Link
              className='fs-4 text-white text-decoration-none'
              to={'/'}
            >
              LOGO
            </Link>
            <Link to='/login' className='ms-auto btn btn-outline-primary' >SIGN IN</Link>
            <Link to='/register' className='ms-3 btn btn-outline-success' >SIGN UP</Link>
          </div>
        </div>
      </header>
  );
};
