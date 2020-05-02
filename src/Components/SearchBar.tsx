import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import Button from "../Components/Button";
import { Restaurant } from "../Models/Restaurant";

const Div = styled.div({
  display: "flex",
  flexDirection: "column",
  minWidth: "90%",
  flexWrap: "wrap",
  justifyContent: "space-evenly"
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

  const processSearchQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchFilter(e.target.value);
  };

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
          return (
            <Button onClick={e => setStateFilter(each)}>
              <p>{each}</p>
            </Button>
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
            <Button onClick={e => setGenreFilter(each)}>
              <p>{each}</p>
            </Button>
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
    minWidth: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "space-evenly"
  });
  return (
    <Div>
      <Row>
        <input
          placeholder="Busca"
          type="text"
          onChange={e => processSearchQuery(e)}
        />
        <Button onClick={() => toggleDisplayStates()}>
          <p>State</p>
        </Button>
        <Button onClick={() => toggleDisplayGenre()}>
          <p>Genre</p>
        </Button>
        <Button onClick={() => toggleOpenNow()}>
          <p>Open Now</p>
        </Button>
        <Button onClick={() => clearFilters()}>
          <p>Clear</p>
        </Button>
      </Row>
      <Row>
        {displayStates && renderStateOptions(states)}
        {displayGenre && renderGenreOptions(genres)}
      </Row>
    </Div>
  );
}
