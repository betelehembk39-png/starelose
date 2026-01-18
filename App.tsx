
import React, { useState, useEffect, useMemo } from 'react';
import { Search, Globe, ChevronLeft, ChevronRight, SlidersHorizontal, Menu, User, Map, Sparkles, Zap, Box, Compass, Calendar, Star, Eye, Layers, Atom, Activity } from 'lucide-react';
import { SpaceEvent, EventType } from './types';
import { fetchSpaceEvents } from './services/geminiService';
import EventCard from './components/EventCard';
import EventModal from './components/EventModal';

const categories = [
  { id: 'All', label: 'Visible Universe', icon: Eye },
  { id: EventType.PHENOMENON, label: 'High Energy', icon: Activity },
  { id: EventType.PLANET, label: 'Orbital Transits', icon: Compass },
  { id: EventType.STATION, label: 'Deep Missions', icon: RocketIcon },
  { id: EventType.NEBULA, label: 'Interstellar Medium', icon: Layers },
];

function RocketIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
      <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
      <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
    </svg>
  );
}

// Lakers-inspired "Stellar" Logo
const StellarLogo = () => (
  <svg width="48" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Speed Lines */}
    <path d="M5 12H15M2 20H18M8 28H14" stroke="#FDB927" strokeWidth="2.5" strokeLinecap="round" />
    {/* The Ball/Planet */}
    <circle cx="35" cy="20" r="15" fill="#552583" stroke="#FDB927" strokeWidth="2" />
    {/* Basketball-style seams as planetary rings/lines */}
    <path d="M23 12C28 15 35 15 47 12" stroke="#FDB927" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M23 28C28 25 35 25 47 28" stroke="#FDB927" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <path d="M35 5V35" stroke="#FDB927" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Central Star */}
    <path d="M35 15L37 19H41L38 21L39 25L35 23L31 25L32 21L29 19H33L35 15Z" fill="#FDB927" />
  </svg>
);

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<SpaceEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<SpaceEvent | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<EventType | 'All'>('All');

  useEffect(() => {
    const loadEvents = async () => {
      setIsLoading(true);
      try {
        const data = await fetchSpaceEvents(currentDate.getMonth(), currentDate.getFullYear());
        setEvents(data);
      } catch (error) {
        console.error("Failed to load astronomical calendar", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadEvents();
  }, [currentDate.getMonth(), currentDate.getFullYear()]);

  const filteredEvents = useMemo(() => {
    return events.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          e.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === 'All' || e.type === filterType;
      return matchesSearch && matchesFilter;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, searchQuery, filterType]);

  const changeMonth = (offset: number) => {
    const next = new Date(currentDate);
    next.setMonth(currentDate.getMonth() + offset);
    setCurrentDate(next);
  };

  return (
    <div className="min-h-screen flex flex-col text-white">
      {/* Header with Glassmorphism */}
      <header className="sticky top-0 z-50 glass-dark border-b border-white/10 px-6 sm:px-12 py-4">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="hidden lg:flex items-center gap-1 cursor-pointer group" onClick={() => window.location.reload()}>
            <StellarLogo />
            <span className="text-3xl font-black italic tracking-tighter text-white group-hover:text-[#FDB927] transition-all transform -skew-x-12">STELLAR</span>
          </div>

          <div className="flex-1 flex justify-center px-4">
            <div className="flex items-center glass border border-white/10 rounded-full py-2 px-2 shadow-search hover:bg-white/5 transition-all cursor-pointer w-full max-w-[550px]">
              <div className="flex-1 px-4 text-sm font-semibold border-r border-white/10 truncate">
                Showtime Sector
              </div>
              <div className="flex-1 px-4 text-sm font-semibold border-r border-white/10 hidden sm:block truncate">
                {currentDate.toLocaleDateString(undefined, { month: 'short', year: 'numeric' })}
              </div>
              <div className="flex-[1.5] px-4 text-sm font-normal text-white/40 hidden md:block">
                The Championship Run
              </div>
              <div className="p-2 bg-[#FDB927] rounded-full text-[#552583] shrink-0">
                <Search className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm font-bold hover:bg-white/10 px-4 py-2 rounded-full cursor-pointer transition-colors border border-white/10 text-[#FDB927]">All-Star Feed</span>
            <div className="flex items-center gap-2 glass border border-white/10 rounded-full p-1 pl-3 hover:bg-white/10 transition-all cursor-pointer">
              <Menu className="w-4 h-4 text-white/60" />
              <div className="w-8 h-8 bg-[#FDB927] rounded-full flex items-center justify-center text-[#552583] overflow-hidden font-black text-xs">
                KB
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto mt-6 flex items-center gap-8 overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-8 flex-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterType(cat.id as any)}
                className={`category-item flex flex-col items-center gap-2 pb-3 min-w-[80px] transition-all ${
                  filterType === cat.id ? 'active text-[#FDB927]' : 'text-white/60'
                }`}
              >
                <cat.icon className={`w-6 h-6 ${filterType === cat.id ? 'text-[#FDB927]' : ''}`} />
                <span className={`text-xs font-black uppercase tracking-tighter italic ${filterType === cat.id ? 'text-[#FDB927]' : ''}`}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 pb-3 ml-4">
             <div className="hidden sm:flex items-center gap-2 mr-2">
                <button onClick={() => changeMonth(-1)} className="p-2 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button onClick={() => changeMonth(1)} className="p-2 hover:bg-white/10 rounded-full border border-white/10 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
             </div>
             <button className="flex items-center gap-2 px-4 py-2 glass border border-white/10 rounded-xl text-xs font-bold uppercase hover:border-[#FDB927]/40 transition-all text-[#FDB927]">
               <SlidersHorizontal className="w-4 h-4" /> Scouting Report
             </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto w-full px-6 sm:px-12 mt-12 flex-1">
        <div className="mb-10 text-center sm:text-left">
           <h2 className="text-4xl font-black italic tracking-tighter mb-2 -skew-x-12">THE SHOWTIME REPORT</h2>
           <p className="text-white/50 text-base max-w-2xl font-light">
             Monitoring the championship window in {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}. 
             Analyzing legendary clusters and gold-standard expansion across the sector.
           </p>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-square skeleton rounded-3xl" />
                <div className="h-4 skeleton rounded-full w-3/4" />
                <div className="h-3 skeleton rounded-full w-1/2 opacity-50" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-12">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} onClick={setSelectedEvent} />
            ))}
          </div>
        )}
      </main>

      <button className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 px-8 py-4 bg-[#FDB927] text-[#552583] rounded-full font-black italic uppercase tracking-tighter shadow-2xl hover:scale-105 active:scale-95 transition-all z-40 -skew-x-12">
        COURTSIDE ACCESS <Activity className="w-5 h-5" />
      </button>

      <footer className="mt-24 border-t border-white/10 py-16 px-6 sm:px-12 glass-dark">
        <div className="max-w-[1600px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h4 className="font-black text-sm tracking-wider uppercase text-[#FDB927] italic">Arena Support</h4>
            <ul className="text-sm text-white/60 space-y-3 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">Courtside Calibration</li>
              <li className="hover:text-white cursor-pointer transition-colors">Stellar Defense</li>
              <li className="hover:text-white cursor-pointer transition-colors">Draft Board Mapping</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm tracking-wider uppercase text-[#FDB927] italic">Roster</h4>
            <ul className="text-sm text-white/60 space-y-3 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">Submit Highlights</li>
              <li className="hover:text-white cursor-pointer transition-colors">Hall of Fame Hosting</li>
              <li className="hover:text-white cursor-pointer transition-colors">Championship Legacy</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm tracking-wider uppercase text-[#FDB927] italic">Highlight Reel</h4>
            <ul className="text-sm text-white/60 space-y-3 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">The Purple Rain</li>
              <li className="hover:text-white cursor-pointer transition-colors">Black Mamba Horizon</li>
              <li className="hover:text-white cursor-pointer transition-colors">Supernova Slam Dunks</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-sm tracking-wider uppercase text-[#FDB927] italic">Stellar</h4>
            <ul className="text-sm text-white/60 space-y-3 font-light">
              <li className="hover:text-white cursor-pointer transition-colors">History Books</li>
              <li className="hover:text-white cursor-pointer transition-colors">Stat Log</li>
              <li className="hover:text-white cursor-pointer transition-colors">The Lakers Focus Team</li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-white/40">
           <div className="flex items-center gap-6">
             <span>© 2025 Stellar Lakers Foundation</span>
             <span className="hover:text-white cursor-pointer transition-colors">Fair Play</span>
             <span className="hover:text-white cursor-pointer transition-colors">Full Court Press</span>
             <span className="hover:text-white cursor-pointer transition-colors">Legal</span>
           </div>
           <div className="flex items-center gap-6 font-semibold text-white/80">
             <span className="flex items-center gap-1 cursor-pointer hover:text-white transition-colors"><Globe className="w-3 h-3" /> Los Angeles (PST)</span>
             <span className="cursor-pointer hover:text-white transition-colors">$ STLR (Bling)</span>
           </div>
        </div>
      </footer>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
};

export default App;
