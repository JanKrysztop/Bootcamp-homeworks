const Cart = ({
  cartList,
  totalCost,
  sortedCart,
  handleCartView,
  cartView,
}) => {
  return (
    <>
      {cartView ? (
        <div>
          <p>Total cost: {totalCost} PLN</p>
          <ul>
            {cartList.map((item) => (
              <li key={item.id}>
                {item.name} {item.price}
              </li>
            ))}
          </ul>
          <p>Total cost: {totalCost} PLN</p>
        </div>
      ) : (
        <div>
          <ul>
            <li>{Object.keys(sortedCart)[0]}x{Object.values(sortedCart)[0].length}</li>
            <li>{Object.keys(sortedCart)[1]}x{Object.values(sortedCart)[1].length}</li>
            <li>{Object.keys(sortedCart)[2]}x{Object.values(sortedCart)[2].length}</li>
            <li>{Object.keys(sortedCart)[3]}x{Object.values(sortedCart)[3].length}</li>
            <li>{Object.keys(sortedCart)[4]}x{Object.values(sortedCart)[4].length}</li>
            <li>{Object.keys(sortedCart)[5]}x{Object.values(sortedCart)[5].length}</li>
          </ul>
          <p>Total cost: {totalCost} PLN</p>
        </div>
      )}
      <button onClick={handleCartView}>
        {cartView ? 'Summary' : 'Cart'}
      </button>
    </>
  );
};

export default Cart;