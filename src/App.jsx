import { useEffect, useState } from "react";
import styles from "./App.module.css";

const MOCK_DATASET = [
  {
    id: "001",
    name: "Пылесос",
    price: "500$",
  },
  {
    id: "002",
    name: "Смартфон",
    price: "500$",
  },
  {
    id: "003",
    name: "Телевизор",
    price: "800$",
  },
];

export const App = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((loadedData) => loadedData.json())
      .then((productsData) => setProducts(productsData))
      .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <div className={styles.loader}></div>
  ) : (
    <ol>
      {products.map((product) => {
        return (
          <>
            <li>
              <label>
                <input type="checkbox" className={styles.customCheckboxInput} />
                <span className={styles.customCheckboxBox}></span>
              </label>
              {product.title}
            </li>
          </>
        );
      })}
    </ol>
  );
};
