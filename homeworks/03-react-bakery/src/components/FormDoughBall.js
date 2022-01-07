import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";

export const FormDoughBall = (props) => {
  const [shouldFormDoughBalls, setShouldFormDoughBalls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [doughBallsCounter, setDoughBallsCounter] = useState(0);


  useEffect(() => {
    if(shouldFormDoughBalls === false) {
      return;
    }

    const id = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 1) {
          setDoughBallsCounter((counter) => counter + 1);
          return 0;
        }
        return oldProgress + 0.25;
      });
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
      <p>Liczba ulepionych ciastowych kul: {doughBallsCounter}</p>
      <ProgressBar progress={progress}/>
      <button onClick={handleClick}>
        {shouldFormDoughBalls === false 
          ? "Ulep ciasto" 
          : "Zatrzymaj lepienie"}
      </button>
    </div>
  );
}