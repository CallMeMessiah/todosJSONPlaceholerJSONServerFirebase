export const useRequestToSort = (setIsLoading, setProducts) => {
  const requestToSort = () => {
    setIsLoading(true);
    fetch(`http://localhost:3004/todos?_sort=description`)
      .then((loadedData) => loadedData.json())
      .then((productsData) => setProducts(productsData))
      .finally(() => setIsLoading(false));
  };
  return requestToSort;
};
