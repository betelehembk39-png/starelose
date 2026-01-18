
import React, { useState } from 'react';
import { SpaceEvent } from '../types';
import { Star, Eye, Calendar, Activity, Globe } from 'lucide-react';

interface EventCardProps {
  event: SpaceEvent;
  onClick: (event: SpaceEvent) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const dateObj = new Date(event.date);
  const formattedDate = dateObj.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });

  const photoId = event.metadata?.photoId || '1446776811953-b23d57bd21aa';
  const imageUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=80`;

  return (
    <div 
      onClick={() => onClick(event)}
      className="group cursor-pointer flex flex-col gap-3"
    >
      <div className="relative aspect-square overflow-hidden rounded-[2rem] glass border border-white/5 shadow-2xl transition-all duration-500 group-hover:border-[#FDB927]/40 group-hover:shadow-[#FDB927]/10">
        {!imageLoaded && <div className="absolute inset-0 skeleton" />}
        
        <img 
          src={imageUrl} 
          alt={event.title}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1 ${imageLoaded ? 'opacity-70 group-hover:opacity-100' : 'opacity-0'}`}
          loading="lazy"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#552583]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        <div className="absolute top-4 left-4 px-3 py-1.5 glass-dark border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-xl backdrop-blur-md">
          {formattedDate}
        </div>
        
        <div className="absolute top-4 right-4 p-2 glass-dark border border-white/10 rounded-full text-white/40 group-hover:text-[#FDB927] transition-colors">
          <Activity className="w-5 h-5" />
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
           <p className="text-[11px] font-bold text-[#FDB927] line-clamp-2 leading-relaxed italic uppercase tracking-tighter">
             {event.description}
           </p>
        </div>
      </div>
      
      <div className="px-1">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-black italic text-white text-[17px] line-clamp-1 leading-tight group-hover:text-[#FDB927] transition-colors uppercase tracking-tighter -skew-x-6">
            {event.title}
          </h3>
          <div className="flex items-center gap-1 text-xs shrink-0 bg-[#FDB927]/10 px-2 py-0.5 rounded-full border border-[#FDB927]/20">
            <Star className="w-3 h-3 fill-[#FDB927] text-[#FDB927]" />
            <span className="font-black text-[#FDB927]">{(event.metadata?.rarity || 4.5).toFixed(1)}</span>
          </div>
        </div>
        
        <div className="flex flex-col text-[13px] text-white/40 leading-snug">
          <span className="truncate flex items-center gap-1.5">
            <Globe className="w-3 h-3" /> {event.location}
          </span>
          <span className="flex items-center gap-1.5 mt-1 font-bold text-white/60">
            <Eye className="w-3.5 h-3.5 text-[#FDB927]" /> {event.metadata?.visibility || 'Championship Grade'}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
           <div className="text-[12px] font-black text-[#FDB927] flex items-center gap-1.5 uppercase italic">
              Showtime <span className="w-1.5 h-1.5 bg-[#FDB927] rounded-full animate-ping"></span> <span className="font-normal text-white/40 uppercase tracking-tighter not-italic">Full Access</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
