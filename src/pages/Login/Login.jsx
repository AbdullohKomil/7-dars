import axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UsersContext';
import * as Yup from 'yup';

export const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('invalid email format')
      .required('Required email !!!'),
    password: Yup.string()
      .min(3, 'Password must be longer 3 characters')
      .max(8, 'Password must be last 8 characters')
      .required('Required password !!!'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    axios
      .post('http://localhost:8080/login', values)
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
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <label htmlFor='email'>Email</label>
            <Field
              type='email'
              placeholder='Email'
              className='form-control mb-3'
              name='email'
              id='email'
            />
            <span className='text-danger'>
              <ErrorMessage name='email' />
            </span>
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <Field
              id='password'
              type='password'
              placeholder='Password'
              className='form-control mb-3'
              name='password'
            />
            <span className='text-danger'>
              <ErrorMessage name='password' />
            </span>
          </div>
          <button
            type='submit'
            className='btn btn-primary'
          >
            SEND
          </button>
        </Form>
      </Formik>
    </div>
  );
};
