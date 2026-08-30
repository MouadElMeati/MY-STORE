export default function About() {
  return (
    <main className="page page-detail">
      <div className="detail-body">
        <h1>About The Loyalty Market</h1>

        <div style={{ marginTop: 32, marginBottom: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Our Story</h2>
          <p style={{ lineHeight: 1.8, color: '#0f172a', marginBottom: 16 }}>
            The Loyalty Market is your ultimate destination for curated beauty, perfumes, and skincare products. We believe in bringing joy and quality to everyday shopping by offering a carefully selected collection of products that make a difference.
          </p>
          <p style={{ lineHeight: 1.8, color: '#0f172a', marginBottom: 16 }}>
            Our mission is simple: to provide our customers with authentic, high-quality products and an exceptional shopping experience. Every product in our collection is chosen with care, ensuring you get the best value for your money.
          </p>
          <p style={{ lineHeight: 1.8, color: '#0f172a' }}>
            Whether you're looking for the perfect fragrance, skincare essentials, or makeup staples, we've got you covered with our diverse and ever-growing collection.
          </p>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Why Choose Us?</h2>
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>🎯 Curated Selection</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Handpicked products that meet our quality standards.</p>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>⚡ Fast Shipping</h3>
              <p style={{ margin: 0, color: '#64748b' }}>Quick and reliable delivery to your doorstep.</p>
            </div>
            <div style={{ padding: 20, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2563eb' }}>💯 Customer Support</h3>
              <p style={{ margin: 0, color: '#64748b' }}>We're here to help with any questions or concerns.</p>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: 40 }}>
          <h2 style={{ marginBottom: 16 }}>Get in Touch</h2>
          <div style={{ background: 'rgba(255,255,255,0.4)', borderRadius: 12, padding: 24 }}>
            <p style={{ margin: '0 0 16px 0', color: '#0f172a' }}>
              Have questions? We'd love to hear from you! Reach out through WhatsApp or follow us on our social media channels.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 20 }}>
              <a
                href="https://wa.me/0707844310"
                target="_blank"
                rel="noreferrer"
                className="button whatsapp"
              >
                WhatsApp Us
              </a>
              <a
                href="https://www.instagram.com/the_loyalty_market?igsh=MTR2OThrd2FvbjVtdA=="
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 16px',
                  background: '#E1306C',
                  color: '#fff',
                  borderRadius: '999px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  transition: 'transform 120ms ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ marginBottom: 16 }}>Contact Information</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>📱 WhatsApp</p>
              <p style={{ margin: '8px 0 0 0', color: '#64748b' }}>+212 7 07 84 43 10</p>
            </div>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>🌐 Social Media</p>
              <p style={{ margin: '8px 0 0 0', color: '#64748b' }}>@the_loyalty_market</p>
            </div>
            <div style={{ padding: 16, background: 'rgba(255,255,255,0.4)', borderRadius: 12 }}>
              <p style={{ margin: 0, fontWeight: 600 }}>📍 Location</p>
              <p style={{ margin: '8px 0 0 0', color: '#64748b' }}>Morocco</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
