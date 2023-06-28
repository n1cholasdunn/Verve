const formReducer = (state, action) => {
  switch (action.type) {
    case 'HANDLE INPUT TEXT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    case 'HANDLE INPUT WEIGHT':
      return {
        ...state,
        [action.field]: action.payload,
      };
    default:
      return state;
  }
};
