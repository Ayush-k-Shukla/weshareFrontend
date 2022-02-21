import * as api from '../api/index';

export const signIn =
  ({ formData, navigate }) =>
  async (dispatch) => {
    try {
      //   dispatch({ type: 'AUTH', payload: formData });
    } catch (e) {
      console.log(e);
    }
  };

export const signUp =
  ({ formData, navigate }) =>
  async (dispatch) => {
    try {
      //   const { data } = await api.likePost(id);
      //   dispatch({ type: 'LIKE', payload: data });
    } catch (e) {
      console.log(e);
    }
  };
