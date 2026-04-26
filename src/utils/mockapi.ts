const API_URL = 'https://67a9037f6e9548e44fc2acf8.mockapi.io/products';

export function generateMockProducts(page: string | number, limit: string | number): string {
  const urlObject = new URL(API_URL);
  urlObject.searchParams.append('page', `${page}`);
  urlObject.searchParams.append('limit', `${limit}`);
  return urlObject.toString();
}
