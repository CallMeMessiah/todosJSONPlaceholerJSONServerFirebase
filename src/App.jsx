import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";

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

  const requestNewToDoItem = () => {
    setIsLoading(true);
    if (inputValue.current.value) {
      fetch("http://localhost:3004/todos/", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          description: inputValue.current.value || "Пустая записка",
          done: false,
        }),
      })
        .then((inputValue.current.value = ""))
        .then(() => refreshTodosFlag())
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
      return;
    }
  };

  const requestUpdateToDoItem = (currentDescription, id, doneValue) => {
    setIsLoading(true);
    fetch(`http://localhost:3004/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        description: currentDescription,
        done: !doneValue,
      }),
    })
      .then(() => refreshTodosFlag())
      .finally(() => setIsLoading(false));
  };

  const requestDeleteToDoItem = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:3004/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => refreshTodosFlag())
      .finally(() => setIsLoading(false));
  };
  const requestDebouncedGetItem = () => {
    setIsLoading(true);
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      fetch(
        `http://localhost:3004/todos?description_like=${inputValue.current.value}`,
      )
        .then((loadedData) => loadedData.json())
        .then((productsData) => setProducts(productsData))
        .finally(() => setIsLoading(false));
    }, 1000);
  };

  const requestToSort = () => {
    setIsLoading(true);
    fetch(`http://localhost:3004/todos?_sort=description`)
      .then((loadedData) => loadedData.json())
      .then((productsData) => setProducts(productsData))
      .finally(() => setIsLoading(false));
  };

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
