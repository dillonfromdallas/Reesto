import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import { setCurrent } from "../Redux/actions";
import { Restaurant } from "../Models/Restaurant";

const Div = styled.div({
  display: "flex",
  flexDirection: "row"
});

export default function() {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootStateOrAny) => state.restaurants);

  const [stateFilter, setStateFilter] = useState("");
  const [displayStates, setDisplayStates] = useState(false);
  const [genreFilter, setGenreFilter] = useState("");
  const [displayGenre, setDisplayGenre] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  // Create string[] of unique State values
  let states: string[] = Array.from(
    new Set(list.map((e: Restaurant) => e.state))
  );
  states = states.sort((a: string, b: string) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Create string[] of unique Genre values
  let genres: string[] = Array.from(
    new Set([].concat.apply([], list.map((e: Restaurant) => e.genre)))
  );
  genres = genres.sort((a: string, b: string) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );

  // Handle filtering

  useEffect(() => {
    dispatch({ type: "SET_SEARCH_FILTER", payload: searchFilter });
  }, [searchFilter]);

  return (
    <Div>
      <input
        placeholder="Busca"
        type="text"
        onChange={e => setSearchFilter(e.target.value)}
      />
      <button onClick={() => setDisplayStates(!displayStates)}>State</button>
      <button onClick={() => setDisplayGenre(!displayGenre)}>Genre</button>
    </Div>
  );
}

// const setState = (e: any) => {
//     e.preventDefault();
//     console.log(e.target.value);
//     const filtered = list.filter((each: Restaurant) => {
//       if (
//         each.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
//         each.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
//         each.genre
//           .join(",")
//           .toLowerCase()
//           .includes(e.target.value.toLowerCase()) ||
//         each.state.toLowerCase().includes(e.target.value.toLowerCase())
//       )
//         return each;
//     });
//     dispatch(setCurrent(filtered));
//     setSearchFilter(filtered);
//   };
