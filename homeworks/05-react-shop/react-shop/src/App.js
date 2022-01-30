import { useState, useEffect } from "react";
import style from "./style.module.css";
import cart from "./icons/cart.png";
import { nanoid } from "nanoid";
import Cart from "./components/Cart";
import Info from "./components/Info";

const Message = () => {
  return (
    <>
    <h2>Seriously? Did you really expect us to let you buy our emojis?</h2>
    <h2>Just copy them...</h2>
    </>
  )
}


function App() {
  const [products, setProducts] = useState([]);
  const [infoDisplay, setInfoDisplay] = useState(null);
  const [displayCart, setDisplayCart] = useState(null);
  const [cartList, setCartList] = useState([]);
  
  const [cartView, setCartView] = useState(true);
  const [message, setMessage] = useState(false)

  useEffect(() => {
    fetch("http://localhost:3000/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleCartDisplay = () => {
    if (cartList.length >= 0) {
      setDisplayCart(!displayCart);
    }
  };
  const handleCartView = () => {
    setCartView(!cartView);
  };

  function createCartItem(selectedProduct) {
    const newItem = {
      id: nanoid(),
      cartItem: selectedProduct,
    };
    setCartList([...cartList, newItem]);
  }

  const handleClick = () => {
    createCartItem(selectedProduct);
  };

  const groupBy = (key, arr) =>
    arr.reduce((cache, product) => {
      const property = product[key];
      if (property in cache) {
        return { ...cache, [property]: cache[property].concat(product) };
      }
      return { ...cache, [property]: [product] };
    }, {});

  const sortedCart = groupBy("item", cartList);
  const groupedItems = Object.entries(sortedCart).map(([key, items]) => ({ key, item: items[0], quantity: items.length }))

  const selectedProduct = products.find(
    (product) => product.id === infoDisplay
  );

  const placeOrder = () => {
    setCartList([]);
    handleMessage();
  }

  const handleMessage = () => {
    setMessage(!message)
  }

  return (
    <div className={style.wrapper}>
      <h1>React Emoji Shop ≧◡≦</h1>
      {message ? <Message /> : null}
      <div className={style.cart}>
        <img src={cart} onClick={handleCartDisplay} />
        <h2>Items in cart: {cartList.length}</h2>
      </div>
      {displayCart ? (
        <Cart
          cartList={cartList}
          sortedCart={groupedItems}
          handleCartView={handleCartView}
          cartView={cartView}
          placeOrder={placeOrder}
         
        />
      ) : null}
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
        {infoDisplay ? (
          <Info product={selectedProduct} click={handleClick} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
