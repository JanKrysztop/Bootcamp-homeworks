import { useEffect, useState } from "react";


export const Oven = ({ cookies }) => {
  const [slots, setSlots] = useState(Array.from({length: 9}));

  useEffect(() => {
    setSlots((slots) => {
      const cookiesWithNoSlots = cookies.filter((cookie) => 
        slots.every((slot) => slot !== cookie)
      );
      return slots.map((slot) =>
        slot === undefined ? cookiesWithNoSlots.pop() : slot
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
      {slots.map((slot, index) => (
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
          {slot && (
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "black",
              }}
            ></div>
          )}
        </div>
      ))}
    </div>
  );
};