import * as api from '../api/index';

export const signIn = (formData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type: 'AUTH', payload: data });
    navigate('/');
  } catch (e) {
    console.log(e);
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  try {
    console.log(`in axtin : ${formData.firstName}`);
    const { data } = await api.signUp(formData);
    dispatch({ type: 'AUTH', data });
    navigate('/');
  } catch (e) {
    console.log(e);
  }
};
