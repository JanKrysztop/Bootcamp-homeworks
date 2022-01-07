import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";

export const FormDoughBall = (props) => {
  const [shouldFormDoughBalls, setShouldFormDoughBalls] = useState(false);
  const [progress, setProgress] = useState(0);
  const [doughBallsCounter, setDoughBallsCounter] = useState(0);
  const [flourCounter, setFlourCounter] = useState(100);

  const canFormDoughBall = flourCounter >= 10;

  useEffect(() => {
    if (shouldFormDoughBalls === false) {
      return;
    }

    const id = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 1) {
          setDoughBallsCounter((counter) => counter + 1);
          return 0;
        }
        if (oldProgress === 0) {
          if (canFormDoughBall) {
            setFlourCounter((flour) => flour - 10);
          } else {
            return oldProgress;
          }
        }
        return oldProgress + 0.25;
      });
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [shouldFormDoughBalls, canFormDoughBall]);

  const handleClick = () => {
    setShouldFormDoughBalls((should) => !should);
  };

  return (
    <div>
      <p>Ilość mąki: {flourCounter}kg</p>
      <p>Liczba ulepionych ciastowych kul: {doughBallsCounter}</p>
      <ProgressBar progress={progress} />
      <button onClick={handleClick}>
        {shouldFormDoughBalls === false ? "Ulep ciasto" : "Zatrzymaj lepienie"}
      </button>
      {shouldFormDoughBalls === true && canFormDoughBall === false && (
        <span style={{ color: "red" }}>Za mało mąki</span>
      )}
    </div>
  );
};
