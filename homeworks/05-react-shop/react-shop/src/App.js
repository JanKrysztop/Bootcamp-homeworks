import { useState, useEffect } from "react";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/products.json')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])


  
  return (
    <div >
      <h1>React Emoji Shop ≧◡≦</h1>
      <div>
        <h2>Products:</h2>
          <ul>
            {products.map((product) => {
              return (
                <li key={product.id}>{product.name}</li>
              );
              })}
          </ul>
      </div>
    </div>
  );
}

export default App;
