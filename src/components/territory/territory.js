import React from "react";
import Scaffold from "../common/scaffold";
import TerritoryIndex from "./territoryindex";

export default function TerritoryComp(props) {
  return (
    <Scaffold title="Territories">
      <TerritoryIndex />
    </Scaffold>
  );
}
