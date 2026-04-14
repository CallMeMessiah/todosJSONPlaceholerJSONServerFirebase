import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import {
  useRequestNewToDoItem,
  useRequestToSort,
  useRequestUpdateToDoItem,
  useRequestDeleteToDoItem,
  useRequestDebouncedGetItem,
} from "./assets/hooks/index";

export const App = () => {
  const [todos, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputValue = useRef(null);
  const [TodosFlag, setTodosFlag] = useState(false);
  const timerId = useRef(null);

  const refreshTodosFlag = () => {
    setTodosFlag(!TodosFlag);
  };

  useEffect(() => {
    fetch("http://localhost:3004/todos/")
      .then((loadedData) => loadedData.json())
      .then((productsData) => setProducts(productsData))
      .finally(() => setIsLoading(false));
  }, [TodosFlag]);

  const requestNewToDoItem = useRequestNewToDoItem(
    setIsLoading,
    inputValue,
    refreshTodosFlag,
  );
  const requestToSort = useRequestToSort(setIsLoading, setProducts);

  const requestUpdateToDoItem = useRequestUpdateToDoItem(
    refreshTodosFlag,
    setIsLoading,
  );

  const requestDeleteToDoItem = useRequestDeleteToDoItem(
    setIsLoading,
    refreshTodosFlag,
  );
  const requestDebouncedGetItem = useRequestDebouncedGetItem(
    setIsLoading,
    setProducts,
    timerId,
    inputValue,
  );

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>TODO LIST</div>
          <div className={styles.search}>
            <input
              className={styles.searchTodo}
              ref={inputValue}
              type="text"
              onChange={requestDebouncedGetItem}
            />
            <button className={styles.find} onClick={requestNewToDoItem}>
              Add
            </button>
            <button className={styles.sort} onClick={requestToSort}>
              Sort
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loader}></div>
        ) : todos.length === 0 ? (
          <div className={styles.nothing}>Nothing to do...</div>
        ) : (
          <ul className={styles.todoItems}>
            {todos.map((todos) => (
              <li className={styles.todoItem}>
                <div
                  className={`${styles.description} ${todos.done ? styles.line : ""}`}
                >
                  {todos.description}
                </div>
                <div className={styles.deleteDone}>
                  <button
                    className={styles.deleteDoneButton}
                    onClick={() =>
                      requestUpdateToDoItem(
                        todos.description,
                        todos.id,
                        todos.done,
                      )
                    }
                  >
                    done
                  </button>
                  <button
                    className={styles.deleteDoneButton}
                    onClick={() => requestDeleteToDoItem(todos.id)}
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};
