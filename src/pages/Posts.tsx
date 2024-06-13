import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Post } from '../utils/types';
import PostCard from '../components/PostCard';
import { runAxiosAsync } from '../utils/runAxiosAsync';
import axios from 'axios';

const Posts = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: '',
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm') || '';
    const sortFromUrl = urlParams.get('order') || '';
    const categoryFromUrl = urlParams.get('category') || '';

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      }));
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();

      const res = await runAxiosAsync<Post[]>(
        axios.get(`/api/post/get-posts?${searchQuery}`)
      );
      if (res) {
        setPosts(res);
        setLoading(false);

        if (res.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } else {
        setLoading(false);
        return;
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        searchTerm: e.target.value,
      }));
    }

    if (e.target.id === 'sort') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        sort: e.target.value,
      }));
    }

    if (e.target.id === 'category') {
      setSidebarData((prevSidebarData) => ({
        ...prevSidebarData,
        category: e.target.value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('order', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/posts?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex.toString());
    const searchQuery = urlParams.toString();

    const res = await runAxiosAsync<Post[]>(
      axios.get(`/api/post/get-posts?${searchQuery}`)
    );
    if (res) {
      setPosts((prevPost) => [...prevPost, ...res]);

      if (res.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } else {
      return;
    }
  };

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='drawer-open'>
        <input id='my-drawer-2' type='checkbox' className='drawer-toggle' />
        <div className='drawer-side shadow-md w-full md:w-64 h-fit md:min-h-screen'>
          <form onSubmit={handleSubmit} className='p-4'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>
                  Search Term:
                </label>
                <input
                  id='searchTerm'
                  type='text'
                  placeholder='Search...'
                  className='input input-bordered w-full max-w-xs text-sm'
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />
              </div>

              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>Sort:</label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => {
                    handleChange(e as any);
                  }}
                  value={sidebarData.sort}
                  id='sort'
                >
                  <option value='desc'>Latest</option>
                  <option value='asc'>Oldest</option>
                </select>
              </div>

              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>
                  Category:
                </label>
                <select
                  className='select select-bordered w-full max-w-xs'
                  onChange={(e) => {
                    handleChange(e as any);
                  }}
                  value={sidebarData.category}
                  id='category'
                >
                  <option value=''>All</option>
                  <option value='ANNOUNCEMENTS'>Announcements</option>
                  <option value='HOMEWORK'>Homework</option>
                  <option value='EVENTS'>Events</option>
                  <option value='DISCUSSION'>Discussion</option>
                  <option value='QUESTIONS'>Questions</option>
                  <option value='RESOURCES'>Resources</option>
                  <option value='NEWS'>News</option>
                </select>
              </div>

              <button
                className='btn font-semibold text-base bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:opacity-90'
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className='w-full text-center'>
        <h1 className='text-3xl font-semibold border-gray-500 p-3 mt-5'>
          Posts results:
        </h1>

        <div className='p-4 flex flex-wrap gap-4 justify-center'>
          {loading && <p className='text-xl text-gray-500'>Loading...</p>}

          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>No posts found</p>
          )}

          {!loading &&
            posts &&
            posts.map((post) => (
              <PostCard key={post.id} post={post} customize={'lg:w-[20rem]'} />
            ))}
        </div>
        {showMore && (
          <button
            className='text-teal-500 hover:underline mb-4'
            onClick={handleShowMore}
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default Posts;
