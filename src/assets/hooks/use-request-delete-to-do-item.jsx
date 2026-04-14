export const useRequestDeleteToDoItem = (setIsLoading, refreshTodosFlag) => {
  const requestDeleteToDoItem = (id) => {
    setIsLoading(true);
    fetch(`http://localhost:3004/todos/${id}`, {
      method: "DELETE",
    })
      .then(() => refreshTodosFlag())
      .finally(() => setIsLoading(false));
  };
  return requestDeleteToDoItem;
};
