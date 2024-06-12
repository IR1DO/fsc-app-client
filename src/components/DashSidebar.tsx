import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { CircleGauge, LogOut, SquarePen, User } from 'lucide-react';

export default function DashSidebar() {
  const { authState, signOut } = useAuth();
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='drawer-open'>
      <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
      <div className='drawer-side shadow-md w-full md:w-64 h-fit md:min-h-screen'>
        <ul className='menu p-4 bg-base-200 text-base-content w-full md:w-64 h-fit md:min-h-screen gap-2'>
          {/* Sidebar content here */}
          {authState.profile?.role === 'ADMIN' ? (
            <li>
              <Link to={'/dashboard?tab=admin'} className='text-base block'>
                <div className='flex justify-between items-center'>
                  <div className='flex gap-3'>
                    <CircleGauge />
                    <span>Admin</span>
                  </div>
                </div>
              </Link>
            </li>
          ) : null}
          <li>
            <Link
              to={'/dashboard?tab=profile'}
              className={`text-base block ${
                tab === 'profile' ? 'bg-base-300' : ''
              }`}
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                  <User />
                  <span>Profile</span>
                </div>
                <div className='badge badge-neutral font-medium'>
                  {authState.profile?.role}
                </div>
              </div>
            </Link>
          </li>
          {authState.profile?.role !== 'STUDENT' ? (
            <li>
              <Link
                to={'/dashboard?tab=create-post'}
                className={`text-base block ${
                  tab === 'create-post' ? 'bg-base-300' : ''
                }`}
              >
                <div className='flex justify-between items-center'>
                  <div className='flex gap-3'>
                    <SquarePen />
                    <span>Create Post</span>
                  </div>
                </div>
              </Link>
            </li>
          ) : null}
          <li>
            <button onClick={signOut} className='text-base block'>
              <div className='flex justify-between items-center'>
                <div className='flex gap-3'>
                  <LogOut />
                  <span>Sign Out</span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
