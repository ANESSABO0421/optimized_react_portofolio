// Home.jsx
import React, { useRef, useEffect, useCallback, useState, lazy, Suspense } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TypeAnimation } from "react-type-animation"; // keep this static import if you installed it, otherwise lazy import lower
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaDownload } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext"; // keep if you have theme context (darkMode)
import usePrefersReducedMotion from "../hooks/usePrefersReducedMotion"; // optional hook — fallback to null if you don't have it

// Lazy components (heavy)
const SpaceBackground = lazy(() => import("../components/SpaceBackground"));
const CustomCursor = lazy(() => import("../components/CustomCursor"));
const SEO = lazy(() => import("../components/SEO"));

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { darkMode } = useTheme?.() ?? { darkMode: true }; // default to dark
  const prefersReducedMotion = usePrefersReducedMotion?.() ?? false;

  // tilt and light refs
  const cardRef = useRef(null);
  const lightRef = useRef(null);
  const rafRef = useRef(null);
  const sectionRef = useRef(null);

  // Mounted state for fade entry control
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // GSAP scroll fade-in (respects reduced motion)
  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from(".fade-up", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // 3D tilt + soft light effect
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || prefersReducedMotion) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 10; // tilt intensity
    const rotateX = ((y - centerY) / centerY) * -8;

    const lightX = (x / rect.width) * 100;
    const lightY = (y / rect.height) * 100;

    // update light gradient
    if (lightRef.current) {
      lightRef.current.style.background = `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(255,255,255,0.12), transparent 45%)`;
      lightRef.current.style.opacity = "1";
    }

    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      gsap.to(card, {
        rotateX,
        rotateY,
        scale: 1.04,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.28,
      });
    });
  }, [prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    if (!cardRef.current || prefersReducedMotion) return;
    cancelAnimationFrame(rafRef.current);
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.6,
      ease: "power3.out",
    });
    if (lightRef.current) {
      gsap.to(lightRef.current, { opacity: 0, duration: 0.8, ease: "power2.out" });
    }
  }, [prefersReducedMotion]);

  // cleanup raf on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // accessible skip link focus style handled via tailwind classes below

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Suspense fallback={null}>
        <SEO
          title="Anees Aboobacker — MERN Full Stack Developer"
          description="MERN Full Stack Developer building modern, accessible, high-performance web apps."
        />
        <SpaceBackground />
        <CustomCursor />
      </Suspense>

      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-blue-600 focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        ref={sectionRef}
        className="relative z-10 px-6 md:px-12 lg:px-20 py-12 flex flex-col lg:flex-row items-center justify-center gap-12 max-w-7xl mx-auto"
        aria-labelledby="home-heading"
      >
        {/* LEFT: Text content */}
        <section className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
          <span
            className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-900/40 to-purple-900/30 text-blue-300 fade-up"
            aria-hidden
          >
            Welcome to my portfolio
          </span>

          <h1 id="home-heading" className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight fade-up">
            <span className="block text-gray-300 text-xl font-light">Hi, I'm</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-300">
              Anees Aboobacker
            </span>
          </h1>

          <div className="text-2xl md:text-3xl font-medium h-14 fade-up">
            {/* TypeAnimation respects prefersReducedMotion if needed */}
            {prefersReducedMotion ? (
              <div className="text-blue-400">MERN Full Stack Developer</div>
            ) : (
              <TypeAnimation
                cursor={true}
                sequence={[
                  "MERN Full Stack Developer", 2000,
                  "Frontend Developer", 2000,
                  "Backend Developer", 2000,
                ]}
                wrapper="div"
                repeat={Infinity}
                className="text-blue-300"
              />
            )}
          </div>

          <p className="max-w-xl text-md md:text-lg text-gray-300 leading-relaxed fade-up">
            I build performant, accessible, and beautiful web applications with React, Node.js, and modern tooling.
            I care about UX, maintainable code, and measurable performance.
          </p>

          <div className="flex gap-4 items-center justify-center lg:justify-start mt-2 fade-up">
            <a
              href="/Anees_Aboobacker_CV.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-white/10 bg-white/3 backdrop-blur-sm transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Download resume"
            >
              <FaDownload className="w-4 h-4" />
              Download CV
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform transition hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Contact me"
            >
              Contact Me
            </a>
          </div>

          {/* Social icons */}
          <div className="flex gap-3 mt-6 fade-up" role="list" aria-label="Social links">
            {[
              { Icon: FaGithub, url: "https://github.com/yourusername", label: "GitHub" },
              { Icon: FaLinkedin, url: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
              { Icon: FaInstagram, url: "https://instagram.com/yourusername", label: "Instagram" },
              { Icon: FaEnvelope, url: "mailto:your.email@example.com", label: "Email" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center border border-white/10 bg-white/3 backdrop-blur-sm hover:border-white/40 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={s.label}
              >
                <s.Icon />
              </a>
            ))}
          </div>
        </section>

        {/* RIGHT: 3D card / portrait */}
        <aside className="w-full lg:w-1/2 flex items-center justify-center">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="img"
            aria-label="Anees Aboobacker portrait card"
            className="relative rounded-2xl p-1 transform-style-preserve-3d will-change-transform transition-transform"
            style={{ perspective: 1100 }}
          >
            {/* outer glow (colored) */}
            <div className="absolute -inset-4 rounded-3xl blur-3xl opacity-40 pointer-events-none"
                 style={{ background: "linear-gradient(135deg,#0ea5e9 0%,#7c3aed 50%,#f59e0b 100%)" }} />

            {/* inner card */}
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-black/60 to-black/40 shadow-2xl"
              style={{ minWidth: 320, maxWidth: 520 }}
            >
              {/* light layer */}
              <div ref={lightRef} className="absolute inset-0 pointer-events-none opacity-0" />

              {/* top traffic lights */}
              <div className="flex items-center gap-2 p-3">
                <span className="w-3 h-3 rounded-full bg-red-500" />
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                <span className="w-3 h-3 rounded-full bg-green-400" />
              </div>

              {/* content area */}
              <div className="p-6 flex flex-col gap-4 items-start">
                {/* portrait / hero image */}
                <div className="w-full rounded-lg overflow-hidden aspect-w-16 aspect-h-9 bg-gradient-to-br from-blue-800 via-purple-800 to-amber-700 flex items-center justify-center">
                  {/* replace with your optimized image */}
                  <img
                    src="/optimized/gemini.webp"
                    alt="Anees Aboobacker"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="800"
                    height="450"
                    decoding="async"
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-xl font-semibold">Anees Aboobacker</h3>
                  <p className="text-sm text-gray-300 mt-1">
                    Full Stack Developer • React • Node.js • UI/UX
                  </p>

                  <div className="mt-3 pt-3 border-t border-white/6 w-full">
                    <p className="text-sm text-blue-300 inline-flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-400" />
                      Available for freelance work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Navigation dots (desktop only) */}
      <nav className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-20 flex-col gap-4">
        {[
          { name: "home", href: "#home" },
          { name: "about", href: "#about" },
          { name: "skills", href: "#skills" },
          { name: "projects", href: "#projects" },
          { name: "contact", href: "#contact" },
        ].map((n, i) => {
          const active = typeof window !== "undefined" && window.location.hash === n.href;
          return (
            <a
              key={i}
              href={n.href}
              aria-label={`Go to ${n.name}`}
              className={`w-3 h-3 rounded-full transition-transform transform ${active ? "bg-blue-400 scale-125" : "bg-white/10 hover:bg-white/20"}`}
            />
          );
        })}
      </nav>
    </div>
  );
};

export default Home;
