import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import products, { subscribeToProducts } from '../data/products';

export default function ProductList() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [items, setItems] = useState(products);

  useEffect(() => {
    const unsubscribe = subscribeToProducts(() => setItems([...products]));
    return unsubscribe;
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((p) => p.category));
    return ['All', ...Array.from(set)];
  }, [items]);

  const filtered = items.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' ? true : p.category === category;
    const price = p.price;
    const minOk = minPrice === '' ? true : price >= Number(minPrice);
    const maxOk = maxPrice === '' ? true : price <= Number(maxPrice);
    return matchesSearch && matchesCategory && minOk && maxOk;
  });

  return (
    <main className="page page-list">
      <header className="page-header">
        <h1>Our Beauty Collection</h1>
        <p>Discover curated makeup, perfumes & skincare. Click any item for details.</p>
      </header>

      <div className="filters" aria-label="Product filters">
        <input aria-label="Search products" className="filter-input" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} />

        <select className="filter-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <input className="filter-number" type="number" placeholder="Min" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
        <input className="filter-number" type="number" placeholder="Max" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

        <button className="button secondary filter-reset" onClick={() => { setSearch(''); setCategory('All'); setMinPrice(''); setMaxPrice(''); }}>Reset</button>
      </div>

      <section className="grid">
        {filtered.map((product, index) => (
          <article key={product.id} className="card" style={{animationDelay: `${index * 80}ms`}}>
            <div className="card-media">
              <img src={product.image} alt={product.name} className="card-image" />
              <div className="card-badge">{product.category}</div>
              <Link to={`/product/${product.id}`} className="card-overlay">
                View
              </Link>
            </div>
            <div className="card-body">
              <h2>{product.name}</h2>
              <div className="meta">
                <div className="stars">★★★★★</div>
                <div className="price">${product.price}</div>
              </div>
              <p className="description">{product.description}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
