import { db } from "../../firebase";
import { ref, remove } from "firebase/database";

export const useRequestDeleteToDoItem = (setIsLoading) => {
  const requestDeleteToDoItem = (id) => {
    setIsLoading(true);
    const todosDbRef = ref(db, `todos/${id}`);
    remove(todosDbRef).finally(() => {
      setIsLoading(false);
    });
  };
  return requestDeleteToDoItem;
};
