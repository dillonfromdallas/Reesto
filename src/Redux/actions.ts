import { action } from "typesafe-actions";

export enum actionTypes {
  GET = "GET"
}

export const restaurantActions = {
  get: () => action(actionTypes.GET, {})
};
