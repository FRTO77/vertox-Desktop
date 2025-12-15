import { useState } from 'react';
import { Check, Zap, Building, Crown, Calculator, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

const plans = [
  {
    id: '3mo',
    name: 'Starter',
    duration: '3 months',
    price: 2999,
    icon: Zap,
    features: [
      '500 minutes/month',
      '5 languages',
      'Email support',
      'Basic analytics',
    ],
  },
  {
    id: '6mo',
    name: 'Professional',
    duration: '6 months',
    price: 5999,
    icon: Building,
    popular: true,
    features: [
      '2,000 minutes/month',
      '15 languages',
      'Priority support',
      'Advanced analytics',
      'Team collaboration',
    ],
  },
  {
    id: '12mo',
    name: 'Enterprise',
    duration: '12 months',
    price: 11999,
    icon: Crown,
    features: [
      'Unlimited minutes',
      'All 50+ languages',
      '24/7 dedicated support',
      'Custom integrations',
      'API access',
      'SLA guarantee',
    ],
  },
];

const scenarios = [
  { id: 'negotiations', name: 'Negotiations', price: 50 },
  { id: 'webinars', name: 'Webinars', price: 75 },
  { id: 'support', name: 'Customer Support', price: 40 },
  { id: 'training', name: 'Training', price: 60 },
];

const availableLanguages = [
  { id: 'ru', name: 'Russian' },
  { id: 'kk', name: 'Kazakh' },
  { id: 'uz', name: 'Uzbek' },
  { id: 'es', name: 'Spanish' },
  { id: 'en', name: 'English' },
  { id: 'fr', name: 'French' },
  { id: 'de', name: 'German' },
  { id: 'ja', name: 'Japanese' },
];

export function PlansSection() {
  const [showCustomBuilder, setShowCustomBuilder] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState(['ru', 'en']);
  const [selectedScenarios, setSelectedScenarios] = useState<string[]>(['negotiations']);
  const [minutes, setMinutes] = useState([1000]);

  const calculateCustomPrice = () => {
    const languagePrice = selectedLanguages.length * 100;
    const scenarioPrice = scenarios
      .filter(s => selectedScenarios.includes(s.id))
      .reduce((acc, s) => acc + s.price, 0);
    const minutePrice = Math.round(minutes[0] * 0.5);
    return languagePrice + scenarioPrice + minutePrice;
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold">Choose Your Plan</h1>
        <p className="text-muted-foreground mt-2">
          Select a preset package or build a custom plan tailored to your needs
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="glass-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Current Plan</p>
          <p className="text-lg font-semibold">Professional - 6 months</p>
          <p className="text-sm text-muted-foreground mt-1">
            1,450 minutes remaining • Renews Jan 15, 2025
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">Manage Billing</Button>
          <Button variant="default" size="sm">Upgrade Plan</Button>
        </div>
      </div>

      {/* Preset Plans */}
      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id}
            className={`glass-card p-6 relative hover-lift ${
              plan.popular ? 'ring-2 ring-primary' : ''
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Most Popular
              </div>
            )}
            
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              }`}>
                <plan.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-xs text-muted-foreground">{plan.duration}</p>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-3xl font-bold">${plan.price.toLocaleString()}</span>
              <span className="text-muted-foreground text-sm"> /term</span>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className="w-full" 
              variant={plan.popular ? 'default' : 'outline'}
            >
              {plan.popular ? 'Get Started' : 'Select Plan'}
            </Button>
          </div>
        ))}
      </div>

      {/* Custom Plan Builder Toggle */}
      <div className="text-center">
        <Button 
          variant="ghost" 
          size="lg"
          onClick={() => setShowCustomBuilder(!showCustomBuilder)}
          className="gap-2"
        >
          <Calculator className="w-4 h-4" />
          {showCustomBuilder ? 'Hide Custom Builder' : 'Build Custom Plan'}
        </Button>
      </div>

      {/* Custom Plan Builder */}
      {showCustomBuilder && (
        <div className="glass-panel p-8 space-y-8 animate-scale-in">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Custom Plan Builder</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Configure exactly what you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Languages */}
            <div className="space-y-4">
              <h3 className="font-medium">Languages</h3>
              <div className="grid grid-cols-2 gap-2">
                {availableLanguages.map((lang) => (
                  <label
                    key={lang.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedLanguages.includes(lang.id)
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <Checkbox
                      checked={selectedLanguages.includes(lang.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLanguages([...selectedLanguages, lang.id]);
                        } else {
                          setSelectedLanguages(selectedLanguages.filter(l => l !== lang.id));
                        }
                      }}
                    />
                    <span className="text-sm">{lang.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Scenarios */}
            <div className="space-y-4">
              <h3 className="font-medium">Use Cases</h3>
              <div className="space-y-2">
                {scenarios.map((scenario) => (
                  <label
                    key={scenario.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedScenarios.includes(scenario.id)
                        ? 'bg-primary/10 border border-primary/30'
                        : 'bg-secondary/50 hover:bg-secondary'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={selectedScenarios.includes(scenario.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedScenarios([...selectedScenarios, scenario.id]);
                          } else {
                            setSelectedScenarios(selectedScenarios.filter(s => s !== scenario.id));
                          }
                        }}
                      />
                      <span className="text-sm">{scenario.name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">+${scenario.price}/mo</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Minutes Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Monthly Minutes</h3>
              <span className="text-lg font-semibold">{minutes[0].toLocaleString()} min</span>
            </div>
            <Slider
              value={minutes}
              onValueChange={setMinutes}
              min={100}
              max={10000}
              step={100}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>100 min</span>
              <span>10,000 min</span>
            </div>
          </div>

          {/* Price Summary */}
          <div className="flex items-center justify-between p-6 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
            <div>
              <p className="text-sm text-muted-foreground">Estimated Monthly Cost</p>
              <p className="text-3xl font-bold">${calculateCustomPrice().toLocaleString()}</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Save className="w-4 h-4" />
                Save Config
              </Button>
              <Button variant="hero">
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
