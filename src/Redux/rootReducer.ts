import { combineReducers } from "redux";

import restaurants from "./Reducers/RestaurantReducers";
import filters from "./Reducers/FilterReducers";

export default combineReducers({ restaurants, filters });
