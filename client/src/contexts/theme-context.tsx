import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  currentTheme: string;
  setTheme: (themeId: string) => void;
  themeColors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const themeMap = {
  'default': {
    primary: '#008062',
    secondary: '#e6eeef',
    accent: '#00d2a0',
    background: '#ffffff',
  },
  'midnight': {
    primary: '#1e40af',
    secondary: '#e0e7ff',
    accent: '#3b82f6',
    background: '#ffffff',
  },
  'forest': {
    primary: '#059669',
    secondary: '#d1fae5',
    accent: '#10b981',
    background: '#ffffff',
  },
  'sunset': {
    primary: '#ea580c',
    secondary: '#fed7aa',
    accent: '#fb923c',
    background: '#ffffff',
  },
  'purple': {
    primary: '#7c3aed',
    secondary: '#e9d5ff',
    accent: '#a855f7',
    background: '#ffffff',
  },
  'monochrome': {
    primary: '#374151',
    secondary: '#f3f4f6',
    accent: '#6b7280',
    background: '#ffffff',
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'default';
  });

  const setTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('theme', themeId);
    
    // Update CSS custom properties
    const colors = themeMap[themeId as keyof typeof themeMap];
    if (colors) {
      const root = document.documentElement;
      root.style.setProperty('--color-primary', colors.primary);
      root.style.setProperty('--color-secondary', colors.secondary);
      root.style.setProperty('--color-accent', colors.accent);
      root.style.setProperty('--color-background', colors.background);
      
      // Update primary brand color for consistency
      root.style.setProperty('--brand-primary', colors.primary);
      root.style.setProperty('--brand-secondary', colors.secondary);
      root.style.setProperty('--brand-accent', colors.accent);
      
      // Update sidebar colors to match theme
      root.style.setProperty('--sidebar-background', colors.secondary);
    }
  };

  useEffect(() => {
    // Initialize theme on mount
    setTheme(currentTheme);
  }, []);

  const themeColors = themeMap[currentTheme as keyof typeof themeMap] || themeMap.default;

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themeColors }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}