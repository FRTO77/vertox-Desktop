import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageLightbox } from '@/components/ui/image-lightbox';

const allCases = [
  { id: 1, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop', title: 'Tech Summit 2024', location: 'San Francisco', industry: 'Technology' },
  { id: 2, image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop', title: 'Global Business Forum', location: 'London', industry: 'Business' },
  { id: 3, image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop', title: 'Healthcare Innovation', location: 'Berlin', industry: 'Healthcare' },
  { id: 4, image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop', title: 'Finance Leaders Summit', location: 'Singapore', industry: 'Finance' },
  { id: 5, image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop', title: 'Product Conference', location: 'Tokyo', industry: 'Technology' },
  { id: 6, image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&h=400&fit=crop', title: 'Enterprise Connect', location: 'Dubai', industry: 'Enterprise' },
  { id: 7, image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop', title: 'AI & ML Conference', location: 'Paris', industry: 'Technology' },
  { id: 8, image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop', title: 'World Trade Summit', location: 'New York', industry: 'Trade' },
  { id: 9, image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop', title: 'TechCorp Annual Meeting', location: 'Seattle', industry: 'Technology' },
  { id: 10, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', title: 'Medical Conference 2024', location: 'Boston', industry: 'Healthcare' },
  { id: 11, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop', title: 'Manufacturing Expo', location: 'Munich', industry: 'Manufacturing' },
  { id: 12, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop', title: 'Meridian Finance Summit', location: 'Zurich', industry: 'Finance' },
];

const Cases = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = allCases.map(item => ({
    src: item.image,
    alt: item.title,
    title: `${item.title} - ${item.location}`,
  }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/">
          <Button variant="ghost" className="mb-8 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Success Stories</h1>
            <p className="text-muted-foreground mt-1">See how companies use VertoX at global events</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search cases..." className="pl-9 w-64" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allCases.map((item, index) => (
            <div 
              key={item.id}
              onClick={() => handleImageClick(index)}
              className="group relative overflow-hidden rounded-2xl cursor-pointer aspect-[4/3]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <span className="text-xs font-medium text-white/80 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full w-fit mb-2">
                  {item.industry}
                </span>
                <h3 className="text-white font-semibold text-sm mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  {item.title}
                </h3>
                <p className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                  {item.location}
                </p>
              </div>

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight className="w-4 h-4 text-white" />
              </div>
            </div>
          ))}
        </div>

        <ImageLightbox
          images={lightboxImages}
          initialIndex={selectedIndex}
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />
      </div>
    </div>
  );
};

export default Cases;
