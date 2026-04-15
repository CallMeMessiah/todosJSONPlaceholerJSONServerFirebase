import { db } from "../../firebase";
import { ref, push } from "firebase/database";

export const useRequestNewToDoItem = (setIsLoading) => {
  const requestNewToDoItem = (inputValue) => {
    if (inputValue === "") return;
    setIsLoading(true);
    const todosDbRef = ref(db, "todos");
    push(todosDbRef, {
      description: inputValue,
      done: false,
    });
    setIsLoading(false);
  };
  return requestNewToDoItem;
};
