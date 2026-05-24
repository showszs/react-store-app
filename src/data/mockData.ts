import type { ProductInterface } from '../types/Product.interface';

export const PRODUCT_CATEGORIES: string[] = [
  'Laptops',
  'Desktops and All-in-Ones',
  'Graphics Cards',
  'Monitors',
  'Accessories and Peripherals',
];

export const INITIAL_PRODUCT: ProductInterface = {
  id: '7',
  name: 'Corsair K95 RGB Platinum XT Mechanical Gaming Keyboard',
  description: 'Mechanical gaming keyboard with per-key RGB backlighting',
  price: 200,
  category: 'Accessories and Peripherals',
};
