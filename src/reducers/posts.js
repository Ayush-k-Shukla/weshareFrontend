const reducers = (
  state = { isLoading: true, posts: [], url: 'gfhdf' },
  action
) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case 'FETCH_ALL':
      return {
        ...state,
        posts: action.payload.data.data,
        currentPage: action.payload.data.currentPage, //change .data
        numberOfPages: action.payload.data.numberOfPages,
      };
    case 'FETCH_ONE':
      return { ...state, post: action.payload };
    case 'FETCH_BY_SEARCH':
      return { ...state, posts: action.payload.data.data };
    case 'CREATE':
      return [...state, action.payload];
    case 'UPDATE':
    case 'LIKE':
      return {
        ...state,
        posts: state.posts?.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case 'COMMENT':
      return {
        ...state,
        posts: state.posts?.data?.data?.map((post) => {
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    case 'DELETE':
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case 'UPLOAD':
      return {
        url: action.payload.data,
      };
    default:
      return state;
  }
};
export default reducers;
