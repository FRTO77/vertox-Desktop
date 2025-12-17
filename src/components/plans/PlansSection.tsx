import { useState } from 'react';
import { 
  Languages, 
  Radio, 
  Clock, 
  Calendar, 
  Users, 
  Shield, 
  ChevronRight, 
  ChevronLeft,
  Check,
  Download,
  CreditCard,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';

const TOTAL_STEPS = 7;

const sourceLanguages = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Russian' },
  { id: 'ja', name: 'Japanese' },
  { id: 'zh', name: 'Chinese' },
  { id: 'es', name: 'Spanish' },
  { id: 'de', name: 'German' },
  { id: 'fr', name: 'French' },
  { id: 'ar', name: 'Arabic' },
  { id: 'ko', name: 'Korean' },
  { id: 'pt', name: 'Portuguese' },
];

const targetLanguages = [
  { id: 'en', name: 'English' },
  { id: 'ru', name: 'Russian' },
  { id: 'ja', name: 'Japanese' },
  { id: 'zh', name: 'Chinese' },
  { id: 'es', name: 'Spanish' },
  { id: 'de', name: 'German' },
  { id: 'fr', name: 'French' },
  { id: 'ar', name: 'Arabic' },
  { id: 'ko', name: 'Korean' },
  { id: 'pt', name: 'Portuguese' },
  { id: 'it', name: 'Italian' },
  { id: 'nl', name: 'Dutch' },
  { id: 'pl', name: 'Polish' },
  { id: 'tr', name: 'Turkish' },
  { id: 'vi', name: 'Vietnamese' },
];

const translationFormats = [
  { 
    id: 'consecutive', 
    name: 'Consecutive', 
    description: 'Dialog meetings with alternating speakers' 
  },
  { 
    id: 'simultaneous', 
    name: 'Simultaneous', 
    description: 'Real-time translation with minimal delay' 
  },
  { 
    id: 'event', 
    name: 'Event + Q&A', 
    description: 'Stage to audience with bidirectional Q&A' 
  },
];

const durationPresets = [
  { id: '1h', name: '1 hour', hours: 1 },
  { id: '2h', name: '2 hours', hours: 2 },
  { id: '4h', name: '4 hours', hours: 4 },
  { id: '8h', name: 'Full day (8h)', hours: 8 },
  { id: 'custom', name: 'Custom', hours: 0 },
];

const eventTypes = [
  { id: 'conference', name: 'Conference' },
  { id: 'corporate', name: 'Corporate Meeting' },
  { id: 'training', name: 'Training / Workshop' },
  { id: 'sales', name: 'Sales Presentation' },
  { id: 'medical', name: 'Medical' },
  { id: 'legal', name: 'Legal' },
  { id: 'government', name: 'Government' },
  { id: 'education', name: 'Education' },
  { id: 'online', name: 'Online / Hybrid' },
  { id: 'other', name: 'Others' },
];

const participantRanges = [
  { id: '1-5', name: '1–5 participants', min: 1, max: 5 },
  { id: '6-20', name: '6–20 participants', min: 6, max: 20 },
  { id: '21-100', name: '21–100 participants', min: 21, max: 100 },
  { id: '100-500', name: '100–500 participants', min: 100, max: 500 },
  { id: '500+', name: '500+ participants', min: 500, max: 10000 },
];

const criticalityLevels = [
  { 
    id: 'internal', 
    name: 'Internal', 
    description: 'Low criticality, internal communications' 
  },
  { 
    id: 'business', 
    name: 'Business-critical', 
    description: 'Important business operations and decisions' 
  },
  { 
    id: 'high', 
    name: 'High responsibility', 
    description: 'Medical, legal, and compliance-sensitive content' 
  },
  { 
    id: 'mission', 
    name: 'Mission-critical', 
    description: 'Government, public events, zero-tolerance for errors' 
  },
];

const stepInfo = [
  { 
    title: 'Languages', 
    icon: Languages,
    description: 'Languages define translation complexity and model selection.' 
  },
  { 
    title: 'Translation Format', 
    icon: Radio,
    description: 'Translation format defines real-time load and latency tolerance.' 
  },
  { 
    title: 'Usage Duration', 
    icon: Clock,
    description: 'Total usage time defines AI translation minutes consumed.' 
  },
  { 
    title: 'Event Type', 
    icon: Calendar,
    description: 'Event type determines accuracy level and terminology handling.' 
  },
  { 
    title: 'Participants', 
    icon: Users,
    description: 'Participant count impacts real-time audio streams and distribution.' 
  },
  { 
    title: 'Criticality Level', 
    icon: Shield,
    description: 'Higher responsibility requires increased reliability and monitoring.' 
  },
  { 
    title: 'Summary & Price', 
    icon: CreditCard,
    description: 'Review your configuration and proceed to payment.' 
  },
];

export function PlansSection() {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1: Languages
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [selectedTargetLanguages, setSelectedTargetLanguages] = useState<string[]>([]);
  
  // Step 2: Translation Format
  const [translationFormat, setTranslationFormat] = useState('');
  
  // Step 3: Duration
  const [durationPreset, setDurationPreset] = useState('');
  const [customHours, setCustomHours] = useState('');
  
  // Step 4: Event Type
  const [eventType, setEventType] = useState('');
  
  // Step 5: Participants
  const [participantRange, setParticipantRange] = useState('');
  
  // Step 6: Criticality
  const [criticalityLevel, setCriticalityLevel] = useState('');

  const getEffectiveHours = () => {
    if (durationPreset === 'custom') {
      return parseFloat(customHours) || 0;
    }
    return durationPresets.find(d => d.id === durationPreset)?.hours || 0;
  };

  const calculatePrice = () => {
    let basePrice = 0;
    
    // Language complexity
    const langCount = selectedTargetLanguages.length;
    basePrice += langCount * 150;
    
    // Translation format multiplier
    const formatMultipliers: Record<string, number> = {
      consecutive: 1,
      simultaneous: 1.5,
      event: 1.8,
    };
    const formatMultiplier = formatMultipliers[translationFormat] || 1;
    
    // Duration
    const hours = getEffectiveHours();
    const minuteRate = 2.5;
    basePrice += hours * 60 * minuteRate;
    
    // Event type pricing
    const eventPricing: Record<string, number> = {
      conference: 200,
      corporate: 150,
      training: 100,
      sales: 150,
      medical: 400,
      legal: 450,
      government: 500,
      education: 100,
      online: 80,
      other: 120,
    };
    basePrice += eventPricing[eventType] || 100;
    
    // Participant scaling
    const participantPricing: Record<string, number> = {
      '1-5': 1,
      '6-20': 1.2,
      '21-100': 1.5,
      '100-500': 2,
      '500+': 3,
    };
    const participantMultiplier = participantPricing[participantRange] || 1;
    
    // Criticality pricing
    const criticalityPricing: Record<string, number> = {
      internal: 1,
      business: 1.3,
      high: 1.8,
      mission: 2.5,
    };
    const criticalityMultiplier = criticalityPricing[criticalityLevel] || 1;
    
    const finalPrice = basePrice * formatMultiplier * participantMultiplier * criticalityMultiplier;
    return Math.round(finalPrice);
  };

  const getTotalMinutes = () => {
    return getEffectiveHours() * 60;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return sourceLanguage && selectedTargetLanguages.length > 0;
      case 2:
        return translationFormat !== '';
      case 3:
        return durationPreset !== '' && (durationPreset !== 'custom' || customHours !== '');
      case 4:
        return eventType !== '';
      case 5:
        return participantRange !== '';
      case 6:
        return criticalityLevel !== '';
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && canProceed()) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getLanguageName = (id: string) => {
    return [...sourceLanguages, ...targetLanguages].find(l => l.id === id)?.name || id;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            {/* Source Language */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Source Language</h3>
              <p className="text-sm text-muted-foreground">Select the primary language being spoken</p>
              <Select value={sourceLanguage} onValueChange={setSourceLanguage}>
                <SelectTrigger className="w-full max-w-md">
                  <SelectValue placeholder="Select source language" />
                </SelectTrigger>
                <SelectContent>
                  {sourceLanguages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Languages */}
            <div className="space-y-4">
              <h3 className="font-medium text-lg">Target Language(s)</h3>
              <p className="text-sm text-muted-foreground">Select one or more languages for translation output</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {targetLanguages
                  .filter(lang => lang.id !== sourceLanguage)
                  .map((lang) => (
                    <label
                      key={lang.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedTargetLanguages.includes(lang.id)
                          ? 'bg-primary/10 border border-primary/30'
                          : 'bg-secondary/50 hover:bg-secondary border border-transparent'
                      }`}
                    >
                      <Checkbox
                        checked={selectedTargetLanguages.includes(lang.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedTargetLanguages([...selectedTargetLanguages, lang.id]);
                          } else {
                            setSelectedTargetLanguages(selectedTargetLanguages.filter(l => l !== lang.id));
                          }
                        }}
                      />
                      <span className="text-sm">{lang.name}</span>
                    </label>
                  ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <RadioGroup value={translationFormat} onValueChange={setTranslationFormat} className="space-y-4">
              {translationFormats.map((format) => (
                <label
                  key={format.id}
                  className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-colors ${
                    translationFormat === format.id
                      ? 'bg-primary/10 border-2 border-primary/50'
                      : 'bg-secondary/50 hover:bg-secondary border-2 border-transparent'
                  }`}
                >
                  <RadioGroupItem value={format.id} id={format.id} className="mt-1" />
                  <div>
                    <Label htmlFor={format.id} className="text-base font-medium cursor-pointer">
                      {format.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{format.description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <RadioGroup value={durationPreset} onValueChange={setDurationPreset} className="space-y-3">
              {durationPresets.map((preset) => (
                <label
                  key={preset.id}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                    durationPreset === preset.id
                      ? 'bg-primary/10 border-2 border-primary/50'
                      : 'bg-secondary/50 hover:bg-secondary border-2 border-transparent'
                  }`}
                >
                  <RadioGroupItem value={preset.id} id={preset.id} />
                  <Label htmlFor={preset.id} className="text-base cursor-pointer flex-1">
                    {preset.name}
                  </Label>
                  {preset.id !== 'custom' && (
                    <span className="text-sm text-muted-foreground">{preset.hours * 60} minutes</span>
                  )}
                </label>
              ))}
            </RadioGroup>

            {durationPreset === 'custom' && (
              <div className="space-y-2 pl-8">
                <Label htmlFor="customHours">Custom duration (hours)</Label>
                <Input
                  id="customHours"
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={customHours}
                  onChange={(e) => setCustomHours(e.target.value)}
                  placeholder="Enter hours"
                  className="max-w-[200px]"
                />
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent>
                {eventTypes.map((event) => (
                  <SelectItem key={event.id} value={event.id}>
                    {event.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case 5:
        return (
          <div className="space-y-4">
            <RadioGroup value={participantRange} onValueChange={setParticipantRange} className="space-y-3">
              {participantRanges.map((range) => (
                <label
                  key={range.id}
                  className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-colors ${
                    participantRange === range.id
                      ? 'bg-primary/10 border-2 border-primary/50'
                      : 'bg-secondary/50 hover:bg-secondary border-2 border-transparent'
                  }`}
                >
                  <RadioGroupItem value={range.id} id={range.id} />
                  <Label htmlFor={range.id} className="text-base cursor-pointer">
                    {range.name}
                  </Label>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 6:
        return (
          <div className="space-y-4">
            <RadioGroup value={criticalityLevel} onValueChange={setCriticalityLevel} className="space-y-4">
              {criticalityLevels.map((level) => (
                <label
                  key={level.id}
                  className={`flex items-start gap-4 p-5 rounded-xl cursor-pointer transition-colors ${
                    criticalityLevel === level.id
                      ? 'bg-primary/10 border-2 border-primary/50'
                      : 'bg-secondary/50 hover:bg-secondary border-2 border-transparent'
                  }`}
                >
                  <RadioGroupItem value={level.id} id={level.id} className="mt-1" />
                  <div>
                    <Label htmlFor={level.id} className="text-base font-medium cursor-pointer">
                      {level.name}
                    </Label>
                    <p className="text-sm text-muted-foreground mt-1">{level.description}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        );

      case 7:
        return (
          <div className="space-y-8">
            {/* Configuration Summary */}
            <div className="glass-card p-6 space-y-4">
              <h3 className="font-semibold text-lg">Configuration Summary</h3>
              
              <div className="grid gap-4">
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Source Language</span>
                  <span className="font-medium">{getLanguageName(sourceLanguage)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Target Languages</span>
                  <span className="font-medium text-right">
                    {selectedTargetLanguages.map(getLanguageName).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Translation Format</span>
                  <span className="font-medium">
                    {translationFormats.find(f => f.id === translationFormat)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-medium">
                    {durationPreset === 'custom' 
                      ? `${customHours} hours` 
                      : durationPresets.find(d => d.id === durationPreset)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Event Type</span>
                  <span className="font-medium">
                    {eventTypes.find(e => e.id === eventType)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Participants</span>
                  <span className="font-medium">
                    {participantRanges.find(p => p.id === participantRange)?.name}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/50">
                  <span className="text-muted-foreground">Criticality Level</span>
                  <span className="font-medium">
                    {criticalityLevels.find(c => c.id === criticalityLevel)?.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Display */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-accent/10 border border-primary/20">
              <div className="text-center space-y-4">
                <p className="text-muted-foreground">Total Price</p>
                <p className="text-5xl font-bold text-primary">${calculatePrice().toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">
                  Includes <span className="font-medium text-foreground">{getTotalMinutes().toLocaleString()} minutes</span> of AI translation
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="default" size="lg" className="flex-1 gap-2">
                <CreditCard className="w-5 h-5" />
                Proceed to Payment
              </Button>
              <Button variant="outline" size="lg" className="flex-1 gap-2">
                <Download className="w-5 h-5" />
                Download Proposal
              </Button>
              <Button variant="outline" size="lg" className="flex-1 gap-2">
                <Phone className="w-5 h-5" />
                Contact Sales
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const CurrentStepIcon = stepInfo[currentStep - 1].icon;

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Configure Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Build a custom translation solution tailored to your needs
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between gap-2 px-4">
        {stepInfo.map((step, index) => {
          const StepIcon = step.icon;
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={step.title} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : isCompleted
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <StepIcon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-xs mt-2 text-center hidden md:block ${
                  isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                }`}>
                  {step.title}
                </span>
              </div>
              {index < stepInfo.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 ${
                    isCompleted ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <CurrentStepIcon className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              Step {currentStep}: {stepInfo[currentStep - 1].title}
            </h2>
            <p className="text-sm text-muted-foreground">
              {stepInfo[currentStep - 1].description}
            </p>
          </div>
        </div>

        {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </Button>

        {currentStep < TOTAL_STEPS && (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
