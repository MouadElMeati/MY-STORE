export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
}

const STORAGE_KEY = 'the-loyalty-market-products';

const initialProducts: Product[] = [
 
  { id: 19, name: 'Argan Oil Shampoo', price: 200, category: 'Beauty', image: 'https://images.unsplash.com/photo-1585869859568-a93eaa6fcb8d?auto=format&fit=crop&w=800&q=80', description: 'A nourishing shampoo enriched with argan oil that gently cleanses the hair while helping to moisturize dry hair, improve softness, and enhance natural shine.' }
];

const readStoredProducts = (): Product[] => {
  if (typeof window === 'undefined') return initialProducts;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialProducts;
    const parsed = JSON.parse(raw) as Product[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialProducts;
  } catch {
    return initialProducts;
  }
};

let products: Product[] = readStoredProducts();
const listeners = new Set<() => void>();

function persistProducts() {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }
}

export function subscribeToProducts(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function addProduct(product: Omit<Product, 'id'> & { id?: number }): Product {
  const newProduct: Product = {
    ...product,
    id: product.id ?? Date.now(),
  };

  products = [...products, newProduct];
  persistProducts();
  listeners.forEach((listener) => listener());
  return newProduct;
}

export function updateProduct(id: number, updates: Partial<Omit<Product, 'id'>>): Product | null {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = { ...products[index], ...updates };
  products = [...products];
  persistProducts();
  listeners.forEach((listener) => listener());
  return products[index];
}

export function deleteProduct(id: number): boolean {
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return false;

  products = products.filter((p) => p.id !== id);
  persistProducts();
  listeners.forEach((listener) => listener());
  return true;
}

export default products;
