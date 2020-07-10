import React from "react";
import AppBarComp from "./common/appbar";
import PaperBox from "./common/paperbox"

export default function NotFoundcomp(props){
  const NotFound =
    "https://litcomassets.s3.ap-south-1.amazonaws.com/commonassets/404.png";
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
