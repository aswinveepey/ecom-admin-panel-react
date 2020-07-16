import React from "react";
import Scaffold from "./common/scaffold";

export default function NotFoundcomp(props){
  const NotFound =
    "https://litcomassets.s3.ap-south-1.amazonaws.com/commonassets/404.png";
  return (
    <Scaffold>
      <img
        src={NotFound}
        style={{ width: "100%", height: "100%" }}
        alt="Not Found"
      />
    </Scaffold>
  );

}
