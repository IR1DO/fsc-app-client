import ThemeController from './ThemeController';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { themeChange } from 'theme-change';
import useAuth from '../hooks/useAuth';
import { Backpack } from 'lucide-react';

const Header = () => {
  const { authState, loggedIn, signOut } = useAuth();

  useEffect(() => {
    themeChange(false);
  }, []);

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
              <Link to='/' className='text-base font-semibold'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/posts' className='text-base font-semibold'>
                Posts
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-base font-semibold'>
                About
              </Link>
            </li>
          </ul>
        </div>
        <Link to='/' className='btn btn-ghost text-2xl font-msz'>
          <Backpack />
          家校通
        </Link>
      </div>
      <div className='navbar-center hidden lg:flex'>
        <ul className='menu menu-horizontal px-1 text-lg gap-10'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/posts'>Posts</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>

      <div className='navbar-end gap-2'>
        <ThemeController className='w-7 h-7' />
        {loggedIn ? (
          <div className='dropdown dropdown-bottom dropdown-end'>
            <div tabIndex={0} role='button' className='m-1 btn'>
              <div className='avatar'>
                <div className='w-8 h-8 rounded-full'>
                  <img
                    src={
                      authState.profile?.avatar ||
                      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'
                    }
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52'
            >
              <li>
                <div className='flex flex-col items-start justify-center gap-0.5'>
                  <div className='font-medium'>
                    @{authState.profile?.username}
                  </div>
                  <div className='font-semibold truncate'>
                    {authState.profile?.email}
                  </div>
                </div>
              </li>
              <div className='divider my-[-0.1rem]'></div>
              <li>
                <Link
                  to={'/dashboard?tab=profile'}
                  className='text-sm font-semibold'
                >
                  Profile
                </Link>
              </li>
              <li>
                <div onClick={signOut} className='text-sm font-semibold'>
                  Sign Out
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <Link to='/sign-in'>
            <button className='btn btn-primary'>Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
