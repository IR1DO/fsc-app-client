import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { runAxiosAsync } from '../utils/runAxiosAsync';
import axios from 'axios';
import PostSkeleton from './PostSkeleton';

type Post = {
  id: string;
  title: string;
  category: string;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

interface PostRes {
  post: Post;
}

const emptyPost: Post = {
  id: '',
  title: '',
  category: '',
  content: '',
  image: '',
  createdAt: new Date(0),
  updatedAt: new Date(0),
  authorId: '',
};

const PostPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<Post>(emptyPost);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await runAxiosAsync<PostRes>(axios.get(`/api/post/${id}`));
      if (res) {
        setPost(res.post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <PostSkeleton />;
  }

  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
      <h1 className='text-4xl mt-10 p-3 text-center max-w-3xl mx-auto lg:text-5xl lg:max-w-4xl font-serif'>
        {post && post.title}
      </h1>

      <div className='self-center mt-5 text-base text-white bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 rounded-full shadow-md'>
        {post && post.category.toLocaleLowerCase()}
      </div>

      {post.image !== '' && (
        <div className='bg-gray-500 mt-10 self-center bg-cover bg-center'>
          <img src={post && post.image} alt={post && post.title} />
        </div>
      )}

      <div className='flex justify-between py-3 border-b border-slate-500 mx-auto w-[90%]'>
        <span>
          updated at: {post && new Date(post.updatedAt).toLocaleDateString()}
        </span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className='py-3 w-[90%] mx-auto post-content'
      />

      <hr className='mt-5' />
    </main>
  );
};

export default PostPage;
