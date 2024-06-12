import { BasicMouseEvent } from '@bytescale/upload-widget-react/dist/BasicMouseEvent';
import { FC } from 'react';

interface Props {
  onClick?(event: BasicMouseEvent): void;
  fileName: string;
}

const FileInput: FC<Props> = ({ onClick, fileName }) => {
  return (
    <>
      <button
        onClick={onClick}
        className='rounded-lg border-2 border-neutral bg-base-100 flex overflow-hidden'
      >
        <span className='font-bold px-4 py-3 bg-neutral text-neutral-content'>
          CHOOSE FILE
        </span>

        <span className='max-w-48 px-4 py-3 hover:cursor-default text-start truncate'>
          {fileName || 'No file chosen'}
        </span>
      </button>
    </>
  );
};

export default FileInput;
