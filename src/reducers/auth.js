const authReducer = (state = [], action) => {
  //always must return from switch case
  switch (action.type) {
    case 'AUTH':
      console.log(action?.payload);
      return state;
    default:
      return state;
  }
};
export default authReducer;
