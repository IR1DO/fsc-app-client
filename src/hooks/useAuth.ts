import { useDispatch, useSelector } from 'react-redux';
import { getAuthState, updateAuthState } from '../app/auth/authSlice';
import { runAxiosAsync } from '../utils/runAxiosAsync';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

type SignInInfo = {
  email: string;
  password: string;
};

type SignUpInfo = {
  username: string;
  email: string;
  password: string;
  role: string;
};

export interface SignInRes {
  profile: {
    id: string;
    username: string;
    email: string;
    avatar: string;
    role: string;
  };
}

const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authState = useSelector(getAuthState);
  const loggedIn = authState.profile ? true : false;

  const signIn = async (signInInfo: SignInInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }));
    const res = await runAxiosAsync<SignInRes>(
      axios.post('/api/auth/sign-in', signInInfo)
    );
    if (res) {
      dispatch(
        updateAuthState({
          profile: res.profile,
          pending: false,
        })
      );
      toast.success('Sign in successful.');
      navigate('/');
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  const signUp = async (signUpInfo: SignUpInfo) => {
    dispatch(updateAuthState({ profile: null, pending: true }));
    const res = await runAxiosAsync<SignInRes>(
      axios.post('/api/auth/sign-up', signUpInfo)
    );
    if (res) {
      dispatch(updateAuthState({ profile: null, pending: false }));
      toast.success('Sign up successful.');
      signIn(signUpInfo);
    } else {
      dispatch(updateAuthState({ profile: null, pending: false }));
    }
  };

  const signOut = async () => {
    const res = await runAxiosAsync<{ message: string }>(
      axios.post('/api/auth/sign-out')
    );
    if (res) {
      dispatch(
        updateAuthState({
          profile: null,
          pending: false,
        })
      );
      toast.success('Sign out successful.');
      navigate('/');
    }
  };

  return { authState, loggedIn, signIn, signUp, signOut };
};

export default useAuth;
