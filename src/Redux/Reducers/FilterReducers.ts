import { Restaurant } from "../../Models/Restaurant";

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
    case "SET_TIME_FILTER":
      return { ...state, timeFilter: action.payload };
    case "RESET_TIME_FILTER":
      return { ...state, timeFilter: 0 };
    default:
      return state;
  }
}

interface InitialState {
  searchFilter: string;
  stateFilter: string;
  genreFilter: string;
  timeFilter: 0 | Date;
  list: Restaurant[];
}
var initialState: InitialState = {
  searchFilter: "",
  stateFilter: "",
  genreFilter: "",
  timeFilter: 0,
  list: [] as Restaurant[]
};
