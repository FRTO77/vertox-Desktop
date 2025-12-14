import { useState } from 'react';
import { 
  Mic, 
  Headphones, 
  Play, 
  Pause, 
  Settings, 
  Volume2,
  ArrowRight,
  Wand2,
  Download,
  Wifi
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
];

const voices = [
  { id: 'natural', name: 'Natural' },
  { id: 'professional', name: 'Professional' },
  { id: 'friendly', name: 'Friendly' },
  { id: 'formal', name: 'Formal' },
];

export function LiveTranslation() {
  const [isActive, setIsActive] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [noiseLevel, setNoiseLevel] = useState([50]);
  const [confidence, setConfidence] = useState(94);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Live Translation</h1>
          <p className="text-muted-foreground mt-1">Real-time voice translation with AI</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
            <Wifi className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">42ms latency</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main I/O Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Language Selector */}
          <div className="glass-panel p-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Source */}
              <div className="flex-1 w-full">
                <label className="text-xs text-muted-foreground mb-2 block">Speaking</label>
                <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {languages.find(l => l.code === sourceLanguage)?.flag}
                        </span>
                        <span>{languages.find(l => l.code === sourceLanguage)?.name}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Arrow */}
              <div className="p-3 rounded-full bg-secondary">
                <ArrowRight className="w-5 h-5 text-muted-foreground" />
              </div>

              {/* Target */}
              <div className="flex-1 w-full">
                <label className="text-xs text-muted-foreground mb-2 block">Listening</label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">
                          {languages.find(l => l.code === targetLanguage)?.flag}
                        </span>
                        <span>{languages.find(l => l.code === targetLanguage)?.name}</span>
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Confidence indicator */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Translation Confidence</span>
                <span className="font-semibold text-accent">{confidence}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Live Transcript */}
          <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Live Transcript</h3>
              <Button variant="ghost" size="sm" className="gap-2">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
            <div className="h-48 rounded-lg bg-secondary/50 p-4 overflow-y-auto font-mono text-sm">
              {isActive ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <span className="text-primary font-medium">[EN]</span>
                    <span className="text-muted-foreground">Welcome to today's presentation about our Q4 results...</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-accent font-medium">[ES]</span>
                    <span>Bienvenidos a la presentación de hoy sobre nuestros resultados del cuarto trimestre...</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="animate-pulse-soft">●</span>
                    <span className="italic">Listening...</span>
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Start translation to see live transcript</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Start/Stop Button */}
          <div className="glass-panel p-6 text-center">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                isActive 
                  ? 'bg-destructive text-destructive-foreground shadow-lg' 
                  : 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow hover:scale-105'
              }`}
            >
              {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
            <p className="mt-4 text-sm font-medium">
              {isActive ? 'Translation Active' : 'Start Translation'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {isActive ? 'Click to pause' : 'Click to begin'}
            </p>
          </div>

          {/* Voice Settings */}
          <div className="glass-card p-5 space-y-4">
            <h3 className="font-semibold flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Voice Settings
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Voice Tone</label>
                <Select defaultValue="natural">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {voices.map((voice) => (
                      <SelectItem key={voice.id} value={voice.id}>
                        {voice.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-muted-foreground">Noise Suppression</label>
                  <span className="text-xs font-medium">{noiseLevel}%</span>
                </div>
                <Slider
                  value={noiseLevel}
                  onValueChange={setNoiseLevel}
                  max={100}
                  step={5}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Device Status */}
          <div className="glass-card p-5 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Devices
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Mic className="w-4 h-4 text-accent" />
                  <span className="text-sm">Blue Yeti Pro</span>
                </div>
                <span className="status-indicator active" />
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-primary" />
                  <span className="text-sm">AirPods Pro</span>
                </div>
                <span className="status-indicator active" />
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Output Volume</span>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
          </div>

          {/* Event Log */}
          <div className="glass-card p-5">
            <h3 className="font-semibold mb-3">Event Log</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>14:32:15 - Microphone connected</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span>14:32:10 - Audio output ready</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>14:32:05 - Session started</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
