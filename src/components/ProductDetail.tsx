import { Link, useParams } from 'react-router-dom';
import products from '../data/products';

const whatsappNumber = '0707844310';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

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

  const message = encodeURIComponent(
    `Hello, I want to buy the ${product.name} for $${product.price}. Please send me more information.`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

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
    </main>
  );
}
