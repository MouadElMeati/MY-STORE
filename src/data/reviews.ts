export interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const REVIEWS_STORAGE_KEY = 'the-loyalty-market-reviews';

const readStoredReviews = (): Review[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Review[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

let reviews: Review[] = readStoredReviews();
const listeners = new Set<() => void>();

function persistReviews() {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }
}

export function subscribeToReviews(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getProductReviews(productId: number): Review[] {
  return reviews.filter((review) => review.productId === productId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addReview(productId: number, name: string, rating: number, comment: string): Review {
  const newReview: Review = {
    id: Date.now(),
    productId,
    name: name.trim(),
    rating,
    comment: comment.trim(),
    date: new Date().toISOString(),
  };

  reviews = [...reviews, newReview];
  persistReviews();
  listeners.forEach((listener) => listener());
  return newReview;
}

export function getAverageRating(productId: number): number {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / productReviews.length;
}

export default reviews;
