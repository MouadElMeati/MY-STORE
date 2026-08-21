import { FormEvent, useEffect, useMemo, useState } from 'react';
import products, { addProduct } from '../data/products';

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

  useEffect(() => {
    const saved = localStorage.getItem('the-loyalty-market-admin');
    setIsAuthenticated(saved === 'true');
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

    const newProduct = addProduct({
      name: form.name.trim(),
      category: form.category,
      image: form.image.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      description: form.description.trim(),
      price,
    });

    setForm(emptyForm);
    setMessage(`Product added: ${newProduct.name}`);
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
          <h1 style={{ margin: 0 }}>Add a product</h1>
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

          <button type="submit" className="button">Add product</button>

          {message && <p style={{ margin: 0, color: '#0f172a' }}>{message}</p>}
        </form>
      </div>
    </main>
  );
}
