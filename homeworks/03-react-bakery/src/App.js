import { useState, useCallback } from "react";
import { FormDoughBall } from "./components/FormDoughBall";

const flourPerDoughBall = 10;

export const App = () => {
  const [doughBallsCounter, setDoughBallsCounter] = useState(0);
  const [flourCounter, setFlourCounter] = useState(100);
  const [isFlourAtHand, setIsFlourAtHand] = useState(false);

  const notEnoughFlour = flourCounter < flourPerDoughBall;

  const consumeFlour = useCallback(() => {
    if (notEnoughFlour) {
      return;
    }
    setFlourCounter((flour) => flour - flourPerDoughBall);
    setIsFlourAtHand(true);
  }, [notEnoughFlour]);

  const registerNewDoughBall = useCallback(() => {
    setDoughBallsCounter((numberOfDoughBalls) => numberOfDoughBalls + 1);
    setIsFlourAtHand(false)
  }, []);

  return (
    <div>
      <h1>React Bakery</h1>
      <p>Ilość mąki: {flourCounter}kg</p>
      <p>Liczba ulepionych ciastowych kul: {doughBallsCounter}</p>
      <FormDoughBall
        hasIngredients={isFlourAtHand}
        consumeIngredients={consumeFlour}
        onDoughBallReady={registerNewDoughBall}
      />
    </div>
  );
};
