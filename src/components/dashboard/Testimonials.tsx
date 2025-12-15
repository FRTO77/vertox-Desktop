import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP of Global Operations',
    company: 'TechCorp',
    content: 'VertoX transformed how we conduct international meetings. The translation quality is remarkable.',
    avatar: 'SC',
    rating: 5,
  },
  {
    id: 2,
    name: 'Marcus Weber',
    role: 'Head of Client Relations',
    company: 'Meridian Finance',
    content: 'Our client satisfaction scores increased 40% after implementing VertoX for multilingual support.',
    avatar: 'MW',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Elena Kowalski',
    role: 'Chief Medical Officer',
    company: 'Nordic Health',
    content: 'Accurate medical terminology translation has been crucial for our international patient care.',
    avatar: 'EK',
    rating: 5,
  },
  {
    id: 4,
    name: 'Takeshi Yamamoto',
    role: 'Director of Engineering',
    company: 'Sakura Tech',
    content: 'The low latency makes VertoX perfect for our fast-paced engineering discussions.',
    avatar: 'TY',
    rating: 5,
  },
  {
    id: 5,
    name: 'Isabella Rodriguez',
    role: 'CEO',
    company: 'Global Ventures',
    content: 'We closed 3x more international deals since adopting VertoX. Game-changing technology.',
    avatar: 'IR',
    rating: 5,
  },
  {
    id: 6,
    name: 'Hans Müller',
    role: 'Operations Manager',
    company: 'Euro Manufacturing',
    content: 'Our factory teams across Europe now communicate seamlessly. Productivity is up 25%.',
    avatar: 'HM',
    rating: 5,
  },
];

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] glass-card p-5 mx-3 group hover:border-primary/30 transition-all duration-300">
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
        <Quote className="w-4 h-4 text-primary/60" />
      </div>

      {/* Rating */}
      <div className="flex gap-0.5 mb-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
          />
        ))}
      </div>

      {/* Content */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-semibold text-primary-foreground">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-medium text-sm">{testimonial.name}</p>
          <p className="text-xs text-muted-foreground">
            {testimonial.role} · <span className="text-primary">{testimonial.company}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">What Companies Say</h2>
          <p className="text-sm text-muted-foreground mt-1">Trusted by industry leaders worldwide</p>
        </div>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative overflow-hidden">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Scrolling Track */}
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {duplicatedTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
