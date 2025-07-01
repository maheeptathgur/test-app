import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Palette, Check } from 'lucide-react';

interface ColorScheme {
  id: string;
  name: string;
  description: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  preview: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
  };
}

const colorSchemes: ColorScheme[] = [
  {
    id: 'default',
    name: 'Ocean Teal',
    description: 'Current brand colors with teal accents',
    primary: '#008062',
    secondary: '#e6eeef',
    accent: '#00d2a0',
    background: '#ffffff',
    preview: {
      primary: '#008062',
      secondary: '#e6eeef',
      accent: '#00d2a0',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    description: 'Professional dark blue theme',
    primary: '#1e40af',
    secondary: '#e0e7ff',
    accent: '#3b82f6',
    background: '#ffffff',
    preview: {
      primary: '#1e40af',
      secondary: '#e0e7ff',
      accent: '#3b82f6',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'forest',
    name: 'Forest Green',
    description: 'Natural green with earth tones',
    primary: '#059669',
    secondary: '#d1fae5',
    accent: '#10b981',
    background: '#ffffff',
    preview: {
      primary: '#059669',
      secondary: '#d1fae5',
      accent: '#10b981',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'sunset',
    name: 'Sunset Orange',
    description: 'Warm orange with coral accents',
    primary: '#ea580c',
    secondary: '#fed7aa',
    accent: '#fb923c',
    background: '#ffffff',
    preview: {
      primary: '#ea580c',
      secondary: '#fed7aa',
      accent: '#fb923c',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'purple',
    name: 'Royal Purple',
    description: 'Elegant purple with lavender tones',
    primary: '#7c3aed',
    secondary: '#e9d5ff',
    accent: '#a855f7',
    background: '#ffffff',
    preview: {
      primary: '#7c3aed',
      secondary: '#e9d5ff',
      accent: '#a855f7',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Clean black and white with gray accents',
    primary: '#374151',
    secondary: '#f3f4f6',
    accent: '#6b7280',
    background: '#ffffff',
    preview: {
      primary: '#374151',
      secondary: '#f3f4f6',
      accent: '#6b7280',
      background: '#ffffff',
      text: '#1f2937',
      cardBg: '#ffffff'
    }
  }
];

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [selectedScheme, setSelectedScheme] = useState(currentTheme);

  const handleApplyTheme = (schemeId: string) => {
    setSelectedScheme(schemeId);
    onThemeChange(schemeId);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Palette className="w-4 h-4" />
          Theme
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Choose Your Color Scheme</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {colorSchemes.map((scheme) => (
            <div key={scheme.id} className="space-y-4">
              {/* Theme Preview Card */}
              <Card className="overflow-hidden border-2 transition-all hover:shadow-lg" 
                    style={{ 
                      borderColor: selectedScheme === scheme.id ? scheme.preview.primary : '#e5e7eb'
                    }}>
                <CardHeader className="pb-3" 
                           style={{ backgroundColor: scheme.preview.secondary }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full" 
                           style={{ backgroundColor: scheme.preview.primary }}></div>
                      <CardTitle className="text-sm" 
                                style={{ color: scheme.preview.text }}>
                        {scheme.name}
                      </CardTitle>
                    </div>
                    {selectedScheme === scheme.id && (
                      <Check className="w-4 h-4" style={{ color: scheme.preview.primary }} />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3" 
                            style={{ backgroundColor: scheme.preview.cardBg }}>
                  <p className="text-xs" style={{ color: scheme.preview.text }}>
                    {scheme.description}
                  </p>
                  
                  {/* Mini UI Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <button className="px-3 py-1 text-xs text-white rounded-md transition-colors"
                              style={{ 
                                backgroundColor: scheme.preview.primary,
                              }}>
                        Primary Button
                      </button>
                      <button className="px-3 py-1 text-xs border rounded-md transition-colors"
                              style={{ 
                                borderColor: scheme.preview.primary,
                                color: scheme.preview.primary
                              }}>
                        Secondary
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      <Badge className="text-xs" 
                             style={{ 
                               backgroundColor: scheme.preview.accent,
                               color: 'white'
                             }}>
                        Active
                      </Badge>
                      <Badge variant="outline" className="text-xs"
                             style={{ 
                               borderColor: scheme.preview.accent,
                               color: scheme.preview.accent
                             }}>
                        Status
                      </Badge>
                    </div>
                    
                    <div className="w-full h-2 rounded-full" 
                         style={{ backgroundColor: scheme.preview.secondary }}>
                      <div className="h-full w-3/4 rounded-full" 
                           style={{ backgroundColor: scheme.preview.accent }}></div>
                    </div>
                  </div>
                  
                  {/* Color Palette Display */}
                  <div className="flex gap-2 pt-2 border-t" 
                       style={{ borderColor: scheme.preview.secondary }}>
                    <div className="w-4 h-4 rounded-full border border-gray-200" 
                         style={{ backgroundColor: scheme.preview.primary }}
                         title="Primary"></div>
                    <div className="w-4 h-4 rounded-full border border-gray-200" 
                         style={{ backgroundColor: scheme.preview.secondary }}
                         title="Secondary"></div>
                    <div className="w-4 h-4 rounded-full border border-gray-200" 
                         style={{ backgroundColor: scheme.preview.accent }}
                         title="Accent"></div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Apply Button */}
              <Button 
                variant={selectedScheme === scheme.id ? "default" : "outline"}
                size="sm" 
                className="w-full"
                onClick={() => handleApplyTheme(scheme.id)}
                style={selectedScheme === scheme.id ? {
                  backgroundColor: scheme.preview.primary,
                  borderColor: scheme.preview.primary
                } : {}}
              >
                {selectedScheme === scheme.id ? 'Applied' : 'Apply Theme'}
              </Button>
            </div>
          ))}
        </div>
        
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Current Selection</h4>
          <p className="text-sm text-gray-600">
            {colorSchemes.find(scheme => scheme.id === selectedScheme)?.description || 'No theme selected'}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}