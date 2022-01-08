import { useEffect, useState } from "react";
import { Cookie } from "./Cookie";

export const ovenCapacity = 9;

export const Oven = ({ cookies, onCookieDispose }) => {
  const [slots, setSlots] = useState(Array.from({length: ovenCapacity}));

  useEffect(() => {
    setSlots((slots) => {
      const cookiesWithNoSlots = cookies.filter((cookie) => 
        slots.every((slot) => slot !== cookie)
      );
      return slots.map((slot) =>
        slot === undefined 
        ? cookiesWithNoSlots.pop() 
        : cookies.includes(slot)
        ? slot
        : undefined
      );
    })
  }, [cookies]);

  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      {slots.map((cookie, index) => (
        <div
          key={index}
          style={{
            width: 50, 
            height: 50, 
            border: "1px solid brown",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {cookie && (
            <Cookie
              insertedAt={cookie.insertedAt}
              onDispose={() => onCookieDispose(cookie.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};