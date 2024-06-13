import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='flex flex-col gap-6 p-12 lg:p-24 max-w-6xl mx-auto'>
        <h1 className='text-3xl font-bold lg:text-6xl'>Welcome</h1>
        <p className='text-gray-500 text-base'>
          Thank you for joining us on Families School Communication, your
          ultimate destination for enhancing communication between families and
          schools! Whether you're a teacher, parent, or student, Families School
          Communication offers a vibrant community and a wealth of resources to
          support you in fostering a stronger connection and collaboration in
          education.
        </p>

        <Link
          to='/posts'
          className='text-sm text-teal-500 font-bold hover:underline'
        >
          View all posts
        </Link>
      </div>
    </div>
  );
};

export default Home;
