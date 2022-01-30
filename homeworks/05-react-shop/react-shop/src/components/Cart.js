import { useMemo } from "react";
const formatPrice = ({ value, currency }) => `${(value/100).toFixed(2)} ${currency}`

const Cart = ({
  cartList,
  sortedCart,
  handleCartView,
  cartView,
  placeOrder,
}) => {
  const totalCost = useMemo(() => {
    return cartList.map(item => item.cartItem.price.value ).reduce((total, next) => total + next, 0)
  }, [cartList])

  const costDisplay =  <p>Total cost: {formatPrice({ value: totalCost, currency: 'PLN'})}</p>
  return (
    <>
      {cartView ? (
        <div>
         {costDisplay}
          <ul>
            {cartList.map(({ id, cartItem: { name, price } }) => (
              <li key={id}>
                {name} {formatPrice(price)}
              </li>
            ))}
          </ul>
         {costDisplay}
          <button onClick={handleCartView}>Summary</button>
        </div>
      ) : (
        <div>
          <ul>
            {sortedCart.map(({ key, item, quantity }) => {
              console.log(item)
              return <li key={key}>{item.cartItem.name} x{quantity}</li>
            })}
          </ul>
          {costDisplay}
          <button onClick={handleCartView}>Cart</button>
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}
    </>
  );
};

export default Cart;