import { useState } from 'react';
import { useTheme } from '@/lib/theme-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Palette, RotateCcw, Check } from 'lucide-react';

export function ThemeCustomizer() {
  const { colors, updateColors, resetToDefault, isCustomized } = useTheme();
  const [previewColors, setPreviewColors] = useState(colors);
  const [isChanged, setIsChanged] = useState(false);

  const handleColorChange = (colorKey: keyof typeof colors, value: string) => {
    const newColors = { ...previewColors, [colorKey]: value };
    setPreviewColors(newColors);
    setIsChanged(true);
  };

  const applyChanges = () => {
    updateColors(previewColors);
    setIsChanged(false);
  };

  const handleReset = () => {
    resetToDefault();
    setPreviewColors(colors);
    setIsChanged(false);
  };

  const presetThemes = [
    { name: 'Ocean Blue', colors: { primary: '#0066cc', background: '#e6f3ff', text: '#1a1a1a', accent: '#e0f0ff' } },
    { name: 'Forest Green', colors: { primary: '#2d5016', background: '#f0f7e6', text: '#1a1a1a', accent: '#e8f5d8' } },
    { name: 'Purple Pro', colors: { primary: '#7c3aed', background: '#f3f1ff', text: '#1a1a1a', accent: '#ede9fe' } },
    { name: 'Sunset Orange', colors: { primary: '#ea580c', background: '#fff7ed', text: '#1a1a1a', accent: '#fed7aa' } },
    { name: 'Midnight Dark', colors: { primary: '#06b6d4', background: '#1e293b', text: '#f8fafc', accent: '#334155' } }
  ];

  const applyPreset = (preset: typeof presetThemes[0]) => {
    setPreviewColors(preset.colors);
    setIsChanged(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold">Theme Customization</h2>
          {isCustomized && (
            <Badge variant="secondary" className="text-xs">
              Custom Theme Active
            </Badge>
          )}
        </div>
        <div className="flex gap-2">
          {isChanged && (
            <Button onClick={applyChanges} size="sm" style={{ backgroundColor: 'var(--theme-primary)' }} className="text-white">
              <Check className="w-4 h-4 mr-2" />
              Apply Changes
            </Button>
          )}
          {isCustomized && (
            <Button onClick={handleReset} variant="outline" size="sm">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Default
            </Button>
          )}
        </div>
      </div>

      {/* Color Customization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            Custom Colors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primary-color">Primary Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="primary-color"
                  type="color"
                  value={previewColors.primary}
                  onChange={(e) => handleColorChange('primary', e.target.value)}
                  className="w-12 h-10 rounded border border-[hsl(var(--border))] cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={previewColors.primary}
                    onChange={(e) => handleColorChange('primary', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm font-mono"
                    placeholder="#008062"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Buttons, toggles, active states</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background-color">Background Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="background-color"
                  type="color"
                  value={previewColors.background}
                  onChange={(e) => handleColorChange('background', e.target.value)}
                  className="w-12 h-10 rounded border border-[hsl(var(--border))] cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={previewColors.background}
                    onChange={(e) => handleColorChange('background', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm font-mono"
                    placeholder="#e6eeef"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Sidebar, card backgrounds</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="text-color">Text Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="text-color"
                  type="color"
                  value={previewColors.text}
                  onChange={(e) => handleColorChange('text', e.target.value)}
                  className="w-12 h-10 rounded border border-[hsl(var(--border))] cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={previewColors.text}
                    onChange={(e) => handleColorChange('text', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm font-mono"
                    placeholder="#1a1a1a"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Primary text, headings</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accent-color">Accent Color</Label>
              <div className="flex items-center gap-3">
                <input
                  id="accent-color"
                  type="color"
                  value={previewColors.accent}
                  onChange={(e) => handleColorChange('accent', e.target.value)}
                  className="w-12 h-10 rounded border border-[hsl(var(--border))] cursor-pointer"
                />
                <div className="flex-1">
                  <input
                    type="text"
                    value={previewColors.accent}
                    onChange={(e) => handleColorChange('accent', e.target.value)}
                    className="w-full px-3 py-2 border rounded-md text-sm font-mono"
                    placeholder="#E0FFF8"
                  />
                  <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Tooltips, highlights, accents</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preset Themes */}
      <Card>
        <CardHeader>
          <CardTitle>Preset Themes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {presetThemes.map((preset) => (
              <button
                key={preset.name}
                onClick={() => applyPreset(preset)}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow text-left"
              >
                <div className="flex gap-2 mb-2">
                  <div 
                    className="w-4 h-4 rounded border" 
                    style={{ backgroundColor: preset.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded border" 
                    style={{ backgroundColor: preset.colors.background }}
                  />
                  <div 
                    className="w-4 h-4 rounded border" 
                    style={{ backgroundColor: preset.colors.accent }}
                  />
                </div>
                <div className="text-sm font-medium">{preset.name}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Theme Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="p-6 rounded-lg border-2"
            style={{ 
              backgroundColor: previewColors.background,
              borderColor: previewColors.primary,
              color: previewColors.text
            }}
          >
            <div className="space-y-4">
              <h3 className="font-semibold" style={{ color: previewColors.text }}>
                Sample Interface
              </h3>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 rounded text-white text-sm"
                  style={{ backgroundColor: previewColors.primary }}
                >
                  Primary Button
                </button>
                <div 
                  className="px-3 py-1 rounded text-xs"
                  style={{ 
                    backgroundColor: previewColors.accent,
                    color: previewColors.text
                  }}
                >
                  Accent Badge
                </div>
              </div>
              <p style={{ color: previewColors.text }}>
                This preview shows how your theme colors will look in the interface.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}