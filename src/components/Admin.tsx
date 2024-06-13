import { useEffect, useState } from 'react';
import { Post } from '../utils/types';
import axios from 'axios';
import { runAxiosAsync } from '../utils/runAxiosAsync';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { toast } from 'react-toastify';

const Admin = () => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [postId, setPostId] = useState('');
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await runAxiosAsync<Post[]>(axios.get('/api/post/get-posts'));
      if (res) {
        setPosts(res);

        if (res.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } else {
        return;
      }
    };

    fetchPosts();
  }, []);

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

  const handleDelete = async () => {
    const res = await runAxiosAsync<{ message: string; postId: string }>(
      axios.delete(`/api/post/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${authState.profile?.accessToken}`,
        },
      })
    );
    if (res) {
      toast.success('Post delete successful.');
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex flex-col md:flex-row w-full'>
        <div className='overflow-x-auto w-full my-2'>
          <table className='table table-md table-pin-rows table-pin-cols'>
            <thead>
              <tr>
                <th></th>
                <td>Date Updated</td>
                <td>ID</td>
                <td>Title</td>
                <td>Category</td>
                <td>Author</td>
                <td>Delete</td>
                <td>Edit</td>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {posts &&
                posts.map((post, index) => (
                  <tr key={post.id} className='hover:bg-base-300'>
                    <th>{index + 1}</th>
                    <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>
                      <div className='text-center px-2 py-1 rounded-full bg-teal-500 text-xs text-white'>
                        {post.category}
                      </div>
                    </td>
                    <td>{post.authorId}</td>
                    <td>
                      <label
                        htmlFor='delete_modal'
                        className='text-red-500 hover:underline hover:cursor-pointer'
                        onClick={() => {
                          setPostId(post.id);
                        }}
                      >
                        Delete
                      </label>
                    </td>
                    <td>
                      <Link
                        to={`/update-post/${post.id}`}
                        className='text-cyan-700 hover:underline hover:cursor-pointer'
                      >
                        Edit
                      </Link>
                    </td>
                    <th>{index + 1}</th>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <td>Date Updated</td>
                <td>ID</td>
                <td>Title</td>
                <td>Category</td>
                <td>Author</td>
                <td>Delete</td>
                <td>Edit</td>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      {showMore && (
        <button
          className='text-teal-500 hover:underline mb-4'
          onClick={handleShowMore}
        >
          Show More
        </button>
      )}

      <input type='checkbox' id='delete_modal' className='modal-toggle' />
      <div className='modal shadow-lg' role='dialog'>
        <div className='modal-box'>
          <h3 className='font-bold text-lg'>Are you sure?</h3>
          <p className='py-4'>This action cannot be undone!</p>
          <div className='modal-action flex justify-between'>
            <label
              htmlFor='delete_modal'
              className='btn'
              onClick={() => {
                setPostId('');
              }}
            >
              Cancel
            </label>
            <label
              htmlFor='delete_modal'
              className='btn btn-error text-white'
              onClick={handleDelete}
            >
              Yes, I'm sure
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
