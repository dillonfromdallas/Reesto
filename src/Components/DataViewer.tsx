import React, { useEffect, useState } from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import Card from "./Card";
import { Restaurant } from "../Models/Restaurant";

interface IProps {
  list: Restaurant[];
}

export default function(props: IProps) {
  const Container = styled.div({
    height: "100%",
    width: "100%",
    display: "flex",
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "space-evenly",
    flexWrap: "wrap"
  });

  return (
    <Container>
      {props.list &&
        props.list.map(each => {
          return (
            <Card>
              <h2>{each.name}</h2>
              <p>{`${each.city}, ${each.state}`}</p>
              <p>{each.telephone}</p>
              <p>{each.genre.join(", ")}</p>
            </Card>
          );
        })}
    </Container>
  );
}
