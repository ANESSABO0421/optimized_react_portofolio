import React, { useEffect, useState, createContext } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SmoothScroll from './components/SmoothScroll';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import './App.css';

export const ThemeContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const appRef = React.useRef(null);

  // Initialize AOS (Animate On Scroll)
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode);
    localStorage.setItem('darkMode', newDarkMode);
  };

  // Check for saved theme preference and set initial theme
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  return (
    <HelmetProvider>
      <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
        <SmoothScroll>
          <div 
            className={`${
              darkMode 
                ? 'bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white' 
                : 'bg-[#e6f2ff] text-[#3a7ca5]'
            } relative min-h-screen overflow-x-hidden transition-all duration-500`}
          >
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Home />
            <About />
            <Projects />
            <Skills />
            <Contact />
            <Footer />
          </div>
        </SmoothScroll>
      </ThemeContext.Provider>
    </HelmetProvider>
  );
}

export default App;