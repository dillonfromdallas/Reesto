import React from "react";
import styled from "styled-components";

const Header = styled.h1({
  fontSize: 56
});
const Div = styled.div({
  flex: 1,
  flexDirection: "row",
  textAlign: "center",
  width: "100%"
});
interface Props {
  children: React.ReactNode;
}

export default function(props: Props) {
  return (
    <Div>
      <Header>{props.children}</Header>
    </Div>
  );
}
