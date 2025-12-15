import { useState, useEffect } from 'react';
import { Mic, Headphones, Volume2, Check, RefreshCw } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';

interface AudioDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput' | 'audiooutput';
}

interface AudioDevicesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AudioDevicesDialog({ open, onOpenChange }: AudioDevicesDialogProps) {
  const [microphones, setMicrophones] = useState<AudioDevice[]>([]);
  const [speakers, setSpeakers] = useState<AudioDevice[]>([]);
  const [selectedMic, setSelectedMic] = useState<string>('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<string>('');
  const [micVolume, setMicVolume] = useState([80]);
  const [speakerVolume, setSpeakerVolume] = useState([70]);
  const [isLoading, setIsLoading] = useState(false);
  const [testingMic, setTestingMic] = useState(false);

  const loadDevices = async () => {
    setIsLoading(true);
    try {
      // Request permission first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      const mics = devices
        .filter(d => d.kind === 'audioinput')
        .map(d => ({
          deviceId: d.deviceId,
          label: d.label || `Microphone ${d.deviceId.slice(0, 5)}`,
          kind: 'audioinput' as const
        }));
      
      const outputs = devices
        .filter(d => d.kind === 'audiooutput')
        .map(d => ({
          deviceId: d.deviceId,
          label: d.label || `Speaker ${d.deviceId.slice(0, 5)}`,
          kind: 'audiooutput' as const
        }));

      setMicrophones(mics);
      setSpeakers(outputs);

      if (mics.length > 0 && !selectedMic) {
        setSelectedMic(mics[0].deviceId);
      }
      if (outputs.length > 0 && !selectedSpeaker) {
        setSelectedSpeaker(outputs[0].deviceId);
      }
    } catch (error) {
      console.error('Error loading audio devices:', error);
      toast.error('Could not access audio devices. Please check permissions.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadDevices();
    }
  }, [open]);

  const handleTestMicrophone = async () => {
    setTestingMic(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { deviceId: selectedMic ? { exact: selectedMic } : undefined }
      });
      
      // Create audio context for visualization
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      
      toast.success('Microphone is working! Speak to test...');
      
      // Stop after 3 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
        setTestingMic(false);
        toast.info('Microphone test completed');
      }, 3000);
    } catch (error) {
      console.error('Error testing microphone:', error);
      toast.error('Could not test microphone');
      setTestingMic(false);
    }
  };

  const handleTestSpeaker = () => {
    // Play a test sound
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 440; // A4 note
    gainNode.gain.value = speakerVolume[0] / 100 * 0.3;
    
    oscillator.start();
    
    setTimeout(() => {
      oscillator.stop();
      audioContext.close();
    }, 500);
    
    toast.success('Speaker test sound played');
  };

  const handleSave = () => {
    localStorage.setItem('selectedMicrophone', selectedMic);
    localStorage.setItem('selectedSpeaker', selectedSpeaker);
    localStorage.setItem('micVolume', micVolume[0].toString());
    localStorage.setItem('speakerVolume', speakerVolume[0].toString());
    
    toast.success('Audio settings saved');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Headphones className="w-5 h-5 text-primary" />
            Audio Devices
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Microphone Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                Microphone
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={loadDevices}
                disabled={isLoading}
              >
                <RefreshCw className={`w-3 h-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>

            <div className="space-y-2">
              {microphones.length === 0 ? (
                <p className="text-sm text-muted-foreground">No microphones found</p>
              ) : (
                microphones.map((mic) => (
                  <button
                    key={mic.deviceId}
                    onClick={() => setSelectedMic(mic.deviceId)}
                    className={`w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                      selectedMic === mic.deviceId
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <span className="text-sm truncate">{mic.label}</span>
                    {selectedMic === mic.deviceId && (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">Volume</span>
              <Slider
                value={micVolume}
                onValueChange={setMicVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-10">{micVolume[0]}%</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestMicrophone}
              disabled={testingMic || microphones.length === 0}
              className="w-full"
            >
              {testingMic ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse mr-2" />
                  Testing...
                </>
              ) : (
                <>
                  <Mic className="w-3 h-3 mr-2" />
                  Test Microphone
                </>
              )}
            </Button>
          </div>

          {/* Speaker Section */}
          <div className="space-y-4 pt-4 border-t border-border">
            <h3 className="font-medium flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-primary" />
              Speaker / Headphones
            </h3>

            <div className="space-y-2">
              {speakers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No speakers found</p>
              ) : (
                speakers.map((speaker) => (
                  <button
                    key={speaker.deviceId}
                    onClick={() => setSelectedSpeaker(speaker.deviceId)}
                    className={`w-full p-3 rounded-lg text-left transition-colors flex items-center justify-between ${
                      selectedSpeaker === speaker.deviceId
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <span className="text-sm truncate">{speaker.label}</span>
                    {selectedSpeaker === speaker.deviceId && (
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    )}
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground w-16">Volume</span>
              <Slider
                value={speakerVolume}
                onValueChange={setSpeakerVolume}
                max={100}
                step={1}
                className="flex-1"
              />
              <span className="text-sm font-medium w-10">{speakerVolume[0]}%</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestSpeaker}
              disabled={speakers.length === 0}
              className="w-full"
            >
              <Volume2 className="w-3 h-3 mr-2" />
              Test Speaker
            </Button>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Settings
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}