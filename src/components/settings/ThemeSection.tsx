import { useState, useEffect } from 'react';
import { 
  Palette, 
  Sun, 
  Moon, 
  Monitor,
  Check
} from 'lucide-react';
import { Label } from '@/components/ui/label';

const accentColors = [
  { id: 'blue', name: 'Ocean Blue', hsl: '210 70% 50%', class: 'bg-[hsl(210,70%,50%)]' },
  { id: 'emerald', name: 'Emerald', hsl: '160 60% 45%', class: 'bg-[hsl(160,60%,45%)]' },
  { id: 'violet', name: 'Violet', hsl: '270 60% 55%', class: 'bg-[hsl(270,60%,55%)]' },
  { id: 'rose', name: 'Rose', hsl: '350 70% 55%', class: 'bg-[hsl(350,70%,55%)]' },
  { id: 'amber', name: 'Amber', hsl: '38 90% 50%', class: 'bg-[hsl(38,90%,50%)]' },
  { id: 'cyan', name: 'Cyan', hsl: '185 70% 45%', class: 'bg-[hsl(185,70%,45%)]' },
];

const themeOptions = [
  { id: 'light', name: 'Light', icon: Sun, description: 'Clean and bright' },
  { id: 'dark', name: 'Dark', icon: Moon, description: 'Easy on the eyes' },
  { id: 'system', name: 'System', icon: Monitor, description: 'Match device settings' },
];

export function ThemeSection() {
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark' | 'system'>('system');
  const [selectedAccent, setSelectedAccent] = useState('blue');

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      setSelectedTheme('dark');
    } else {
      setSelectedTheme('light');
    }
  }, []);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setSelectedTheme(theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  const handleAccentChange = (accentId: string) => {
    setSelectedAccent(accentId);
    const accent = accentColors.find(c => c.id === accentId);
    if (accent) {
      document.documentElement.style.setProperty('--primary', accent.hsl);
      document.documentElement.style.setProperty('--ring', accent.hsl);
    }
  };

  return (
    <div className="glass-card p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <Palette className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Appearance</h2>
          <p className="text-sm text-muted-foreground">Customize your visual experience</p>
        </div>
      </div>

      {/* Theme Selection */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Theme</Label>
        <div className="grid grid-cols-3 gap-3">
          {themeOptions.map((theme) => {
            const Icon = theme.icon;
            return (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id as 'light' | 'dark' | 'system')}
                className={`relative p-4 rounded-xl border transition-all duration-200 text-center group ${
                  selectedTheme === theme.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                }`}
              >
                <div className={`mx-auto w-10 h-10 rounded-lg flex items-center justify-center mb-2 transition-colors ${
                  selectedTheme === theme.id ? 'bg-primary/20' : 'bg-secondary group-hover:bg-primary/10'
                }`}>
                  <Icon className={`w-5 h-5 ${selectedTheme === theme.id ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <p className="font-medium text-sm">{theme.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{theme.description}</p>
                {selectedTheme === theme.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check className="w-3 h-3 text-primary-foreground" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Accent Color */}
      <div className="space-y-3 pt-4 border-t border-border/50">
        <Label className="text-sm font-medium">Accent Color</Label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {accentColors.map((color) => (
            <button
              key={color.id}
              onClick={() => handleAccentChange(color.id)}
              className={`relative p-3 rounded-xl border transition-all duration-200 group ${
                selectedAccent === color.id
                  ? 'border-foreground/30 bg-secondary/50'
                  : 'border-border hover:border-foreground/20'
              }`}
            >
              <div 
                className={`w-8 h-8 rounded-full mx-auto ${color.class} shadow-lg transition-transform group-hover:scale-110`}
              />
              <p className="text-xs text-center mt-2 font-medium">{color.name}</p>
              {selectedAccent === color.id && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-foreground flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 text-background" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 border border-border/50">
        <p className="text-sm text-muted-foreground mb-2">Preview</p>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">V</span>
          </div>
          <div>
            <p className="font-semibold">VertoX Theme</p>
            <p className="text-sm text-muted-foreground">Your customized appearance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
