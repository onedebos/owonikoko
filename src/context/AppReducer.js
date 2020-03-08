export default (state, action) => {
  switch (action.type) {
    case "GET_ACCOUNTS":
      return {
        ...state,
        loading: false,
        accounts: action.payload
      };
    case "DELETE_ACCOUNT":
      return {
        ...state,
        accounts: state.accounts.filter(
          account => account.id !== action.payload
        )
      };
    case "ADD_ACCOUNT":
      return {
        ...state,
        accounts: [action.payload, ...state.accounts]
      };
    case "STORE_USER":
      return {
        ...state,
        user: action.payload
      };

    default:
      return state;
  }
};
