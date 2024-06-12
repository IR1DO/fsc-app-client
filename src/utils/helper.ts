/* eslint-disable */

export const extractUrl = (url: string) => {
  const match = url.match(/\/([^\/]+\.[^\/]+)$/);
  const fileName = match ? match[1] : 'Unknown file';
  return fileName;
};
