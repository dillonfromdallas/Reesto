import { Restaurant } from "../../Models/Restaurant";

export default function(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "GET":
      console.log(action.payload);
      return { ...state, list: action.payload };
    default:
      return state;
  }
}

export interface InitialState {
  list: Restaurant[];
}

var initialState: InitialState = {
  list: []
};
