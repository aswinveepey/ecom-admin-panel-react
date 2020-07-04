import React from "react";
import AppBarComp from "./common/appbar";
import PaperBox from "./common/paperbox"
import NotFound from '../assets/404.png'

export default function NotFoundcomp(props){
  return (
    <div>
      <AppBarComp search={false} />
      <PaperBox>
        <img
          src={NotFound}
          style={{ width: "100%", height: "100%" }}
          alt="Not Found"
        />
      </PaperBox>
    </div>
  );

}
