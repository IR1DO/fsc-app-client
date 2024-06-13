import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FileUploader from '../components/FileUploader';
import { useEffect, useState } from 'react';
import { UploadWidgetResult } from '@bytescale/upload-widget';
import { UrlBuilder } from '@bytescale/sdk';
import { extractUrl } from '../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import { runAxiosAsync } from '../utils/runAxiosAsync';
import axios from 'axios';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import { Post, emptyPost } from '../utils/types';

const UpdatePost = () => {
  const { id } = useParams();
  const { authState } = useAuth();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState('');
  const [formData, setFormData] = useState(emptyPost);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const res = await runAxiosAsync<Post>(
        axios.get(`/api/post/detail/${id}`)
      );
      if (res) {
        setFormData({ ...res });
        setFile(res.image);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  const handleFileUpload = (files: UploadWidgetResult[]) => {
    const file = files[0];
    const { filePath, accountId } = file;
    // Build an image transformation URL for the uploaded file.
    // Remove 'options' to get the URL to the original file:
    const fileUrl = UrlBuilder.url({
      filePath,
      accountId,
      options: {
        transformation: 'preset',
        transformationPreset: 'thumbnail',
      },
    });
    setFile(fileUrl);
  };

  const handleFileRemove = () => {
    setFile('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setBusy(true);
    const res = await runAxiosAsync<{ message: string; postId: string }>(
      axios.patch(
        `/api/post/update/${id}`,
        { ...formData, image: file },
        {
          headers: {
            Authorization: `Bearer ${authState.profile?.accessToken}`,
          },
        }
      )
    );
    if (res) {
      toast.success('Post update successful.');
      navigate(`/post/${id}`);
    }
    setBusy(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-3 w-9/12 mx-auto min-h-screen '>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update a post</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <input
            id='title'
            type='text'
            placeholder='Title'
            className='input input-bordered flex-1'
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                title: e.target.value,
              }));
            }}
            value={formData.title}
          />

          <select
            className='select select-bordered w-full max-w-xs text-base'
            onChange={(e) => {
              setFormData((prevFormData) => ({
                ...prevFormData,
                category: e.target.value,
              }));
            }}
            value={formData.category}
          >
            <option selected value='UNCATEGORIZED'>
              Select a category
            </option>
            <option value='ANNOUNCEMENTS'>Announcements</option>
            <option value='HOMEWORK'>Homework</option>
            <option value='EVENTS'>Events</option>
            <option value='DISCUSSION'>Discussion</option>
            <option value='QUESTIONS'>Questions</option>
            <option value='RESOURCES'>Resources</option>
            <option value='NEWS'>News</option>
          </select>
        </div>

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3 overflow-x-auto'>
          <div className='flex gap-4 items-center'>
            <FileUploader
              onComplete={handleFileUpload}
              fileName={file ? extractUrl(file) : ''}
            />

            {file ? (
              <a
                href={file}
                target='_blank'
                className='text-gray-300 hover:text-cyan-500 hover:underline'
              >
                Preview
              </a>
            ) : null}
          </div>

          <button
            className='btn btn-primary'
            disabled={!file}
            onClick={handleFileRemove}
          >
            Remove
          </button>
        </div>

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12 [&_.ql-editor]:font-mono [&_.ql-editor]:text-lg [&_.ql-editor::before]:text-base-content [&_.ql-picker]:text-base-content [&_.ql-picker-options]:bg-base-100 [&_.ql-toolbar]:bg-base-100 [&_h1]:pb-4 [&_h1]:pt-12 [&_h1]:leading-normal [&_h2]:pb-2 [&_h2]:pt-9 [&_h3]:pb-2 [&_h3]:pt-6'
          onChange={(value) => {
            setFormData((prevFormData) => ({
              ...prevFormData,
              content: value,
            }));
          }}
          value={formData.content}
        />

        <button
          className='btn text-lg font-semibold bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:opacity-90'
          type='submit'
          disabled={authState.pending}
        >
          {busy ? (
            <>
              <span className='loading loading-spinner loading-md'></span>
              <span className='pl-3'>Loading...</span>
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
