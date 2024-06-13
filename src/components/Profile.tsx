import useAuth from '../hooks/useAuth';

const Profile = () => {
  const { authState } = useAuth();

  return (
    <div className='max-w-lg mx-auto p-3 w-full flex flex-col items-center'>
      <div className='bg-base-200 px-16 pt-7 pb-10 rounded-lg shadow-md mt-16 flex flex-col items-center'>
        <h1 className='mb-7 font-semibold text-3xl'>Profile</h1>
        <div className='avatar'>
          <div className='w-28 rounded-full object-cover border-8 border-gray-400'>
            <img
              src={
                authState.profile?.avatar ||
                'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/768px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'
              }
            />
          </div>
        </div>
        <div className='mt-4 badge badge-neutral block'>
          {authState.profile?.role}
        </div>
        <div className='text-xl font-bold mt-2'>
          {authState.profile?.username}
        </div>
        <div>{authState.profile?.email}</div>
      </div>
    </div>
  );
};

export default Profile;
