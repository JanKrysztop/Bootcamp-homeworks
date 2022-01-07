import { useEffect, useState } from "react";
import { getCookieStatus } from "../getCookieStatus";

export const Cookie = ({ insertedAt, onDispose }) => {
  const [color, setColor] = useState("gray");

  useEffect(() => {
    if (!insertedAt) {
      return;
    }

    let frameId;
    const update = () => {
      const status = getCookieStatus(insertedAt);

      if (status === null) {
        onDispose();
        return;
      }

      setColor(status.color);
      frameId = requestAnimationFrame(update);
    };

    update();

    return () => cancelAnimationFrame(frameId);
  }, [insertedAt]);

  return (
    <div
      onClick={onDispose}
      style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: color,
      }}
    ></div>
  );
};