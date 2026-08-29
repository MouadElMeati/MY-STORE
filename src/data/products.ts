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
  { id: 1, name: 'Eau de Parfum — Floral Glow', price: 59, category: 'Beauty', image: 'https://images.unsplash.com/photo-1542070733-8b1d4a2c9f4a?auto=format&fit=crop&w=800&q=80', description: 'Long-lasting floral fragrance with warm amber and jasmine notes.' },
  { id: 2, name: 'Liquid Lipstick — Velvet Red', price: 19, category: 'Beauty', image: 'https://images.unsplash.com/photo-1543168254-7d5b6d8f8b6a?auto=format&fit=crop&w=800&q=80', description: 'Rich velvet-matte formula with full pigment and 12-hour wear.' },
  { id: 3, name: 'Volumizing Mascara — Black', price: 24, category: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', description: 'Buildable, clump-free mascara for dramatic volume and lift.' },
  { id: 4, name: 'Hydrating Face Serum', price: 34, category: 'Beauty', image: 'https://images.unsplash.com/photo-1581579181701-3e3b2c4b6a3b?auto=format&fit=crop&w=800&q=80', description: 'Lightweight hyaluronic serum to plump and hydrate skin.' },
  { id: 5, name: 'Perfume Gift Set — Miniatures', price: 89, category: 'Beauty', image: 'https://images.unsplash.com/photo-1603398938378-3c8d9b2f4f9d?auto=format&fit=crop&w=800&q=80', description: 'Curated set of three signature scents — perfect for gifting.' },
  { id: 6, name: 'Blush Palette — Rosy Tones', price: 29, category: 'Beauty', image: 'https://images.unsplash.com/photo-1533068000433-0a3b6b3a2bde?auto=format&fit=crop&w=800&q=80', description: 'Multi-shade blush palette for natural to bold looks.' },
  { id: 7, name: 'Makeup Remover Cleansing Oil', price: 22, category: 'Beauty', image: 'https://images.unsplash.com/photo-1570813098488-6b5f9b8f9b3b?auto=format&fit=crop&w=800&q=80', description: 'Gentle cleansing oil that removes makeup and impurities without stripping skin.' },
  { id: 8, name: 'Satin Foundation — Shade 03', price: 39, category: 'Beauty', image: 'https://images.unsplash.com/photo-1585079542604-9c1d0f8d8b9a?auto=format&fit=crop&w=800&q=80', description: 'Lightweight satin-finish foundation for an even, buildable coverage.' },
  { id: 9, name: 'Eyeshadow Quad — Natural Glow', price: 26, category: 'Beauty', image: 'https://images.unsplash.com/photo-1544018202-8b2e6f9f1a88?auto=format&fit=crop&w=800&q=80', description: 'Creamy, blendable shadows in wearable neutral shades.' },
  { id: 10, name: 'Hydrating Lip Balm', price: 12, category: 'Beauty', image: 'https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?auto=format&fit=crop&w=800&q=80', description: 'Nourishing balm with shea butter and vitamin E.' },
  { id: 11, name: 'Nail Polish Set — Pastels', price: 27, category: 'Beauty', image: 'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80', description: 'Long-wear nail polish set in soft seasonal pastels.' },
  { id: 12, name: 'Fragrance Roller — Pocket', price: 15, category: 'Beauty', image: 'https://images.unsplash.com/photo-1545239366-7debed5c9f0f?auto=format&fit=crop&w=800&q=80', description: 'Small roller for on-the-go fragrance touch-ups.' },
  { id: 13, name: 'Face Mist — Dewy Glow', price: 18, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228720-6c5a8b8c2f8b?auto=format&fit=crop&w=800&q=80', description: 'Refreshing mist with botanical extracts for instant glow.' },
  { id: 14, name: 'Highlighter Stick — Champagne', price: 21, category: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', description: 'Cream highlighter for a lit-from-within sheen.' },
  { id: 15, name: 'Exfoliating Face Scrub', price: 17, category: 'Beauty', image: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?auto=format&fit=crop&w=800&q=80', description: 'Gentle scrub to smooth texture and reveal brighter skin.' },
  { id: 16, name: 'Body Lotion — Silk', price: 23, category: 'Beauty', image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80', description: 'Fast-absorbing body lotion with subtle scent and deep hydration.' },
  { id: 17, name: 'Brow Pomade — Dark Brown', price: 18, category: 'Beauty', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80', description: 'Waterproof pomade for precise brow shaping.' },
  { id: 18, name: 'Skincare Gift Set', price: 69, category: 'Beauty', image: 'https://images.unsplash.com/photo-1556228720-6c5a8b8c2f8b?auto=format&fit=crop&w=800&q=80', description: 'Three-step routine: cleanser, serum, and moisturizer.' },
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
