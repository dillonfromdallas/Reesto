import React, { useState } from "react";
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import styled from "styled-components";
import { setCurrent } from "../Redux/actions";
import { Restaurant } from "../Models/Restaurant";

const Div = styled.div({});

export default function() {
  const dispatch = useDispatch();
  const { list } = useSelector((state: RootStateOrAny) => state.restaurants);

  const setState = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    const filtered = list.filter((each: Restaurant) => {
      if (
        each.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        each.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
        each.genre
          .join(",")
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        each.state.toLowerCase().includes(e.target.value.toLowerCase())
      )
        return each;
    });
    dispatch(setCurrent(filtered));
  };

  return (
    <Div>
      <input placeholder="Busca" type="text" onChange={e => setState(e)} />
    </Div>
  );
}
