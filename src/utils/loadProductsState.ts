export const loadProductsState = () => {
  const savedState = localStorage.getItem('productsState');
  if (savedState) {
    return JSON.parse(savedState);
  }

  return { page: 1, name: '', sort: '', order: '', reload: '' };
};
