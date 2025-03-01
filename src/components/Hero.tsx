import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!particlesRef.current) return;
      
      const { clientX, clientY } = e;
      const particles = particlesRef.current.children;
      
      Array.from(particles).forEach((particle: Element, i) => {
        const p = particle as HTMLElement;
        const speed = i % 2 === 0 ? -2 : 2;
        const x = (clientX - window.innerWidth / 2) / speed;
        const y = (clientY - window.innerHeight / 2) / speed;
        p.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-900">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,255,0,0.1),rgba(0,0,0,0.3))]" />
        <div className="absolute inset-0 animate-pulse-slow opacity-30 bg-[radial-gradient(circle_at_50%_100%,rgba(22,163,74,0.3),transparent_50%)]" />
      </div>

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              backgroundColor: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40">
        <div className="text-center space-y-8 animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white">
            <span className="block animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Profesyonel Bahis Analizleri
            </span>
            <span className="block text-green-200 mt-2 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              Kazanmak İçin Doğru Tercih
            </span>
          </h1>
          
          <p className="max-w-md mx-auto text-xl text-green-100 sm:text-2xl animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Detaylı istatistikler, uzman analizler ve güncel oranlarla bahis dünyasında bir adım önde olun.
          </p>

          <div className="flex justify-center animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => navigate('/register')}
              className="group relative px-8 py-3 overflow-hidden rounded-lg bg-green-600 text-lg font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-700"
            >
              <span className="relative">
                Üyelik Seç
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Wave effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
        >
          <defs>
            <path
              id="wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="wave-parallax">
            <use href="#wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use href="#wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#wave" x="48" y="7" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;