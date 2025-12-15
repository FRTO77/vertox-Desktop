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
  X
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
  
  // Bluetooth devices
  const [microphone, setMicrophone] = useState<BluetoothDevice | null>(null);
  const [headphones, setHeadphones] = useState<BluetoothDevice | null>(null);
  const [isConnectingMic, setIsConnectingMic] = useState(false);
  const [isConnectingHeadphones, setIsConnectingHeadphones] = useState(false);

  // Transcript
  const [transcriptEntries] = useState([
    { id: 1, speaker: 'Speaker 1', lang: 'EN', text: 'Welcome to today\'s presentation about our Q4 results.', time: '14:32:15' },
    { id: 2, speaker: 'Speaker 1', lang: 'ES', text: 'Bienvenidos a la presentación de hoy sobre nuestros resultados del cuarto trimestre.', time: '14:32:18', translated: true },
    { id: 3, speaker: 'Speaker 2', lang: 'EN', text: 'Thank you for joining us. Let\'s begin with the financial overview.', time: '14:32:25' },
    { id: 4, speaker: 'Speaker 2', lang: 'ES', text: 'Gracias por unirse a nosotros. Comencemos con el resumen financiero.', time: '14:32:28', translated: true },
  ]);

  const handleConnectMicrophone = async () => {
    setIsConnectingMic(true);
    // Simulate Bluetooth connection
    setTimeout(() => {
      setMicrophone({ id: 'mic-1', name: 'Blue Yeti Pro BT', connected: true });
      setIsConnectingMic(false);
      toast.success('Microphone connected via Bluetooth');
    }, 1500);
  };

  const handleConnectHeadphones = async () => {
    setIsConnectingHeadphones(true);
    // Simulate Bluetooth connection
    setTimeout(() => {
      setHeadphones({ id: 'hp-1', name: 'AirPods Pro', connected: true });
      setIsConnectingHeadphones(false);
      toast.success('Headphones connected via Bluetooth');
    }, 1500);
  };

  const handleDisconnectMic = () => {
    setMicrophone(null);
    toast.info('Microphone disconnected');
  };

  const handleDisconnectHeadphones = () => {
    setHeadphones(null);
    toast.info('Headphones disconnected');
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
            <Wifi className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">42ms latency</span>
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
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Microphone</h3>
                  <p className="text-xs text-muted-foreground">Connect via Bluetooth</p>
                </div>
              </div>
              
              {microphone ? (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Bluetooth className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{microphone.name}</p>
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
                      onClick={handleDisconnectMic}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full gap-2 h-14"
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
                      Add Bluetooth Microphone
                    </>
                  )}
                </Button>
              )}
            </div>

            {/* Headphones Bluetooth Section */}
            <div className="glass-panel p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Headphones</h3>
                  <p className="text-xs text-muted-foreground">Connect via Bluetooth</p>
                </div>
              </div>
              
              {headphones ? (
                <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Bluetooth className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{headphones.name}</p>
                        <p className="text-xs text-accent flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Connected
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={handleDisconnectHeadphones}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full gap-2 h-14"
                  onClick={handleConnectHeadphones}
                  disabled={isConnectingHeadphones}
                >
                  {isConnectingHeadphones ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Bluetooth Headphones
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

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
              disabled={!microphone || !headphones}
              className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all duration-300 ${
                !microphone || !headphones 
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : isActive 
                    ? 'bg-destructive text-destructive-foreground shadow-lg' 
                    : 'bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-glow hover:scale-105'
              }`}
            >
              {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-1" />}
            </button>
            <p className="mt-4 text-sm font-medium">
              {!microphone || !headphones 
                ? 'Connect Devices' 
                : isActive 
                  ? 'Translation Active' 
                  : 'Start Translation'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {!microphone && !headphones 
                ? 'Connect microphone and headphones'
                : !microphone 
                  ? 'Connect microphone to start'
                  : !headphones 
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
            
            <div className="space-y-2">
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Mic className={`w-4 h-4 ${microphone ? 'text-primary' : 'text-muted-foreground'}`} />
                  <span className="text-sm">{microphone ? microphone.name : 'No microphone'}</span>
                </div>
                <span className={`status-indicator ${microphone ? 'active' : ''}`} />
              </div>
              <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-2">
                  <Headphones className={`w-4 h-4 ${headphones ? 'text-accent' : 'text-muted-foreground'}`} />
                  <span className="text-sm">{headphones ? headphones.name : 'No headphones'}</span>
                </div>
                <span className={`status-indicator ${headphones ? 'active' : ''}`} />
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
        </div>
      </div>
    </div>
  );
}