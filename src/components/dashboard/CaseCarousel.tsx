import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const cases = [
  {
    id: 1,
    company: 'TechCorp Global',
    industry: 'Technology',
    description: 'Reduced international meeting prep time by 85% with real-time translation',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=500&fit=crop',
  },
  {
    id: 2,
    company: 'Meridian Finance',
    industry: 'Financial Services',
    description: 'Enabled seamless client communications across 12 language regions',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=500&fit=crop',
  },
  {
    id: 3,
    company: 'Nordic Health',
    industry: 'Healthcare',
    description: 'Improved patient consultation quality with accurate medical translation',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=500&fit=crop',
  },
  {
    id: 4,
    company: 'Atlas Manufacturing',
    industry: 'Manufacturing',
    description: 'Connected global supply chain teams with zero language barriers',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop',
  },
];

export function CaseCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % cases.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + cases.length) % cases.length);

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Success Stories</h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={prev} className="h-8 w-8">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={next} className="h-8 w-8">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-out-expo"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cases.map((caseItem) => (
            <div key={caseItem.id} className="w-full flex-shrink-0 px-1">
              <div className="glass-card overflow-hidden group hover-lift">
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={caseItem.image}
                    alt={caseItem.company}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
                      {caseItem.industry}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{caseItem.company}</h3>
                  <p className="text-sm text-muted-foreground">{caseItem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 pt-2">
        {cases.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              index === currentIndex 
                ? 'bg-primary w-6' 
                : 'bg-border hover:bg-muted-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
