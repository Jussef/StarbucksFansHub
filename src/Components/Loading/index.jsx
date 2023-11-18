import React from "react";
import Lottie from "lottie-react";
import catCoin from "../../img/catcoin.json";
import "./styles.scss";

export default function Loading() {
  return (
    <>
      <div className="loader">
        <Lottie animationData={catCoin} className="lottie-animation"/>
      </div>
    </>
  );
}
