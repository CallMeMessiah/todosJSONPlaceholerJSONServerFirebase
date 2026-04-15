import { ref, query, orderByChild, get } from "firebase/database";
import { db } from "../../firebase";

export const useRequestToSort = (setIsLoading, setTodos) => {
  const requestToSort = () => {
    setIsLoading(true);
    const todosRef = ref(db, "todos/");
    const sortedQuery = query(todosRef, orderByChild("done"));
    get(sortedQuery)
      .then((snapshot) => {
        const sortedArray = [];
        snapshot.forEach((child) => {
          sortedArray.push({ id: child.key, ...child.val() });
        });
        return sortedArray;
      })
      .then((sortedTodos) => setTodos(sortedTodos))
      .finally(() => setIsLoading(false));
  };
  return requestToSort;
};
