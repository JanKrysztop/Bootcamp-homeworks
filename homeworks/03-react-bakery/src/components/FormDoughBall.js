import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";

export const FormDoughBall = (props) => {
  const [shouldFormDoughBalls, setShouldFormDoughBalls] = useState(false);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    if(shouldFormDoughBalls === false) {
      return;
    }

    const id = setInterval(() => {
      setProgress((oldProgress) => oldProgress === 1 ? 0 : oldProgress + 0.25);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [shouldFormDoughBalls]);

  const handleClick = () => {
    setShouldFormDoughBalls((should) => !should)
  };

  return (
    <div>
      <ProgressBar progress={progress}/>
      <button onClick={handleClick}>
        {shouldFormDoughBalls === false 
          ? "Ulep ciasto" 
          : "Zatrzymaj lepienie"}
      </button>
    </div>
  );
}