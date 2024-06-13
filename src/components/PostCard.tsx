import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  post: any;
  customize: any;
}

const PostCard: FC<Props> = ({ post, customize }) => {
  return (
    <div
      className={`${customize} w-80 sm:w-[30rem] group mb-2 flex flex-col self-center shadow-md rounded-md overflow-hidden bg-base-100`}
    >
      <Link to={`/post/${post.id}`}>
        <div className='overflow-hidden bg-gray-500 group-hover:opacity-[.85] transition-all'>
          <img
            src={
              post.image ||
              'https://salonlfc.com/wp-content/uploads/2018/01/image-not-found-1-scaled-1150x647.png'
            }
            alt={post.title}
            className='w-full'
          />
        </div>
      </Link>

      <div className='p-3 bg-base-300 text-lg md:text-sm md:h-16 line-clamp-2'>
        <span className='italic font-bold text-orange-700'>
          {post.category.toUpperCase()}
          {' / '}
        </span>
        <span className='font-semibold'>{post.title}</span>
      </div>
    </div>
  );
};

export default PostCard;
