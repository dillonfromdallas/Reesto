import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "./AppContainer";
import Header from "./Header";
import DataViewer from "./DataViewer";
import { getData, setCurrent } from "../Redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, []);

  const { list, current } = useSelector(
    (state: RootStateOrAny) => state.restaurants
  );

  return (
    <Container>
      <Header>Reesta</Header>
      {current && current.length ? (
        <DataViewer list={current} />
      ) : (
        <DataViewer list={list} />
      )}
    </Container>
  );
}

export default App;
