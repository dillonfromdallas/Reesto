import { Restaurant } from "../../Models/Restaurant";

export default function(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "QUERY":
      console.log(action.payload);
      return { ...state, list: action.payload };
    case "SET_CURRENT":
      const payload = action.payload.length ? action.payload : state.list;
      return { ...state, current: payload };
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
