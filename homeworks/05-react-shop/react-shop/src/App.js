import { useState, useEffect } from "react";
import style from './style.module.css'
import cart from './icons/cart.png'

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


function App() {
  const [products, setProducts] = useState([]);
  const [infoDisplay, setInfoDisplay] = useState(null);
  const [cartItems, setCartItems] = useState(0)

  const handleClick = () => {
    setCartItems(cartItems + 1);
  }
  const selectedProduct = products.find(
    (product) => product.id === infoDisplay
  );
  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className={style.wrapper}>
      <h1>React Emoji Shop ≧◡≦</h1>
      <div className={style.cart}>
        <img src={cart}/>
        <h2>Items in cart: {cartItems}</h2>
      </div>
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
        {infoDisplay ? <Info product={selectedProduct} click={handleClick}/> : null}
      </div>
    </div>
  );
}

export default App;
