import { useState, useCallback, useEffect } from "react";
import { FormDoughBall } from "./components/FormDoughBall";
import { DoughBall } from "./components/DoughBall";
import { Oven, ovenCapacity } from "./components/Oven";
import { getCookieStatus } from "./getCookieStatus";

const flourPerDoughBall = 10;

let lastId = 0;
const getNextId = () => lastId++;

export const App = () => {
  const [doughBalls, setDoughBalls] = useState([]);
  const [flourCounter, setFlourCounter] = useState(100);
  const [isFlourAtHand, setIsFlourAtHand] = useState(false);
  const [rawCookieCounter, setRawCookieCounter] = useState(0);
  const [ovenCookies, setOvenCookies] = useState([]);
  const [sellableCookiesCounter, setSellableCookiesCounter] = useState(0);
  const [cash, setCash] = useState(0);
  const [reqestedCookiesNumber, setRequestedCookiesNumber] = useState(0)

  const notEnoughFlour = flourCounter < flourPerDoughBall;
  const noMoreRawCookies = rawCookieCounter === 0;
  const ovenIsFull = ovenCookies.length === ovenCapacity;
  const cannotPutCookieInOven = noMoreRawCookies || ovenIsFull;

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

  const handleBallClick = useCallback((ballId) => {
    setRawCookieCounter((value) => value + 1);
    setDoughBalls((doughBalls) =>
      doughBalls
        .map((doughBall) =>
          doughBall.id === ballId
            ? {
                ...doughBall,
                size: doughBall.size - 5,
              }
            : doughBall
        )
        .filter((ball) => ball.size > 0)
    );
  }, []);

  const putCookieInOven = useCallback(() => {
    if (cannotPutCookieInOven) {
      return;
    }
    setRawCookieCounter((value) => value - 1);
    setOvenCookies((existing) => [
      ...existing,
      { insertedAt: Date.now(), id: getNextId() },
    ]);
  }, [cannotPutCookieInOven]);

  const handleCookieDispose = useCallback((cookieId) => {
    setOvenCookies((cookies) =>
      cookies.filter((cookie) => {
        if (cookie.id !== cookieId) {
          return true;
        }
        const status = getCookieStatus(cookie.insertedAt);
        if (status && status.isSellable) {
          setSellableCookiesCounter((value) => value + 1);
        }
        return false;
      })
    );
  }, []);

  const fillOvenWithCookies = useCallback(() => {
    setOvenCookies((cookies) => {
      const remainigCookieSlots = ovenCapacity - cookies.length;
      const numberOfCookiesToPutInOven = Math.min(
        remainigCookieSlots,
        rawCookieCounter
      );
      const cookiesToPutInOven = Array.from(
        { length: numberOfCookiesToPutInOven },
        () => ({insertedAt: Date.now(), id: getNextId()})
      );
      setRawCookieCounter((value) => value - cookiesToPutInOven.length)
      return [...cookies, ...cookiesToPutInOven];
    });
  })

  useEffect(() => {
    if (setRequestedCookiesNumber === 0) {
      return;
    }
    if (reqestedCookiesNumber > sellableCookiesCounter) {
      return;
    }
    const singleCookiePrice = setRequestedCookiesNumber > 5 ? 4 : 5;
    setSellableCookiesCounter((value) => value - reqestedCookiesNumber);
    setCash((prievious) => prievious + singleCookiePrice * reqestedCookiesNumber);
    setRequestedCookiesNumber(0);
  }, [reqestedCookiesNumber, sellableCookiesCounter])

  useEffect(() => {
    let id;

    const tick = () => {
      id = setTimeout(() => {
        const randomSell = Math.floor(Math.random() * 9) + 1;
        setRequestedCookiesNumber(randomSell);
        tick();
      }, Math.random() * 3000 + 3000);
    };
    tick();
    return () => {
      clearTimeout(id);
    }
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
      <div style={{ display: "flex" }}>
        {doughBalls.map((ball) => {
          return (
            <DoughBall key={ball.id} ball={ball} onClick={handleBallClick} />
          );
        })}
      </div>
      <p>Liczba ulepionych ciastek: {rawCookieCounter}</p>
      <p>
        <button onClick={putCookieInOven} disabled={ovenIsFull}>
          Włóż ciastko do pieca
        </button>
        <button onClick={fillOvenWithCookies} disabled={ovenIsFull}>
          Zapełnij piec
        </button>
        {ovenIsFull && <span style={{ color: "red" }}>Piec jest pełen</span>}
      </p>
      <p>Liczba ciastek w piecu: {ovenCookies.length}/9</p>
      <Oven cookies={ovenCookies} onCookieDispose={handleCookieDispose} />
      <p>Liczba gotowych ciastek: {sellableCookiesCounter}</p>
      <p>Zarobiliśmy: {cash} PLN</p>
    </div>
  );
};
