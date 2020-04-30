import React from "react";
import styled from "styled-components";

export default styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  minWidth: "15%",
  margin: "2%",
  height: "20%",
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  padding: "1%",
  backgroundColor: "beige",
  ":hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.4)"
  }
});
