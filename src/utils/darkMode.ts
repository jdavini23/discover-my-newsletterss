export const toggleDarkMode = () => {
  const htmlElement = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'light';

  if (currentTheme === 'light') {
    htmlElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    htmlElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }
};

export const initDarkMode = () => {
  const savedTheme =
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  }
};

// Optional: Add system preference listener
export const setupDarkModeListener = () => {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleColorSchemeChange = (e: MediaQueryListEvent) => {
    const newColorScheme = e.matches ? 'dark' : 'light';
    localStorage.setItem('theme', newColorScheme);
    document.documentElement.classList.toggle('dark', newColorScheme === 'dark');
  };

  mediaQuery.addEventListener('change', handleColorSchemeChange);

  // Return a cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleColorSchemeChange);
  };
};
