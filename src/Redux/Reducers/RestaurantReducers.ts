import { Restaurant } from "../../Models/Restaurant";
import getRestaurants from "./getRestaurants";

export default function(state = initialState, action: ActionBase) {
  switch (action.type) {
    case "GET":
      return getRestaurants();
    default:
      return state;
  }
}

export interface ActionBase {
  type: string;
  payload: any;
}

export interface InitialState {
  restaurants: Restaurant[];
}

var initialState: InitialState = {
  restaurants: []
};
