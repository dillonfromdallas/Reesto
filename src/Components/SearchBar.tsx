import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import { setCurrent } from "../Redux/actions";
import { Restaurant } from "../Models/Restaurant";

const Div = styled.div({
  display: "flex",
  flexDirection: "column",
  maxWidth: "90%",
  flexWrap: "wrap"
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
  useEffect(() => {
    dispatch({ type: "SET_STATE_FILTER", payload: stateFilter });
  }, [stateFilter]);
  useEffect(() => {
    dispatch({ type: "SET_GENRE_FILTER", payload: genreFilter });
  }, [genreFilter]);

  const UL = styled.ul({
    display: "flex",
    flexDirection: "row",
    listStyleType: "none",
    maxWidth: "60%",
    flexWrap: "wrap",
    maxHeight: "1%"
  });

  const renderStateOptions = (states: string[]) => {
    return (
      <UL>
        {states.map(each => {
          return (
            <li>
              <button onClick={e => setStateFilter(each)}>{each}</button>
            </li>
          );
        })}
      </UL>
    );
  };
  const renderGenreOptions = (genres: string[]) => {
    return (
      <UL>
        {genres.map(each => {
          return (
            <li>
              <button onClick={e => setGenreFilter(each)}>{each}</button>
            </li>
          );
        })}
      </UL>
    );
  };

  const toggleDisplayStates = () => {
    setDisplayStates(!displayStates);
    setDisplayGenre(false);
  };

  const toggleDisplayGenre = () => {
    setDisplayGenre(!displayGenre);
    setDisplayStates(false);
  };

  const clearFilters = () => {
    setGenreFilter("");
    setStateFilter("");
    setSearchFilter("");
    setDisplayGenre(false);
    setDisplayStates(false);
  };

  var Row = styled.div({
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  });
  return (
    <Div>
      <Row>
        <input
          placeholder="Busca"
          type="text"
          onChange={e => setSearchFilter(e.target.value)}
        />
        <button onClick={() => toggleDisplayStates()}>State</button>
        <button onClick={() => toggleDisplayGenre()}>Genre</button>
        <button onClick={() => clearFilters()}>X</button>
      </Row>
      <Row>
        {displayStates && renderStateOptions(states)}
        {displayGenre && renderGenreOptions(genres)}
      </Row>
    </Div>
  );
}
