import { db } from "../../firebase";
import { ref, set } from "firebase/database";

export const useRequestUpdateToDoItem = (setIsLoading) => {
  const requestUpdateToDoItem = (currentDescription, id, doneValue) => {
    setIsLoading(true);
    const todosDbRef = ref(db, `todos/${id}`);
    set(todosDbRef, {
      description: currentDescription,
      done: !doneValue,
    });
    setIsLoading(false);
  };
  return requestUpdateToDoItem;
};
