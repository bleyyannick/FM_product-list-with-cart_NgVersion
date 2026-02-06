import { Product, selectableProduct } from '../../models/product';

export const createMockProduct = (overrides?: Partial<Product>): Product => ({
  image: {
    thumbnail: 'test-thumb.jpg',
    mobile: 'test-mobile.jpg',
    tablet: 'test-tablet.jpg',
    desktop: 'test-desktop.jpg'
  },
  name: 'Test Product',
  price: 10.99,
  category: 'Test Category',
  ...overrides
});

export const createMockSelectableProduct = (
  overrides?: Partial<selectableProduct>
): selectableProduct => ({
  item: createMockProduct(overrides?.item),
  isSelected: false,
  quantity: 0,
  ...overrides
});
