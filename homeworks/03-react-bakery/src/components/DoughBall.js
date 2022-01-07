export const DoughBall = ({ ball, onClick }) => {
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
      onClick={() => onClick(ball.id)}
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
};