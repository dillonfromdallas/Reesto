import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "./AppContainer";
import Header from "./Header";
import DataViewer from "./DataViewer";
import { getData, setCurrent } from "../Redux/actions";
import { Restaurant } from "../Models/Restaurant";
import filterTime from "../Helpers/filterHours";
import filterHours from "../Helpers/filterHours";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const {
    restaurants: { list },
    filters: { searchFilter, stateFilter, genreFilter, timeFilter }
  } = useSelector((state: RootStateOrAny) => state);

  const useTimeFilter: boolean =
    timeFilter instanceof Date && timeFilter.getFullYear() >= 2020;

  let filtered: Restaurant[] = list.filter((e: Restaurant) =>
    searchFilter ? e.name.toLowerCase().includes(searchFilter.toLowerCase()) : e
  );
  filtered = filtered.filter((e: Restaurant) =>
    stateFilter ? e.state == stateFilter : e
  );
  filtered = filtered.filter((e: Restaurant) =>
    genreFilter ? e.genre.includes(genreFilter) : e
  );
  filtered = filtered.filter((e: Restaurant) =>
    useTimeFilter ? filterHours(e) : e
  );
  console.log(filtered);

  return (
    <Container>
      <Header>Reesto</Header>
      {filtered && filtered.length ? (
        <DataViewer list={filtered} />
      ) : (
        <DataViewer list={list} />
      )}
    </Container>
  );
}

export default App;
