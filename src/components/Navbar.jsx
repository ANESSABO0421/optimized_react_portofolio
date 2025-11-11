import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Skills", path: "/skills" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  // Handle scroll blur and shadow
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Close on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close when clicking outside (mobile)
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? "hidden" : "unset";
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.2, ease: "easeIn" },
    },
  };

  return (
    <nav
      ref={menuRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] sm:w-[85%] md:w-auto transition-all duration-300 ${
        scrolled ? "scale-[0.98] backdrop-blur-2xl" : ""
      }`}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <div
        className={`relative flex justify-between items-center px-6 py-3 rounded-full border shadow-[0_0_30px_rgba(255,255,255,0.1)] ${
          darkMode
            ? "bg-gray-900/50 border-gray-700"
            : "bg-white/10 border-white/20 backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent"
        >
          Portfolio
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium uppercase tracking-wide transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-white bg-white/15 shadow-inner ring-1 ring-white/30"
                    : "text-gray-200 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            {darkMode ? (
              <FiSun className="w-5 h-5 text-yellow-400" />
            ) : (
              <FiMoon className="w-5 h-5 text-white" />
            )}
          </button>
        </ul>

        {/* Mobile Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg bg-white/10 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <FiX className="w-6 h-6 text-white" />
          ) : (
            <FiMenu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute top-14 left-0 right-0 z-40 p-4 rounded-2xl border shadow-lg backdrop-blur-2xl transition-all ${
              darkMode
                ? "bg-gray-900/90 border-gray-700"
                : "bg-white/10 border-white/20"
            }`}
          >
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-center transition-colors ${
                      location.pathname === link.path
                        ? "bg-white/20 text-white"
                        : "text-gray-200 hover:bg-white/10"
                    }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex justify-center">
              <button
                onClick={toggleTheme}
                className="p-3 rounded-full hover:bg-white/10 transition-colors"
                aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
              >
                {darkMode ? (
                  <FiSun className="w-6 h-6 text-yellow-400" />
                ) : (
                  <FiMoon className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
