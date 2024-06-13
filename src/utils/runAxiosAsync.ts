import { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

export const runAxiosAsync = async <T>(
  promise: Promise<AxiosResponse<T>>
): Promise<T | null> => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    let message = (error as any).message;
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response) {
        if (response.data) {
          message = response.data.message;
        }
      }
    }

    toast.error(message);
    return null;
  }
};
