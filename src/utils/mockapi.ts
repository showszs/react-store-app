export const API_URL = 'https://67a9037f6e9548e44fc2acf8.mockapi.io/products';

export const API_ITEMS_PER_PAGE_LIMIT = 12;

export function generateMockProducts(
  page: string | number,
  name: string,
  sort?: string,
  order?: string,
): string {
  const urlObject = new URL(API_URL);
  urlObject.searchParams.append('page', `${page}`);
  urlObject.searchParams.append('limit', `${API_ITEMS_PER_PAGE_LIMIT}`);
  if (name) {
    urlObject.searchParams.append('name', name);
  }

  if (sort) {
    urlObject.searchParams.append('sort', sort);
  }

  if (order) {
    urlObject.searchParams.append('order', order);
  }

  return urlObject.toString();
}
