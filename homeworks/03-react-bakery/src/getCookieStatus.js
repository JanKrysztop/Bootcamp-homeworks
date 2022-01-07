export const statuses = {
  burned: {
    color: "black",
    isSellable: false,
  },
  perfect: {
    color: "brown",
    isSellable: true,
  },
  semiRaw: {
    color: "orange",
    isSellable: false,
  },
  totallyRaw: {
    color: "yellow",
    isSellable: false,
  },
};

export const getCookieStatus = (insertedAt) => {
  const now = Date.now();
  const dTime = now - insertedAt;
  return dTime > 12000
    ? null
    : dTime > 9000
    ? statuses.burned
    : dTime > 6000
    ? statuses.perfect
    : dTime > 3000
    ? statuses.semiRaw
    : statuses.totallyRaw;
}