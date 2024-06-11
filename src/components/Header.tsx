import ThemeController from './ThemeController';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { themeChange } from 'theme-change';
import { getAuthState } from '../app/auth/authSlice';

const Header = () => {
  useEffect(() => {
    themeChange(false);
  }, []);

  const authState = useSelector(getAuthState);

  useEffect(() => {
    console.log('authState: ', authState);
  }, [authState]);

  return (
    <div className='navbar bg-base-100 shadow-md'>
      <div className='navbar-start'>
        <div className='dropdown'>
          <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-5 w-5'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h8m-8 6h16'
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
          >
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/teachers'>Teachers</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost text-2xl font-msz'>
          家校通
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 text-lg gap-10'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/teachers'>Teachers</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>
      <div className='navbar-end gap-2'>
        <ThemeController className='w-7 h-7' />
        <Link to='/sign-in'>
          <button className='btn btn-primary'>{'Sign In'}</button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
