import { useEffect, useState, useRef } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "./firebase";
import styles from "./App.module.css";
import {
  useRequestNewToDoItem,
  useRequestToSort,
  useRequestUpdateToDoItem,
  useRequestDeleteToDoItem,
  useRequestDebouncedGetItem,
} from "./assets/hooks/index";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const inputValue = useRef(null);
  const timerId = useRef(null);

  useEffect(() => {
    const todosDbRef = ref(db, "todos");
    return onValue(todosDbRef, (snapshot) => {
      const loadedTodos = snapshot.val() || {};
      const loadedTodosArr = Object.entries(loadedTodos).map(([id, value]) => ({
        id,
        ...value,
      }));
      setTodos(loadedTodosArr);
      setIsLoading(false);
    });
  }, []);

  const requestNewToDoItem = useRequestNewToDoItem(setIsLoading, inputValue);

  const requestUpdateToDoItem = useRequestUpdateToDoItem(setIsLoading);

  const requestDeleteToDoItem = useRequestDeleteToDoItem(
    setIsLoading,
    inputValue,
  );

  const requestDebouncedGetItem = useRequestDebouncedGetItem(
    setIsLoading,
    setTodos,
    timerId,
  );
  const requestToSort = useRequestToSort(setIsLoading, setTodos);
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
              onChange={() => requestDebouncedGetItem(inputValue.current.value)}
            />
            <button
              className={styles.find}
              onClick={() => requestNewToDoItem(inputValue.current.value)}
            >
              Add
            </button>
            <button className={styles.sort} onClick={requestToSort}>
              Sort
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loader}></div>
        ) : todos?.length === 0 ? (
          <div className={styles.nothing}>Nothing to do...</div>
        ) : (
          <ul className={styles.todoItems}>
            {todos.map(({ id, description, done }) => (
              <li className={styles.todoItem}>
                <div
                  className={`${styles.description} ${done ? styles.line : ""}`}
                >
                  {description}
                </div>
                <div className={styles.deleteDone}>
                  <button
                    className={styles.deleteDoneButton}
                    onClick={() => requestUpdateToDoItem(description, id, done)}
                  >
                    done
                  </button>
                  <button
                    className={styles.deleteDoneButton}
                    onClick={() => requestDeleteToDoItem(id)}
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
