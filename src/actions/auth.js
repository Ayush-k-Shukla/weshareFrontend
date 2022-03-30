import * as api from '../api/index';

import { toast } from 'react-hot-toast';

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
    toast.success('User logged in successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    if (e.response.status === 400)
      toast.error('Email or Password is incorrect', {
        icon: '👏',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
          fontFamily: 'revert',
        },
      });
    console.log(e);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    // console.log(`in axtin : ${formData.firstName}`);

    const { data } = await api.signUp(formData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
    toast.success('User logged in successfully!', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        fontFamily: 'revert',
      },
    });
  } catch (e) {
    console.log(e);
  }
};
