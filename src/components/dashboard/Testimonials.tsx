import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'VP of Global Operations',
    company: 'TechCorp',
    content: 'VertoX transformed how we conduct international meetings. The translation quality is remarkable.',
    avatar: 'SC',
  },
  {
    id: 2,
    name: 'Marcus Weber',
    role: 'Head of Client Relations',
    company: 'Meridian Finance',
    content: 'Our client satisfaction scores increased 40% after implementing VertoX for multilingual support.',
    avatar: 'MW',
  },
  {
    id: 3,
    name: 'Dr. Elena Kowalski',
    role: 'Chief Medical Officer',
    company: 'Nordic Health',
    content: 'Accurate medical terminology translation has been crucial for our international patient care.',
    avatar: 'EK',
  },
];

export function Testimonials() {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">What Companies Say</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className="glass-card p-5 hover-lift"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Quote className="w-8 h-8 text-primary/20 mb-3" />
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              "{testimonial.content}"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-medium">
                {testimonial.avatar}
              </div>
              <div>
                <p className="text-sm font-medium">{testimonial.name}</p>
                <p className="text-xs text-muted-foreground">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
