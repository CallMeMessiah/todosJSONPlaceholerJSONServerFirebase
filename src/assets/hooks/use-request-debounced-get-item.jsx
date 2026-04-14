export const useRequestDebouncedGetItem = (
  setIsLoading,
  setProducts,
  timerId,
  inputValue,
) => {
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
  return requestDebouncedGetItem;
};
