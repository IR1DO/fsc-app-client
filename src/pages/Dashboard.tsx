import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import Profile from '../components/Profile';
import CreatePost from '../components/CreatePost';
import useAuth from '../hooks/useAuth';
import DeniedPage from './DeniedPage';
import Admin from '../components/Admin';

const Dashboard = () => {
  const location = useLocation();
  const { authState } = useAuth();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      {/* Sidebar */}
      <DashSidebar />

      {/* admin... */}
      {tab === 'admin' &&
        (authState.profile?.role === 'ADMIN' ? <Admin /> : <DeniedPage />)}

      {/* profile... */}
      {tab === 'profile' && <Profile />}

      {/* create-post... */}
      {tab === 'create-post' &&
        (authState.profile?.role !== 'STUDENT' ? (
          <CreatePost />
        ) : (
          <DeniedPage />
        ))}
    </div>
  );
};

export default Dashboard;
