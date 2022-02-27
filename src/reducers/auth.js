const authReducer = (state = { authData: null }, action) => {
  //always must return from switch case
  switch (action.type) {
    case 'AUTH':
      console.log(`inside reduces : ${action.data}`);
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };
    case 'LOGOUT':
      localStorage.clear();
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
