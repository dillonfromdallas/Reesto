import shapeData from "../Helpers/shapeData";
import { Restaurant } from "../Models/Restaurant";

const base = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
const key = "q3MNxtfep8Gt";
export const getData = () => {
  return (dispatch: any) => {
    fetch(base, { headers: { Authorization: `Api-Key ${key}` } })
      .then(data => data.json())
      .then(data => dispatch({ type: "QUERY", payload: shapeData(data) }));
  };
};

export const setCurrent = (list: Restaurant[] = []) => {
  return (dispatch: any) => {
    dispatch({ type: "SET_CURRENT", payload: list });
  };
};
