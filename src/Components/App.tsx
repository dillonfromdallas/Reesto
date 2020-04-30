import React, { useEffect } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import Container from "./AppContainer";
import Header from "./Header";
import DataViewer from "./DataViewer";

function App() {
  const base = "https://code-challenge.spectrumtoolbox.com/api/restaurants";
  const key = "q3MNxtfep8Gt";
  const dispatch = useDispatch();

  const getData = () => {
    return (dispatch: any) => {
      fetch(base, { headers: { Authorization: `Api-Key ${key}` } })
        .then(data => data.json())
        .then(data => dispatch({ type: "GET", payload: data }));
    };
  };

  useEffect(() => {
    dispatch(getData());
  }, []);

  const { list } = useSelector((state: RootStateOrAny) => state.restaurants);

  return (
    <Container>
      <Header>Reesto</Header>
      {list.length ? <DataViewer list={list} /> : <></>}
    </Container>
  );
}

export default App;
