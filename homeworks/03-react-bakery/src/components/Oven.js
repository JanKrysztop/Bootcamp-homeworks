import { useEffect, useState } from "react";

const cellIds = Array.from({ length: 9}, (_, index) => index);

export const Oven = () => {
  return (
    <div
      style={{
        display: "inline-grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(3, 1fr)",
      }}
    >
      {cellIds.map((id) => (
        <div
          key={id}
          style={{width: 50, height: 50, border: "1px solid brown"}}
        ></div>
      ))}
    </div>
  );
};