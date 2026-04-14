export const useRequestUpdateToDoItem = (refreshTodosFlag, setIsLoading) => {
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
  return requestUpdateToDoItem;
};
