import type { RootState } from '../store';
import type { ProductInterface } from '../../types/Product.interface';
import createFetchSlice from './createFetchSlice';

const initialState = {
  data: [] as ProductInterface[],
  totalCount: 0,
  error: null,
  isLoading: false,
};

const productsSlice = createFetchSlice<ProductInterface>('products', initialState);

export const fetchAllProducts = productsSlice.fetchThunk;
export const selectProducts = (state: RootState) => state.products.data;
export const selectTotalProductsCount = (state: RootState) => state.products.totalCount;
export const selectProductLoading = (state: RootState) => state.products.isLoading;
export const selectProductError = (state: RootState) => state.products.error;

export default productsSlice.reducer;
