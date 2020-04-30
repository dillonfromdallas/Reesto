export default function(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "SET_SEARCH_FILTER":
      return { ...state, searchFilter: action.payload };
    case "SET_STATE_FILTER":
      return { ...state, stateFilter: action.payload };
    case "SET_GENRE_FILTER":
      return { ...state, genreFilter: action.payload };
    default:
      return state;
  }
}

var initialState = {
  searchFilter: "",
  stateFilter: "",
  genreFilter: "",
  list: []
};
