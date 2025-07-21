const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTH":
      return { ...state, token: action.payload.token, user: action.payload.user };
    case "CLEAR_AUTH":
      return { ...state, token: null, user: null };
    default:
      return state;
  }
};

export default reducer;