import { useState } from 'react';
import { 
  Mic, 
  Headphones, 
  Play, 
  Pause, 
  Volume2,
  ArrowRight,
  Wand2,
  Download,
  Wifi,
  Bluetooth,
  Mail,
  Plus,
  Check,
  X,
  ChevronRight
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

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

interface BluetoothDevice {
  id: string;
  name: string;
  connected: boolean;
}

export function LiveTranslation() {
  const [isActive, setIsActive] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [noiseLevel, setNoiseLevel] = useState([50]);
  const [confidence, setConfidence] = useState(94);
  
  // Bluetooth devices - now arrays for multiple devices
  const [microphones, setMicrophones] = useState<BluetoothDevice[]>([]);
  const [headphones, setHeadphones] = useState<BluetoothDevice[]>([]);
  const [isConnectingMic, setIsConnectingMic] = useState(false);
  const [isConnectingHeadphones, setIsConnectingHeadphones] = useState(false);

  // Counter for generating unique IDs
  const [micCounter, setMicCounter] = useState(0);
  const [hpCounter, setHpCounter] = useState(0);

  // View All dialogs
  const [showAllMics, setShowAllMics] = useState(false);
  const [showAllHeadphones, setShowAllHeadphones] = useState(false);

  // Transcript
  const [transcriptEntries] = useState([
    { id: 1, speaker: 'Speaker 1', lang: 'EN', text: 'Welcome to today\'s presentation about our Q4 results.', time: '14:32:15' },
    { id: 2, speaker: 'Speaker 1', lang: 'ES', text: 'Bienvenidos a la presentación de hoy sobre nuestros resultados del cuarto trimestre.', time: '14:32:18', translated: true },
    { id: 3, speaker: 'Speaker 2', lang: 'EN', text: 'Thank you for joining us. Let\'s begin with the financial overview.', time: '14:32:25' },
    { id: 4, speaker: 'Speaker 2', lang: 'ES', text: 'Gracias por unirse a nosotros. Comencemos con el resumen financiero.', time: '14:32:28', translated: true },
  ]);

  const micNames = ['Blue Yeti Pro BT', 'Shure MV7', 'Rode NT-USB', 'Audio-Technica AT2020', 'HyperX QuadCast'];
  const hpNames = ['AirPods Pro', 'Sony WH-1000XM5', 'Bose QC45', 'Jabra Elite 85h', 'Sennheiser Momentum 4'];

  const handleConnectMicrophone = async () => {
    setIsConnectingMic(true);
    // Simulate Bluetooth connection
    setTimeout(() => {
      const newMic: BluetoothDevice = { 
        id: `mic-${micCounter}`, 
        name: micNames[micCounter % micNames.length], 
        connected: true 
      };
      setMicrophones(prev => [...prev, newMic]);
      setMicCounter(prev => prev + 1);
      setIsConnectingMic(false);
      toast.success(`${newMic.name} connected via Bluetooth`);
    }, 1500);
  };

  const handleConnectHeadphones = async () => {
    setIsConnectingHeadphones(true);
    // Simulate Bluetooth connection
    setTimeout(() => {
      const newHp: BluetoothDevice = { 
        id: `hp-${hpCounter}`, 
        name: hpNames[hpCounter % hpNames.length], 
        connected: true 
      };
      setHeadphones(prev => [...prev, newHp]);
      setHpCounter(prev => prev + 1);
      setIsConnectingHeadphones(false);
      toast.success(`${newHp.name} connected via Bluetooth`);
    }, 1500);
  };

  const handleDisconnectMic = (id: string) => {
    const mic = microphones.find(m => m.id === id);
    setMicrophones(prev => prev.filter(m => m.id !== id));
    toast.info(`${mic?.name || 'Microphone'} disconnected`);
  };

  const handleDisconnectHeadphones = (id: string) => {
    const hp = headphones.find(h => h.id === id);
    setHeadphones(prev => prev.filter(h => h.id !== id));
    toast.info(`${hp?.name || 'Headphones'} disconnected`);
  };

  const handleSendTranscript = () => {
    toast.success('Transcript sent successfully!', {
      description: 'The conversation transcript has been sent to all participants.'
    });
  };

  const handleExportTranscript = () => {
    toast.success('Transcript exported!', {
      description: 'The transcript has been downloaded as a PDF.'
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Live Translation</h1>
          <p className="text-muted-foreground mt-1">Real-time voice translation with AI</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm">
            <Wifi className="w-4 h-4 text-primary" />
            <span className="text-foreground">42ms latency</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Bluetooth Devices Section */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Microphone Bluetooth Section */}
            <div className="glass-panel p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Microphones</h3>
                    <p className="text-xs text-muted-foreground">{microphones.length} connected via Bluetooth</p>
                  </div>
                </div>
                {microphones.length > 4 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-primary"
                    onClick={() => setShowAllMics(true)}
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                {microphones.slice(0, 4).map((mic) => (
                  <div key={mic.id} className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Bluetooth className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{mic.name}</p>
                          <p className="text-xs text-primary flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Connected
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDisconnectMic(mic.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {microphones.length > 4 && (
                  <button 
                    onClick={() => setShowAllMics(true)}
                    className="w-full p-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    +{microphones.length - 4} more devices
                  </button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full gap-2 h-12"
                  onClick={handleConnectMicrophone}
                  disabled={isConnectingMic}
                >
                  {isConnectingMic ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Microphone
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Headphones Bluetooth Section */}
            <div className="glass-panel p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Headphones className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Headphones</h3>
                    <p className="text-xs text-muted-foreground">{headphones.length} connected via Bluetooth</p>
                  </div>
                </div>
                {headphones.length > 4 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 text-primary"
                    onClick={() => setShowAllHeadphones(true)}
                  >
                    View All
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
              
              <div className="space-y-2">
                {headphones.slice(0, 4).map((hp) => (
                  <div key={hp.id} className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Bluetooth className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{hp.name}</p>
                          <p className="text-xs text-primary flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Connected
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDisconnectHeadphones(hp.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                
                {headphones.length > 4 && (
                  <button 
                    onClick={() => setShowAllHeadphones(true)}
                    className="w-full p-2 rounded-lg bg-secondary/50 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    +{headphones.length - 4} more devices
                  </button>
                )}
                
                <Button 
                  variant="outline" 
                  className="w-full gap-2 h-12"
                  onClick={handleConnectHeadphones}
                  disabled={isConnectingHeadphones}
                >
                  {isConnectingHeadphones ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Headphones
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* All Microphones Dialog */}
          <Dialog open={showAllMics} onOpenChange={setShowAllMics}>
            <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Mic className="w-5 h-5 text-primary" />
                  All Microphones ({microphones.length})
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {microphones.map((mic) => (
                  <div key={mic.id} className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Bluetooth className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{mic.name}</p>
                          <p className="text-xs text-primary flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Connected
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDisconnectMic(mic.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* All Headphones Dialog */}
          <Dialog open={showAllHeadphones} onOpenChange={setShowAllHeadphones}>
            <DialogContent className="sm:max-w-[500px] bg-background border-border max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-primary" />
                  All Headphones ({headphones.length})
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {headphones.map((hp) => (
                  <div key={hp.id} className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                          <Bluetooth className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{hp.name}</p>
                          <p className="text-xs text-primary flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Connected
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => handleDisconnectHeadphones(hp.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

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
                  <SelectContent className="bg-popover border-border">
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
                  <SelectContent className="bg-popover border-border">
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
                <span className="font-semibold text-primary">{confidence}%</span>
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
              <div>
                <h3 className="font-semibold">Live Transcript</h3>
                <p className="text-xs text-muted-foreground mt-0.5">All conversations are saved automatically</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={handleExportTranscript}>
                  <Download className="w-4 h-4" />
                  Export
                </Button>
                <Button variant="accent" size="sm" className="gap-2" onClick={handleSendTranscript}>
                  <Mail className="w-4 h-4" />
                  Send to All
                </Button>
              </div>
            </div>
            <div className="h-64 rounded-xl bg-secondary/30 border border-border/50 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 space-y-3">
                {isActive ? (
                  <>
                    {transcriptEntries.map((entry) => (
                      <div 
                        key={entry.id} 
                        className={`p-3 rounded-lg ${entry.translated ? 'bg-accent/10 border-l-2 border-accent' : 'bg-primary/5 border-l-2 border-primary'}`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${entry.translated ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}`}>
                              [{entry.lang}]
                            </span>
                            <span className="text-xs text-muted-foreground">{entry.speaker}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{entry.time}</span>
                        </div>
                        <p className="text-sm">{entry.text}</p>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-muted-foreground p-3">
                      <span className="animate-pulse-soft text-accent">●</span>
                      <span className="text-sm italic">Listening for speech...</span>
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                    <Mic className="w-8 h-8 mb-3 opacity-30" />
                    <p className="text-sm">Start translation to capture live transcript</p>
                    <p className="text-xs mt-1 opacity-70">Conversations will be saved for sharing</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-6">
          {/* Start/Stop Button */}
          <div className="glass-panel p-6 text-center">
            <button
              onClick={() => setIsActive(!isActive)}
              disabled={microphones.length === 0 || headphones.length === 0}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                microphones.length === 0 || headphones.length === 0 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : isActive 
                    ? 'bg-destructive text-destructive-foreground shadow-lg' 
                    : 'bg-gradient-to-br from-primary to-primary/80 text-primary-foreground glow-accent hover:scale-105'
              }`}
            >
              {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
            <p className="mt-4 text-sm font-medium">
              {microphones.length === 0 || headphones.length === 0 
                ? 'Connect Devices' 
                : isActive 
                  ? 'Translation Active' 
                  : 'Start Translation'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {microphones.length === 0 && headphones.length === 0 
                ? 'Connect microphone and headphones'
                : microphones.length === 0 
                  ? 'Connect microphone to start'
                  : headphones.length === 0 
                    ? 'Connect headphones to start'
                    : isActive 
                      ? 'Click to pause' 
                      : 'Click to begin'}
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
                  <SelectContent className="bg-popover border-border">
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
              <Bluetooth className="w-4 h-4" />
              Device Status
            </h3>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {microphones.length > 0 ? (
                microphones.map((mic) => (
                  <div key={mic.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-primary" />
                      <span className="text-sm">{mic.name}</span>
                    </div>
                    <span className="status-indicator active" />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">No microphone</span>
                  </div>
                  <span className="status-indicator" />
                </div>
              )}
              {headphones.length > 0 ? (
                headphones.map((hp) => (
                  <div key={hp.id} className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                    <div className="flex items-center gap-2">
                      <Headphones className="w-4 h-4 text-primary" />
                      <span className="text-sm">{hp.name}</span>
                    </div>
                    <span className="status-indicator active" />
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">No headphones</span>
                  </div>
                  <span className="status-indicator" />
                </div>
              )}
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Output Volume</span>
                </div>
                <span className="text-sm font-medium">85%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}