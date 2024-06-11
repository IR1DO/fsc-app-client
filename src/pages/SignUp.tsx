import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Backpack } from 'lucide-react';

// TODO front end validation
const SignUp = () => {
  const { authState, signUp } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [role, setRole] = useState('STUDENT');
  const { username, email, password } = formData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSelectRole = (r: string) => {
    setRole(r);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ ...formData, role });
  };

  return (
    <div className='min-h-screen pt-20 bg-base-200'>
      <div className='flex p-5 max-w-3xl mx-auto flex-col items-center md:flex-row  gap-5'>
        {/* left */}
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-6xl font-msz'>
            <div className='flex flex-row items-center gap-6 ml-2'>
              <Backpack className='scale-[2]' />
              家校通
            </div>
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
                    <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z' />
                  </svg>
                  <input
                    id='username'
                    type='text'
                    className='grow'
                    placeholder='Username'
                    value={username}
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
              <div className='join join-vertical lg:join-horizontal'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectRole('ADMIN');
                  }}
                  className={`btn join-item bg-base-200 text-rose-400 lg:w-1/3 ${
                    role === 'ADMIN' ? 'bg-base-300' : ''
                  }`}
                >
                  ADMIN
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectRole('TEACHER');
                  }}
                  className={`btn join-item bg-base-200 text-cyan-600 lg:w-1/3 ${
                    role === 'TEACHER' ? 'bg-base-300' : ''
                  }`}
                >
                  TEACHER
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleSelectRole('STUDENT');
                  }}
                  className={`btn join-item bg-base-200 text-lime-600 lg:w-1/3 ${
                    role === 'STUDENT' ? 'bg-base-300' : ''
                  }`}
                >
                  STUDENT
                </button>
              </div>
              <button
                className='btn font-semibold bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:opacity-90'
                type='submit'
                disabled={authState.pending}
              >
                {authState.pending ? (
                  <>
                    <span className='loading loading-spinner loading-md'></span>
                    <span className='pl-3'>Loading...</span>
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/sign-in' className='text-blue-500'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
