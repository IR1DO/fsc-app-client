import { UploadButton } from '@bytescale/upload-widget-react';
import FileInput from './FileInput';
import { FC } from 'react';

// -----
// Configuration:
// https://www.bytescale.com/docs/upload-widget#configuration
// -----
const options = {
  apiKey: 'free', // Get API key: https://www.bytescale.com/get-started
  maxFileCount: 1,
};

interface Props {
  onComplete?: any;
  fileName: string;
}

const FileUploader: FC<Props> = ({ onComplete, fileName }) => (
  <UploadButton options={options} onComplete={onComplete}>
    {({ onClick }) => <FileInput onClick={onClick} fileName={fileName} />}
  </UploadButton>
);

export default FileUploader;
