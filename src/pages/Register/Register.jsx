import axios from 'axios';
import React, { useContext, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UsersContext';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    axios
      .post('http://localhost:8080/register', values)
      .then((data) => {
        setToken(data.data.accessToken);
        setUser(data.data.user);
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const validationSchema = Yup.object({
    first_name: Yup.string().required('Required first name !!!'),
    last_name: Yup.string().required('Required last name !!!'),
    email: Yup.string()
      .email('invalid email format')
      .required('Required email !!!'),
    password: Yup.string()
      .min(3, 'Password must be longer 3 characters')
      .max(8, 'Password must be last 8 characters')
      .required('Required password !!!'),
  });

  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  return (
    <div className='w-50 mx-auto p-5 my-5 shadow'>
      <h2 className='h1  text-center my-5'>Register</h2>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form>
          <div>
            <label htmlFor='first_name'>First name</label>
            <Field
              type='text'
              placeholder='First name'
              className='form-control '
              name='first_name'
              id='first_name'
            />
            <span className='text-danger'>
              <ErrorMessage name='first_name' />
            </span>
          </div>
          <div>
            <label htmlFor='last_name'>Last name</label>
            <Field
              type='text'
              placeholder='Last name'
              className='form-control '
              name='last_name'
              id='last_name'
            />
            <span className='text-danger'>
              <ErrorMessage name='last_name' />
            </span>
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <Field
              type='email'
              placeholder='Email'
              className='form-control '
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
              type='password'
              placeholder='Password'
              className='form-control '
              name='password'
              id='password'
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
