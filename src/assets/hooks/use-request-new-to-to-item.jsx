export const useRequestNewToDoItem = (
  setIsLoading,
  inputValue,
  refreshTodosFlag,
) => {
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
  return requestNewToDoItem;
};
