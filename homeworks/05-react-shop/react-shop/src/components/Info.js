import style from '../style.module.css'

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

export default Info;