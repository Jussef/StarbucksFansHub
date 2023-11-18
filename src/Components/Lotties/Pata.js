import React, {useRef} from "react";
import Lottie from "lottie-react";
import { useLottie, useLottieInteractivity } from "lottie-react";
import pata from "../../img/pata.json";

const style = {
  height: 80,
};

const options = {
  animationData: pata,
};

const Pata = () => {
  const lottieRef = useRef()
  const lottieObj = useLottie(options, style, lottieRef);
  const Animation = useLottieInteractivity({
    lottieObj,
    mode: "cursor",
    actions: [
      {
        type: "play",
      },
    ],
  });
  console.log(lottieRef.current);
  lottieRef.current.play();
  return Animation;
};

export default Pata;