import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Container from "./Container";
import Header from "./Header";
import { restaurantActions } from "../Redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: restaurantActions.get });
  }, []);

  return (
    <Container>
      <Header>Reesto</Header>
    </Container>
  );
}

export default App;
