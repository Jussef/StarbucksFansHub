import React, { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import pata from "../../img/pata.json";

const PataRef = ({ animar, Complete }) => {
  const lottieRef = useRef();

  const style = {
    height: 80,
  };

  useEffect(() => {
    if (animar) {
      // lottieRef.current.play();
      lottieRef.current.goToAndPlay(0);
    }
  }, [animar]);

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={pata}
      loop={false}
      autoplay={false}
      style={style}
      onComplete={() => {
        Complete(true);
      }}
    />
  );
};

export default PataRef;
