import { FormEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import products from '../data/products';
import { getProductReviews, addReview, subscribeToReviews, getAverageRating } from '../data/reviews';

const whatsappNumber = '0707844310';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));
  const [reviews, setReviews] = useState(getProductReviews(Number(id)));
  const [averageRating, setAverageRating] = useState(getAverageRating(Number(id)));
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    const unsubscribe = subscribeToReviews(() => {
      setReviews(getProductReviews(Number(id)));
      setAverageRating(getAverageRating(Number(id)));
    });
    return unsubscribe;
  }, [id]);

  const handleSubmitReview = (event: FormEvent) => {
    event.preventDefault();

    if (!formData.name.trim() || !formData.comment.trim()) {
      setMessage('Please fill in all fields.');
      return;
    }

    addReview(Number(id), formData.name, formData.rating, formData.comment);
    setFormData({ name: '', rating: 5, comment: '' });
    setMessage('Thank you for your review!');
    setTimeout(() => setMessage(''), 3000);
  };

  if (!product) {
    return (
      <main className="page page-detail">
        <p>Product not found.</p>
        <Link to="/" className="button secondary">
          Back to products
        </Link>
      </main>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello, I want to buy the ${product.name} for $${product.price}. Please send me more information.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <main className="page page-detail">
      <div className="detail-card">
        <div>
          <img src={product.image} alt={product.name} className="detail-image" />
        </div>
        <div className="detail-body">
          <h1>{product.name}</h1>
          <div style={{display:'flex',alignItems:'center',gap:12,margin:'12px 0'}}>
            <div className="price">${product.price}</div>
            <div style={{color:'#64748b'}}>Fast shipping · 30-day returns</div>
          </div>
          <p className="description">{product.description}</p>
          <div className="actions" style={{marginTop:20}}>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="button whatsapp">
              Send WhatsApp message
            </a>
            <Link to="/" className="button secondary">
              Back to products
            </Link>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 60 }}>
        <h2 style={{ marginBottom: 24 }}>Customer Reviews ({reviews.length})</h2>

        {averageRating > 0 && (
          <div style={{ marginBottom: 32, padding: 20, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <div style={{ fontSize: '2rem' }}>★</div>
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: 600 }}>{averageRating.toFixed(1)}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Based on {reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
              </div>
            </div>
          </div>
        )}

        <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: 12, padding: 24, marginBottom: 32 }}>
          <h3 style={{ margin: '0 0 20px 0' }}>Leave a Review</h3>
          <form onSubmit={handleSubmitReview} style={{ display: 'grid', gap: 16 }}>
            <input
              type="text"
              className="filter-input"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />

            <div>
              <label style={{ fontWeight: 600, marginBottom: 8, display: 'block' }}>Rating</label>
              <select
                className="filter-select"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                style={{ width: '100%' }}
              >
                <option value={5}>★★★★★ Excellent</option>
                <option value={4}>★★★★☆ Good</option>
                <option value={3}>★★★☆☆ Average</option>
                <option value={2}>★★☆☆☆ Poor</option>
                <option value={1}>★☆☆☆☆ Terrible</option>
              </select>
            </div>

            <textarea
              className="filter-input"
              placeholder="Share your thoughts about this product..."
              rows={4}
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
            />

            <button type="submit" className="button">Submit Review</button>
            {message && <p style={{ margin: 0, color: message.includes('Thank you') ? '#10b981' : '#dc2626' }}>{message}</p>}
          </form>
        </div>

        {reviews.length > 0 ? (
          <div style={{ display: 'grid', gap: 16 }}>
            {reviews.map((review) => (
              <div key={review.id} style={{ background: 'rgba(255,255,255,0.4)', borderRadius: 12, padding: 20, borderLeft: '4px solid #2563eb' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 12 }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px 0' }}>{review.name}</h4>
                    <div style={{ color: '#f59e0b', fontSize: '0.95rem' }}>
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>
                    {new Date(review.date).toLocaleDateString()}
                  </div>
                </div>
                <p style={{ margin: 0, color: '#0f172a', lineHeight: 1.6 }}>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ color: '#64748b', textAlign: 'center', padding: 20 }}>No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    </main>
  );
}
