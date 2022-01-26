import { useState, useEffect } from "react";
import style from "./style.module.css";
import cart from "./icons/cart.png";
import { nanoid } from "nanoid";

const Info = ({ product, click }) => {
  return (
    <div key={product.id} className={style.info}>
      <p>{product.name}</p>
      <p>
        {`${product.price.value}` / 100 + " "}
        {product.price.currency}
      </p>
      <p className={style.emot}>{product.item}</p>
      <button onClick={click}>Add to cart</button>
    </div>
  );
};

const Cart = ({ cartList }) => {
  return (
    <div>
      {cartList.map((item) => (
        <p key={item.id}>
          {item.name} {item.price}
        </p>
      ))}
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [infoDisplay, setInfoDisplay] = useState(null);
  const [cartItems, setCartItems] = useState(0);
  const [displayCart, setDisplayCart] = useState(null);
  const [cartList, setCartList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCartDisplay = () => {
    if (cartItems > 0) {
      setDisplayCart(!displayCart);
    }
  };

  function createCartItem(selectedProduct) {
    const newItem = {
      id: nanoid(),
      name: selectedProduct.name,
      item: selectedProduct.item,
      price:
        `${selectedProduct.price.value}` / 100 +
        " " +
        selectedProduct.price.currency,
    };
    setCartList([...cartList, newItem]);
  }

  const handleClick = () => {
    createCartItem(selectedProduct);
    setCartItems(cartItems + 1);
  };
  const selectedProduct = products.find(
    (product) => product.id === infoDisplay
  );

  return (
    <div className={style.wrapper}>
      <h1>React Emoji Shop ≧◡≦</h1>
      <div className={style.cart}>
        <img src={cart} onClick={handleCartDisplay} />
        <h2>Items in cart: {cartItems}</h2>
      </div>
      {displayCart ? <Cart cartList={cartList} /> : null}
      <div className={style.products}>
        <ul>
          {products.map((product) => {
            return (
              <div key={product.id}>
                <li>
                  <p>{product.name}</p>
                  <button
                    type="button"
                    onClick={() => setInfoDisplay(product.id)}
                  >
                    Show Details
                  </button>
                </li>
              </div>
            );
          })}
        </ul>
        {infoDisplay ? <Info product={selectedProduct} click={handleClick} /> : null}
      </div>
    </div>
  );
}

export default App;
