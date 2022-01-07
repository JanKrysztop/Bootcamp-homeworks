import { useState, useCallback } from "react";
import { FormDoughBall } from "./components/FormDoughBall";

const flourPerDoughBall = 10;

export const App = () => {
  const [doughBalls, setDoughBalls] = useState([]);
  const [flourCounter, setFlourCounter] = useState(100);
  const [isFlourAtHand, setIsFlourAtHand] = useState(false);
  const [rawCookieCounter, setRawCookieCounter] = useState(0);

  const notEnoughFlour = flourCounter < flourPerDoughBall;

  const consumeFlour = useCallback(() => {
    if (notEnoughFlour) {
      return;
    }
    setFlourCounter((flour) => flour - flourPerDoughBall);
    setIsFlourAtHand(true);
  }, [notEnoughFlour]);

  const registerNewDoughBall = useCallback(() => {
    setDoughBalls((doughBalls) => [
      ...doughBalls,
      { id: Date.now(), size: 50 },
    ]);
    setIsFlourAtHand(false);
  }, []);

  return (
    <div>
      <h1>React Bakery</h1>
      <p>Ilość mąki: {flourCounter}kg</p>
      <p>Liczba ulepionych ciastowych kul: {doughBalls.length}</p>
      <FormDoughBall
        hasIngredients={isFlourAtHand}
        consumeIngredients={consumeFlour}
        onDoughBallReady={registerNewDoughBall}
      />
      <div style={{display: "flex"}}>
        {doughBalls.map((ball) => {
          return (
            <div
              key={ball.id}
              style={{
                width: 50,
                height: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => {
                setRawCookieCounter((value) => value + 1);
                setDoughBalls((doughBalls) => 
                doughBalls
                  .map((doughBall) => 
                    doughBall.id === ball.id
                      ? {
                        ...doughBall,
                        size: doughBall.size - 5,
                        }
                      : doughBall
                  )
                  .filter((ball) => ball.size > 0)
                );
              }}
            >
              <div
                style={{
                  background: "yellow",
                  width: ball.size,
                  height: ball.size,
                  borderRadius: "50%",
                }}
              />
            </div> 
          );
        })}
      </div>
      <p>Liczba ulepionych ciastek: {rawCookieCounter}</p>
    </div>
  );
};
