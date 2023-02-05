import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UsersContext';

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios
      .post('http://localhost:8080/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status == 200) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='w-50 mx-auto p-5 my-5 shadow'>
      <h2 className='h1  text-center my-5'>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          ref={emailRef}
          type='email'
          placeholder='Email'
          className='form-control mb-3'
        />
        <input
          ref={passwordRef}
          type='password'
          placeholder='Password'
          className='form-control mb-3'
        />
        <button
          type='submit'
          className='btn btn-primary'
        >
          SEND
        </button>
      </form>
    </div>
  );
};
