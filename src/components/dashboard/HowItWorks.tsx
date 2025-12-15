import { Mic, Languages, Headphones, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Mic,
    title: 'Connect Your Mic',
    description: 'Plug in your microphone or headset and select it in settings',
  },
  {
    icon: Languages,
    title: 'Choose Languages',
    description: 'Select source and target languages for translation',
  },
  {
    icon: Headphones,
    title: 'Get Translation',
    description: 'Hear real-time translated audio in your headphones',
  },
];

export function HowItWorks() {
  return (
    <section className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-6 text-center">How It Works</h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
        {steps.map((step, index) => (
          <div key={step.title} className="flex items-center gap-4 md:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mb-3">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-xs text-muted-foreground max-w-[160px]">{step.description}</p>
            </div>
            {index < steps.length - 1 && (
              <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
