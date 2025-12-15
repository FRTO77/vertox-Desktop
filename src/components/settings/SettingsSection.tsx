import { useState } from 'react';
import { 
  Mic, 
  Headphones, 
  Bell, 
  Globe, 
  Volume2,
  Check,
  Sparkles,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ProfileSection } from './ProfileSection';
import { ThemeSection } from './ThemeSection';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const microphones = [
  { id: 'default', name: 'System Default', type: 'Built-in' },
  { id: 'airpods', name: 'AirPods Pro', type: 'Bluetooth' },
  { id: 'yeti', name: 'Blue Yeti X', type: 'USB' },
  { id: 'rode', name: 'Rode NT-USB', type: 'USB' },
];

const headphones = [
  { id: 'default', name: 'System Default', type: 'Built-in' },
  { id: 'airpods', name: 'AirPods Pro', type: 'Bluetooth' },
  { id: 'sony', name: 'Sony WH-1000XM5', type: 'Bluetooth' },
  { id: 'speakers', name: 'External Speakers', type: 'USB' },
];

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
];

export function SettingsSection() {
  const [selectedMic, setSelectedMic] = useState('yeti');
  const [selectedHeadphones, setSelectedHeadphones] = useState('sony');
  const [inputVolume, setInputVolume] = useState([75]);
  const [outputVolume, setOutputVolume] = useState([80]);
  const [speakerLang, setSpeakerLang] = useState('en');
  const [listenerLang, setListenerLang] = useState('es');
  
  const [notifications, setNotifications] = useState({
    sessionReminders: true,
    translationComplete: true,
    deviceChanges: false,
    updates: true,
    marketing: false,
  });

  const updateNotification = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Configure your profile, devices, theme, and preferences</p>
      </div>

      {/* Profile & Theme Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProfileSection />
        <ThemeSection />
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Audio Devices Section */}
        <div className="glass-card p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <Volume2 className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Audio Devices</h2>
              <p className="text-sm text-muted-foreground">Select your input and output devices</p>
            </div>
          </div>

          {/* Microphone Selection */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Mic className="w-4 h-4 text-primary" />
              <span>Microphone</span>
            </div>
            
            <div className="grid gap-2">
              {microphones.map((mic) => (
                <button
                  key={mic.id}
                  onClick={() => setSelectedMic(mic.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedMic === mic.id 
                      ? 'border-primary bg-primary/5 shadow-sm' 
                      : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedMic === mic.id ? 'bg-primary/20' : 'bg-secondary'
                    }`}>
                      <Mic className={`w-4 h-4 ${selectedMic === mic.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{mic.name}</p>
                      <p className="text-xs text-muted-foreground">{mic.type}</p>
                    </div>
                  </div>
                  {selectedMic === mic.id && (
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Input Volume */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Input Volume</span>
                <span className="text-sm font-medium">{inputVolume}%</span>
              </div>
              <Slider
                value={inputVolume}
                onValueChange={setInputVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Headphones Selection */}
          <div className="space-y-4 pt-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Headphones className="w-4 h-4 text-accent" />
              <span>Headphones / Speakers</span>
            </div>
            
            <div className="grid gap-2">
              {headphones.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedHeadphones(device.id)}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedHeadphones === device.id 
                      ? 'border-accent bg-accent/5 shadow-sm' 
                      : 'border-border hover:border-accent/50 hover:bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      selectedHeadphones === device.id ? 'bg-accent/20' : 'bg-secondary'
                    }`}>
                      <Headphones className={`w-4 h-4 ${selectedHeadphones === device.id ? 'text-accent' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-xs text-muted-foreground">{device.type}</p>
                    </div>
                  </div>
                  {selectedHeadphones === device.id && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Output Volume */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Output Volume</span>
                <span className="text-sm font-medium">{outputVolume}%</span>
              </div>
              <Slider
                value={outputVolume}
                onValueChange={setOutputVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Test Audio */}
          <Button variant="outline" className="w-full gap-2 mt-4">
            <Sparkles className="w-4 h-4" />
            Test Audio Configuration
          </Button>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Language Defaults */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Language Defaults</h2>
                <p className="text-sm text-muted-foreground">Set your preferred translation languages</p>
              </div>
            </div>

            <div className="grid gap-4">
              {/* Speaker Language */}
              <div className="space-y-2">
                <Label className="text-sm">Your Language (Speaker)</Label>
                <Select value={speakerLang} onValueChange={setSpeakerLang}>
                  <SelectTrigger className="w-full h-12 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Listener Language */}
              <div className="space-y-2">
                <Label className="text-sm">Target Language (Listener)</Label>
                <Select value={listenerLang} onValueChange={setListenerLang}>
                  <SelectTrigger className="w-full h-12 bg-background/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span className="text-lg">{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Quick Preview */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Translation Preview</p>
              <div className="flex items-center gap-3 text-sm">
                <span className="font-medium">{languages.find(l => l.code === speakerLang)?.flag} {languages.find(l => l.code === speakerLang)?.name}</span>
                <span className="text-muted-foreground">→</span>
                <span className="font-medium">{languages.find(l => l.code === listenerLang)?.flag} {languages.find(l => l.code === listenerLang)?.name}</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                <p className="text-sm text-muted-foreground">Manage your notification preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { key: 'sessionReminders', label: 'Session Reminders', desc: 'Get notified before scheduled sessions' },
                { key: 'translationComplete', label: 'Translation Complete', desc: 'Notify when translations are finished' },
                { key: 'deviceChanges', label: 'Device Changes', desc: 'Alert when audio devices connect/disconnect' },
                { key: 'updates', label: 'App Updates', desc: 'Notify about new versions and features' },
                { key: 'marketing', label: 'Marketing', desc: 'Receive tips and promotional content' },
              ].map((item) => (
                <div 
                  key={item.key}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <div className="space-y-0.5">
                    <Label className="font-medium cursor-pointer">{item.label}</Label>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={() => updateNotification(item.key as keyof typeof notifications)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass-card p-6 border-destructive/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
            <Trash2 className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
            <p className="text-sm text-muted-foreground">Irreversible actions</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
            <div>
              <p className="font-medium">Clear All Sessions</p>
              <p className="text-xs text-muted-foreground">Delete all translation history and transcripts</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground">
                  Clear Sessions
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Clear All Sessions?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your translation sessions and transcripts. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => toast.success('All sessions have been cleared')}
                  >
                    Yes, Clear All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
            <div>
              <p className="font-medium">Reset All Settings</p>
              <p className="text-xs text-muted-foreground">Restore all settings to their default values</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground">
                  Reset Settings
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Reset All Settings?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all your preferences, language settings, and configurations to their defaults. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => toast.success('Settings have been reset to defaults')}
                  >
                    Yes, Reset All
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-destructive/20 bg-destructive/5">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="bg-background border-border">
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    Delete Your Account?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete your account, all sessions, settings, and personal data. This action is irreversible.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    onClick={() => toast.success('Account deletion request submitted')}
                  >
                    Yes, Delete My Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex items-center justify-end gap-3 pt-4">
        <Button variant="outline">Reset to Defaults</Button>
        <Button variant="accent" className="gap-2">
          <Check className="w-4 h-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}
