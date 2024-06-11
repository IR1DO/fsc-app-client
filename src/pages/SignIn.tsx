import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { updateAuthState } from '../app/auth/authSlice';
import { useDispatch } from 'react-redux';

// TODO front end validation
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData); // DEBUG

    try {
      dispatch(updateAuthState({ profile: null, pending: true }));
      const res = await axios.post('/api/auth/sign-in', formData);

      if (res) {
        dispatch(updateAuthState({ profile: res.data, pending: false }));
        navigate('/');
        console.log('Sign In Successfully.');
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='min-h-screen pt-20 bg-base-200'>
      <div className='flex p-5 max-w-3xl mx-auto flex-col items-center md:flex-row gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-6xl font-msz'>
            家校通
          </Link>
          <p className='text-md my-5'>
            You can sign in with your email and password.
          </p>
        </div>

        {/* right */}
        <div className='flex-1'>
          <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 p-10'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <label className='input input-bordered flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='w-4 h-4 opacity-70'
                  >
                    <path d='M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z' />
                    <path d='M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z' />
                  </svg>
                  <input
                    id='email'
                    type='text'
                    className='grow'
                    placeholder='Email'
                    value={email}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div>
                <label className='input input-bordered flex items-center gap-2'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 16 16'
                    fill='currentColor'
                    className='w-4 h-4 opacity-70'
                  >
                    <path
                      fillRule='evenodd'
                      d='M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z'
                      clipRule='evenodd'
                    />
                  </svg>
                  <input
                    id='password'
                    type='password'
                    className='grow'
                    placeholder='password'
                    value={password}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <button
                className='btn font-semibold bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:opacity-90'
                type='submit'
                // disabled={loading}
              >
                {/* {loading ? (
                  <>
                    <Spinner size='sm' />
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign In'
                )} */}
                Sign In
              </button>
            </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Don't have an account?</span>
              <Link to='/sign-up' className='text-blue-500'>
                Sign Up
              </Link>
            </div>

            {/* {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
