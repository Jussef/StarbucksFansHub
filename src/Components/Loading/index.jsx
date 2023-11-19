import React from "react";
import Lottie from "lottie-react";
import anim from "../../img/coffe.json";
import "./styles.scss";

export default function Loading() {
  return (
    <>
      <div className="loader">
        <Lottie animationData={anim} className="lottie-animation"/>
      </div>
    </>
  );
}
