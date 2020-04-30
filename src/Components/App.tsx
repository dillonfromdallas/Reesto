import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "./AppContainer";
import Header from "./Header";
import DataViewer from "./DataViewer";
import { getData, setCurrent } from "../Redux/actions";
import { Restaurant } from "../Models/Restaurant";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const {
    restaurants: { list },
    filters: { searchFilter, stateFilter, genreFilter }
  } = useSelector((state: RootStateOrAny) => state);

  const filtered: Restaurant[] = list
    .filter((e: Restaurant) =>
      searchFilter
        ? e.name.toLowerCase().includes(searchFilter.toLowerCase())
        : e
    )

    .filter((e: Restaurant) => (stateFilter ? e.state == stateFilter : e))
    .filter((e: Restaurant) =>
      genreFilter ? e.genre.includes(genreFilter) : e
    );

  return (
    <Container>
      <Header>Reesta</Header>
      {filtered && filtered.length ? (
        <DataViewer list={filtered} />
      ) : (
        <DataViewer list={list} />
      )}
    </Container>
  );
}

export default App;
