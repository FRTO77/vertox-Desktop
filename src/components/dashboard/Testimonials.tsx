import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP of Global Operations',
    company: 'TechCorp',
    content: 'VertoX transformed how we conduct international meetings. The translation quality is remarkable and the latency is nearly imperceptible.',
    avatar: 'SC',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Weber',
    role: 'Head of Client Relations',
    company: 'Meridian Finance',
    content: 'Our client satisfaction scores increased 40% after implementing VertoX for multilingual support. Game-changing technology.',
    avatar: 'MW',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Elena Kowalski',
    role: 'Chief Medical Officer',
    company: 'Nordic Health',
    content: 'Accurate medical terminology translation has been crucial for our international patient care. VertoX delivers consistently.',
    avatar: 'EK',
    rating: 5,
  },
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">What Companies Say</h2>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="w-8 h-8 rounded-full"
            onClick={handleNext}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div 
          className={`glass-card p-6 transition-all duration-400 ease-out ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}
        >
          {/* Quote Icon */}
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
            <Quote className="w-5 h-5 text-primary/40" />
          </div>

          {/* Rating */}
          <div className="flex gap-0.5 mb-4">
            {[...Array(activeTestimonial.rating)].map((_, i) => (
              <Star 
                key={i} 
                className="w-4 h-4 fill-amber-400 text-amber-400"
                style={{ 
                  animationDelay: `${i * 80}ms`,
                  animation: isAnimating ? 'none' : 'scale-in 0.3s ease-out forwards'
                }}
              />
            ))}
          </div>

          {/* Content */}
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed italic">
            "{activeTestimonial.content}"
          </p>

          {/* Author */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-primary-foreground shadow-lg">
                {activeTestimonial.avatar}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-accent flex items-center justify-center shadow-sm">
                <svg className="w-2.5 h-2.5 text-accent-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div>
              <p className="font-semibold">{activeTestimonial.name}</p>
              <p className="text-xs text-muted-foreground">
                {activeTestimonial.role}
              </p>
              <p className="text-xs text-primary font-medium">
                {activeTestimonial.company}
              </p>
            </div>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return;
                setIsAnimating(true);
                setActiveIndex(index);
                setTimeout(() => setIsAnimating(false), 400);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex 
                  ? 'w-6 bg-primary' 
                  : 'w-1.5 bg-border hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
