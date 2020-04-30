import React from "react";
import styled from "styled-components";
import SearchBar from "./SearchBar";

const Div = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "space-evenly",
  width: "100%"
});

interface Props {
  children: React.ReactNode;
  fontSize?: number;
  color?: string;
}

export default function(props: Props) {
  const Header = styled.h1({
    fontSize: props.fontSize ? props.fontSize : 32,
    color: props.color ? props.color : "black"
  });
  return (
    <Div>
      <Header>{props.children}</Header>
      <SearchBar />
    </Div>
  );
}
