import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UsersContext';

export const PrivateHeader = () => {
  const { user,setUser } = useContext(UserContext)
  const { setToken } = useContext(AuthContext)
  const navigate = useNavigate()
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
          <Link
            
            to='/posts'
            className='ms-3 text-white text-decoration-none'
          >
            Posts
          </Link>
          <Link
            
            to='/users'
            className='ms-3 text-white text-decoration-none'
          >
            Users
          </Link>
        </div>
      </div>
    </header>
  );
};
