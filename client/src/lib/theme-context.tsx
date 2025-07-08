import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeColors {
  primary: string;
  background: string;
  text: string;
  accent: string;
}

interface ThemeContextType {
  colors: ThemeColors;
  updateColors: (newColors: Partial<ThemeColors>) => void;
  resetToDefault: () => void;
  isCustomized: boolean;
  setWorkspace: (workspaceId: string) => void;
  currentWorkspaceId: string | null;
}

const defaultColors: ThemeColors = {
  primary: '#008062',
  background: '#e6eeef', 
  text: '#1a1a1a',
  accent: '#E0FFF8'
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [colors, setColors] = useState<ThemeColors>(defaultColors);
  const [isCustomized, setIsCustomized] = useState(false);
  const [currentWorkspaceId, setCurrentWorkspaceId] = useState<string | null>(null);

  // Load workspace-specific theme when workspace changes
  useEffect(() => {
    if (currentWorkspaceId) {
      const savedTheme = localStorage.getItem(`knolli-theme-${currentWorkspaceId}`);
      if (savedTheme) {
        try {
          const parsedTheme = JSON.parse(savedTheme);
          setColors(parsedTheme);
          setIsCustomized(true);
          applyThemeToDOM(parsedTheme);
        } catch (error) {
          console.error('Failed to parse saved theme:', error);
          // Reset to default if parsing fails
          setColors(defaultColors);
          setIsCustomized(false);
          applyThemeToDOM(defaultColors);
        }
      } else {
        // No custom theme for this workspace, use default
        setColors(defaultColors);
        setIsCustomized(false);
        applyThemeToDOM(defaultColors);
      }
    } else {
      // No workspace selected, use default theme
      setColors(defaultColors);
      setIsCustomized(false);
      applyThemeToDOM(defaultColors);
    }
  }, [currentWorkspaceId]);

  const applyThemeToDOM = (themeColors: ThemeColors) => {
    const root = document.documentElement;
    
    // Apply primary color and variants
    root.style.setProperty('--theme-primary', themeColors.primary);
    root.style.setProperty('--theme-primary-hover', adjustBrightness(themeColors.primary, 20));
    root.style.setProperty('--theme-primary-light', adjustBrightness(themeColors.primary, 40));
    
    // Apply background color and variants  
    root.style.setProperty('--theme-background', themeColors.background);
    root.style.setProperty('--theme-background-light', adjustBrightness(themeColors.background, 10));
    root.style.setProperty('--theme-background-dark', adjustBrightness(themeColors.background, -10));
    
    // Apply text color and variants
    root.style.setProperty('--theme-text', themeColors.text);
    root.style.setProperty('--theme-text-muted', adjustOpacity(themeColors.text, 0.7));
    root.style.setProperty('--theme-text-light', adjustOpacity(themeColors.text, 0.5));
    
    // Apply accent color and variants
    root.style.setProperty('--theme-accent', themeColors.accent);
    root.style.setProperty('--theme-accent-hover', adjustBrightness(themeColors.primary, 20));
    root.style.setProperty('--theme-accent-dark', adjustBrightness(themeColors.accent, -20));
  };

  const updateColors = (newColors: Partial<ThemeColors>) => {
    const updatedColors = { ...colors, ...newColors };
    setColors(updatedColors);
    setIsCustomized(true);
    
    // Save to workspace-specific localStorage
    if (currentWorkspaceId) {
      localStorage.setItem(`knolli-theme-${currentWorkspaceId}`, JSON.stringify(updatedColors));
    }
    
    // Apply to DOM
    applyThemeToDOM(updatedColors);
  };

  const resetToDefault = () => {
    setColors(defaultColors);
    setIsCustomized(false);
    // Remove workspace-specific theme from localStorage
    if (currentWorkspaceId) {
      localStorage.removeItem(`knolli-theme-${currentWorkspaceId}`);
    }
    
    // Reset DOM to defaults
    const root = document.documentElement;
    root.style.removeProperty('--theme-primary');
    root.style.removeProperty('--theme-primary-hover');
    root.style.removeProperty('--theme-primary-light');
    root.style.removeProperty('--theme-background');
    root.style.removeProperty('--theme-background-light');
    root.style.removeProperty('--theme-background-dark');
    root.style.removeProperty('--theme-text');
    root.style.removeProperty('--theme-text-muted');
    root.style.removeProperty('--theme-text-light');
    root.style.removeProperty('--theme-accent');
    root.style.removeProperty('--theme-accent-hover');
    root.style.removeProperty('--theme-accent-dark');
  };

  const setWorkspace = (workspaceId: string) => {
    setCurrentWorkspaceId(workspaceId);
  };

  return (
    <ThemeContext.Provider value={{ 
      colors, 
      updateColors, 
      resetToDefault, 
      isCustomized, 
      setWorkspace, 
      currentWorkspaceId 
    }}>
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

// Helper functions
function adjustBrightness(color: string, percent: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  const adjust = (val: number) => {
    const adjusted = val + (percent * 255) / 100;
    return Math.max(0, Math.min(255, Math.round(adjusted)));
  };

  const newR = adjust(r).toString(16).padStart(2, '0');
  const newG = adjust(g).toString(16).padStart(2, '0');
  const newB = adjust(b).toString(16).padStart(2, '0');

  return `#${newR}${newG}${newB}`;
}

function adjustOpacity(color: string, opacity: number): string {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}