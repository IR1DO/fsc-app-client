import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
  return (
    <div className='p-3 w-9/12 mx-auto min-h-screen '>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a post</h1>

      <form className='flex flex-col gap-4'>
        <div className='flex flex-col gap-4 sm:flex-row'>
          <input
            type='text'
            placeholder='Title'
            className='input input-bordered flex-1'
          />

          <select className='select select-bordered w-full max-w-xs text-base'>
            <option selected value='uncategorized'>
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

        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <input
            type='file'
            className='file-input file-input-bordered w-full max-w-xs'
          />
          <button className='btn btn-primary'>Upload</button>
        </div>

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12 [&_.ql-editor]:font-mono [&_.ql-editor]:text-lg [&_.ql-editor::before]:text-base-content [&_.ql-picker]:text-base-content [&_.ql-picker-options]:bg-base-100 [&_.ql-toolbar]:bg-base-100 [&_h1]:pb-4 [&_h1]:pt-12 [&_h1]:leading-normal [&_h2]:pb-2 [&_h2]:pt-9 [&_h3]:pb-2 [&_h3]:pt-6'
          // onChange={(value) => {
          //   setFormData((prevFormData) => ({
          //     ...prevFormData,
          //     content: value,
          //   }));
          // }}
        />

        <button
          className='btn text-lg font-semibold bg-gradient-to-r from-indigo-500
                via-purple-500 to-pink-500 text-white hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 hover:opacity-90'
          type='submit'
          // disabled={authState.pending}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
