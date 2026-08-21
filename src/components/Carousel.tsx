import { useEffect, useRef, useState } from 'react';
import './carousel.css';
import products from '../data/products';

const images = [
  'https://images.pexels.com/photos/23228944/pexels-photo-23228944.jpeg',
  'https://images.pexels.com/photos/21547037/pexels-photo-21547037.jpeg',
  'https://images.pexels.com/photos/32914176/pexels-photo-32914176.jpeg',
  'https://images.pexels.com/photos/12490383/pexels-photo-12490383.jpeg',
  'https://images.pexels.com/photos/3552894/pexels-photo-3552894.jpeg',
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(-${index * 100}%)`;
  }, [index]);

  return (
    <div className="carousel" aria-roledescription="carousel">
      <div className="carousel-track" ref={trackRef}>
        {images.map((src, i) => (
          <div className="carousel-slide" key={i}>
            <img src={src} alt={`Beauty ${i + 1}`} />
          </div>
        ))}
      </div>
      <div className="carousel-controls">
        <button className="carousel-btn" onClick={() => setIndex((index - 1 + images.length) % images.length)} aria-label="Previous">‹</button>
        <button className="carousel-btn" onClick={() => setIndex((index + 1) % images.length)} aria-label="Next">›</button>
      </div>
    </div>
  );
}
