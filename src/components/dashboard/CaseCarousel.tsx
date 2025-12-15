import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ImageLightbox } from '@/components/ui/image-lightbox';

const conferenceImages = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    title: 'Tech Summit 2024',
    location: 'San Francisco',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&h=400&fit=crop',
    title: 'Global Business Forum',
    location: 'London',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600&h=400&fit=crop',
    title: 'Healthcare Innovation',
    location: 'Berlin',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&h=400&fit=crop',
    title: 'Finance Leaders Summit',
    location: 'Singapore',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=600&h=400&fit=crop',
    title: 'Product Conference',
    location: 'Tokyo',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&h=400&fit=crop',
    title: 'Enterprise Connect',
    location: 'Dubai',
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&h=400&fit=crop',
    title: 'AI & ML Conference',
    location: 'Paris',
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&h=400&fit=crop',
    title: 'World Trade Summit',
    location: 'New York',
  },
];

export function CaseCarousel() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = conferenceImages.map(item => ({
    src: item.image,
    alt: item.title,
    title: `${item.title} - ${item.location}`,
  }));

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Success Stories</h2>
          <p className="text-sm text-muted-foreground mt-1">See VertoX in action at global conferences</p>
        </div>
        <a href="#" className="flex items-center gap-1 text-sm text-primary font-medium hover:underline">
          View all cases
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      {/* Masonry-style Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {conferenceImages.map((item, index) => {
          const isLarge = index === 0 || index === 5;
          const isMedium = index === 2 || index === 7;
          
          return (
            <div 
              key={item.id}
              onClick={() => handleImageClick(index)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                isLarge ? 'row-span-2 md:col-span-2 lg:col-span-1 lg:row-span-2' : 
                isMedium ? 'row-span-1' : 'row-span-1'
              }`}
            >
              <div className={`relative overflow-hidden ${isLarge ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 delay-75">
                    {item.location}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      <ImageLightbox
        images={lightboxImages}
        initialIndex={selectedIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
