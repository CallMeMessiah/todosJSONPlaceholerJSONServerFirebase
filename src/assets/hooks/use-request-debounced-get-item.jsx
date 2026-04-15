import {
  ref,
  get,
  query,
  orderByChild,
  startAt,
  endAt,
} from "firebase/database";
import { db } from "../../firebase";

export const useRequestDebouncedGetItem = (setIsLoading, setTodos, timerId) => {
  const requestDebouncedGetItem = (inputValue) => {
    setIsLoading(true);
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      const todosDbRef = ref(db, "todos");
      const filtredByQuery = query(
        todosDbRef,
        orderByChild("description"),
        startAt(inputValue), // 2. Начинаем с searchText
        endAt(inputValue + "\uf8ff"),
      );
      get(filtredByQuery)
        .then((snapshot) => {
          const sortedArray = [];
          snapshot.forEach((child) => {
            sortedArray.push({ id: child.key, ...child.val() });
          });
          return sortedArray;
        })
        .then((sortedTodos) => setTodos(sortedTodos))
        .finally(() => setIsLoading(false));
    }, 1000);
  };
  return requestDebouncedGetItem;
};
