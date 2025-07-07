import '../styles/globals.css';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function App({ Component, pageProps }) {
  const [isDark, setIsDark] = useState(false);

  // Load saved theme or system preference
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const prefersSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const useDark = saved === 'dark' || (!saved && prefersSystemDark);

    if (useDark) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDark;
    setIsDark(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
        <Component {...pageProps} />
        {/* 🌙 Floating Toggle Button */}
        <button
          onClick={toggleDarkMode}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-gray-200 dark:bg-gray-700 text-xl"
          title="Toggle Theme"
        >
          {isDark ? '🌞' : '🌙'}
        </button>
      </div>
    </>
  );
}
