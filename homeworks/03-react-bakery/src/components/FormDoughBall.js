import { useState, useEffect } from "react";
import { ProgressBar } from "./ProgressBar";



export const FormDoughBall = ({
  hasIngredients,
  consumeIngredients,
  onDoughBallReady,
}) => {
  const [shouldFormDoughBalls, setShouldFormDoughBalls] = useState(false);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    if (progress === 1) {
      onDoughBallReady();
      setProgress(0);
    }
  }, [progress, onDoughBallReady]);

  useEffect(() => {
    if (shouldFormDoughBalls && !hasIngredients) {
      consumeIngredients();
    }
  }, [consumeIngredients, shouldFormDoughBalls, hasIngredients]);

  useEffect(() => {
    if (!shouldFormDoughBalls || !hasIngredients) {
      return;
    }

    const id = setInterval(() => {
      setProgress((oldProgress) => Math.min(oldProgress + 0.25, 1));
    }, 100);

    return () => {
      clearInterval(id);
    };
  }, [shouldFormDoughBalls, hasIngredients]);

  const handleClick = () => {
    setShouldFormDoughBalls((should) => !should);
  };

  return (
    <div>
      <ProgressBar progress={progress} />
      <button onClick={handleClick}>
        {shouldFormDoughBalls === false ? "Ulep ciasto" : "Zatrzymaj lepienie"}
      </button>
      {shouldFormDoughBalls && !hasIngredients && (
        <span style={{ color: "red" }}>Za mało mąki</span>
      )}
    </div>
  );
};
