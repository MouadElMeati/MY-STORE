import { Link, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Carousel from './components/Carousel';
import AdminProductForm from './components/AdminProductForm';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="page">
          <div className="brand">
            <Link to="/">
              <img src="/whatsapp-logo.jpeg" alt="The Loyalty Market" className="logo-img" />
            </Link>
          </div>
          <nav className="nav">
            <Link to="/">Shop</Link>
            <a href="#about">About</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="page">
          <div>
            <h2>Make everyday shopping magical</h2>
            <p>Curated gadgets and accessories with delightful design.</p>
          </div>
          <div>
            <Link to="/" className="button">
              Shop now
            </Link>
          </div>
        </div>
      </section>

      <Carousel />

      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/admin/add-product" element={<AdminProductForm />} />
      </Routes>

      <footer className="site-footer" aria-label="Site footer">
        <div className="page" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
          <div>© {new Date().getFullYear()} The Loyalty Market</div>
          <nav className="footer-social" aria-label="Social links">
            <a href="https://twitter.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.86 1.1A4.5 4.5 0 0 0 16.11 0c-2.5 0-4.5 2.28-3.94 4.67A12.8 12.8 0 0 1 1.64.88 4.52 4.52 0 0 0 3.1 6.2 4.42 4.42 0 0 1 .88 5.7v.06A4.5 4.5 0 0 0 4.5 10.5a4.5 4.5 0 0 1-2 .08 4.5 4.5 0 0 0 4.2 3.13A9 9 0 0 1 1 19.54 12.7 12.7 0 0 0 7.29 21c8.86 0 13.71-7.57 13.71-14.12 0-.21 0-.42-.02-.63A9.8 9.8 0 0 0 23 3z" fill="currentColor"/></svg>
            </a>
            <a href="https://www.instagram.com/the_loyalty_market?igsh=MTR2OThrd2FvbjVtdA==" target="_blank" rel="noreferrer" className="social-link" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M17.5 6.5h.01" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
            <a href="https://facebook.com/" target="_blank" rel="noreferrer" className="social-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.2V12h2.2V9.7c0-2.2 1.3-3.4 3.2-3.4.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.2V12h2.3l-.37 2.9h-1.93v7A9.98 9.98 0 0 0 22 12z" fill="currentColor"/></svg>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}

export default App;
