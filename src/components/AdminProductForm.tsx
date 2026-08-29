import { FormEvent, useEffect, useMemo, useState } from 'react';
import products, { addProduct, updateProduct, deleteProduct, subscribeToProducts, Product } from '../data/products';

const ADMIN_PASSWORD = 'theloyaltymarket';

const emptyForm = {
  name: '',
  price: '',
  category: 'Beauty',
  image: '',
  description: '',
};

export default function AdminProductForm() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [allProducts, setAllProducts] = useState(products);

  useEffect(() => {
    const saved = localStorage.getItem('the-loyalty-market-admin');
    setIsAuthenticated(saved === 'true');
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(() => {
      setAllProducts([...products]);
    });
    return unsubscribe;
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((product) => product.category));
    return ['Beauty', ...Array.from(set).filter((category) => category !== 'Beauty')];
  }, []);

  const handleLogin = (event: FormEvent) => {
    event.preventDefault();

    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('the-loyalty-market-admin', 'true');
      setIsAuthenticated(true);
      setPassword('');
      setMessage('Logged in successfully.');
      return;
    }

    setMessage('Incorrect password.');
  };

  const handleLogout = () => {
    localStorage.removeItem('the-loyalty-market-admin');
    setIsAuthenticated(false);
    setMessage('Logged out.');
  };

  const handleEditProduct = (product: Product) => {
    setForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      image: product.image,
      description: product.description,
    });
    setEditingId(product.id);
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      setMessage('Product deleted successfully.');
    }
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleChange = (field: keyof typeof emptyForm, value: string) => {
    setForm((previous) => ({ ...previous, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setForm((previous) => ({ ...previous, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const price = Number(form.price);

    if (!form.name.trim() || !form.description.trim() || Number.isNaN(price) || price <= 0) {
      setMessage('Please complete all fields with a valid price.');
      return;
    }

    if (editingId !== null) {
      updateProduct(editingId, {
        name: form.name.trim(),
        category: form.category,
        image: form.image.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        description: form.description.trim(),
        price,
      });
      setMessage(`Product updated: ${form.name}`);
      setEditingId(null);
    } else {
      const newProduct = addProduct({
        name: form.name.trim(),
        category: form.category,
        image: form.image.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
        description: form.description.trim(),
        price,
      });
      setMessage(`Product added: ${newProduct.name}`);
    }

    setForm(emptyForm);
  };

  if (!isAuthenticated) {
    return (
      <main className="page page-detail">
        <div className="detail-body" style={{ maxWidth: 420, margin: '40px auto' }}>
          <h1>Admin access</h1>
          <p style={{ color: '#64748b' }}>Only the store owner can add products.</p>
          <form onSubmit={handleLogin} style={{ display: 'grid', gap: 12 }}>
            <input
              type="password"
              className="filter-input"
              placeholder="Enter admin password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button type="submit" className="button">Login</button>
            {message && <p style={{ margin: 0, color: '#0f172a' }}>{message}</p>}
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="page page-detail">
      <div className="detail-body" style={{ maxWidth: 720, margin: '40px auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, marginBottom: 20 }}>
          <h1 style={{ margin: 0 }}>{editingId ? 'Edit product' : 'Add a product'}</h1>
          <button type="button" className="button secondary" onClick={handleLogout}>Logout</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
          <input
            className="filter-input"
            placeholder="Product name"
            value={form.name}
            onChange={(event) => handleChange('name', event.target.value)}
          />

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
            <input
              className="filter-input"
              type="number"
              min="0"
              step="0.01"
              placeholder="Price"
              value={form.price}
              onChange={(event) => handleChange('price', event.target.value)}
            />

            <select
              className="filter-select"
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gap: 12 }}>
            <label style={{ fontWeight: 600 }}>Product photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ padding: '12px 14px', border: '1px solid rgba(2,6,23,0.06)', borderRadius: 12 }}
            />
            <input
              className="filter-input"
              placeholder="Or paste an image URL"
              value={form.image}
              onChange={(event) => handleChange('image', event.target.value)}
            />
          </div>

          <textarea
            className="filter-input"
            rows={5}
            placeholder="Product description"
            value={form.description}
            onChange={(event) => handleChange('description', event.target.value)}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <button type="submit" className="button">{editingId ? 'Update product' : 'Add product'}</button>
            {editingId && (
              <button type="button" className="button secondary" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>

          {message && <p style={{ margin: 0, color: '#0f172a' }}>{message}</p>}
        </form>

        <div style={{ marginTop: 40 }}>
          <h2>Products ({allProducts.length})</h2>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
            {allProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: '1px solid rgba(2,6,23,0.06)',
                  borderRadius: 12,
                  padding: 16,
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  gap: 16,
                  alignItems: 'center',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }}
                />
                <div>
                  <h3 style={{ margin: '0 0 4px 0' }}>{product.name}</h3>
                  <p style={{ margin: '0 0 4px 0', color: '#64748b', fontSize: 14 }}>
                    ${product.price} • {product.category}
                  </p>
                  <p style={{ margin: 0, color: '#64748b', fontSize: 13 }}>
                    {product.description.substring(0, 60)}...
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => handleEditProduct(product)}
                    style={{ padding: '8px 12px', fontSize: 14 }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => handleDeleteProduct(product.id)}
                    style={{ padding: '8px 12px', fontSize: 14, color: '#dc2626' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
