import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import Button from "../Components/Button";
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

  const [searchFilter, setSearchFilter] = useState("");
  const [timeFilter, setTimeFilter] = useState(new Date(1, 1, 1970));

  const [stateFilter, setStateFilter] = useState("");
  const [displayStates, setDisplayStates] = useState(false);

  const [genreFilter, setGenreFilter] = useState("");
  const [displayGenre, setDisplayGenre] = useState(false);

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
  useEffect(() => {
    dispatch({ type: "SET_TIME_FILTER", payload: timeFilter });
  }, [timeFilter]);

  const UL = styled.ul({
    display: "flex",
    flexDirection: "row",
    listStyleType: "none",
    justifyContent: "space-between",
    maxWidth: "70%",
    flexWrap: "wrap"
    // maxHeight: "1%"
  });

  const renderStateOptions = (states: string[]) => {
    return (
      <UL>
        {states.map(each => {
          return <Button onClick={e => setStateFilter(each)}>{each}</Button>;
        })}
      </UL>
    );
  };
  const renderGenreOptions = (genres: string[]) => {
    return (
      <UL>
        {genres.map(each => {
          return <Button onClick={e => setGenreFilter(each)}>{each}</Button>;
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

  const toggleOpenNow = () => {
    setTimeFilter(new Date());
  };

  const clearFilters = () => {
    setGenreFilter("");
    setStateFilter("");
    setSearchFilter("");
    setTimeFilter(new Date(1900, 1, 1));
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
        <Button onClick={() => toggleDisplayStates()}>State</Button>
        <Button onClick={() => toggleDisplayGenre()}>Genre</Button>
        <Button onClick={() => toggleOpenNow()}>Open Now</Button>
        <Button onClick={() => clearFilters()}>X</Button>
      </Row>
      <Row>
        {displayStates && renderStateOptions(states)}
        {displayGenre && renderGenreOptions(genres)}
      </Row>
    </Div>
  );
}
