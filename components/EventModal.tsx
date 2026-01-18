
import React, { useEffect, useState } from 'react';
import { SpaceEvent } from '../types';
import { X, Share, Heart, Calendar, Sparkles, Loader2, Info, Compass, ShieldAlert, Star, Eye, Send, Mail, CheckCircle2, ShieldCheck, MessageCircle, Award, Activity, Atom, Globe } from 'lucide-react';
import { getDeepDive } from '../services/geminiService';

interface EventModalProps {
  event: SpaceEvent | null;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [deepDive, setDeepDive] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (event) {
      setLoading(true);
      setDeepDive(null);
      setIsSubscribed(false);
      setEmail('');
      setImageLoaded(false);
      getDeepDive(event).then(data => {
        setDeepDive(data);
        setLoading(false);
      });
    }
  }, [event]);

  if (!event) return null;

  const photoId = event.metadata?.photoId || '1462331940025-496dfbfc7564';
  const coverImage = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=1200&q=80`;
  const hostAvatar = `https://images.unsplash.com/photo-${event.host?.avatarId || '1472099645785-5658abf4ff4e'}?auto=format&fit=crop&w=200&h=200&q=80`;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-300">
      <div className="bg-[#1a0b26] border border-[#FDB927]/20 w-full max-w-5xl h-full sm:h-auto sm:max-h-[92vh] sm:rounded-[3rem] overflow-hidden flex flex-col relative animate-in slide-in-from-bottom-8 duration-500 shadow-[0_0_100px_rgba(85,37,131,0.5)]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/5 glass-dark sticky top-0 z-10">
          <button onClick={onClose} className="p-2.5 hover:bg-white/10 rounded-full transition-colors group">
            <X className="w-5 h-5 text-white/60 group-hover:text-white" />
          </button>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-sm font-bold text-[#FDB927] hover:text-white transition-colors underline decoration-[#FDB927]/20 italic uppercase tracking-tighter"><Share className="w-4 h-4" /> Stat Sheet</button>
            <button className="flex items-center gap-2 text-sm font-bold text-[#FDB927] hover:text-white transition-colors underline decoration-[#FDB927]/20 italic uppercase tracking-tighter"><Heart className="w-4 h-4" /> Draft Board</button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar">
          <div className="px-6 sm:px-12 py-10">
            {/* Tagline */}
            <div className="flex items-center gap-2 text-[#FDB927] font-black text-[10px] uppercase tracking-[0.3em] mb-4 italic">
               <Atom className="w-4 h-4 animate-spin-slow" /> THE SHOWTIME 95%
            </div>
            
            <h1 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter italic -skew-x-12 uppercase leading-none">{event.title}</h1>
            
            {/* Meta stats */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-white/40 mb-10">
              <span className="flex items-center gap-2 font-black text-[#552583] bg-[#FDB927] px-4 py-2 rounded-full shadow-[0_0_15px_rgba(253,185,39,0.3)]">
                <Star className="w-4 h-4 fill-[#552583]" /> {event.metadata?.rarity || 4.5} MVP Value
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-white/60" /> {event.location}
              </span>
              <span className="w-1 h-1 bg-white/20 rounded-full"></span>
              <span className="flex items-center gap-2 font-black text-[#FDB927] italic uppercase">
                <Activity className="w-4 h-4" /> {event.metadata?.visibility || 'Championship Grade'}
              </span>
            </div>
            
            {/* Immersive Image */}
            <div className="rounded-[2.5rem] overflow-hidden aspect-video sm:aspect-[21/8] relative mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-black border border-[#FDB927]/10">
              {!imageLoaded && <div className="absolute inset-0 skeleton opacity-40" />}
              <img 
                src={coverImage} 
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-2000 ${imageLoaded ? 'opacity-60 scale-100 hover:scale-105' : 'opacity-0 scale-110'}`} 
                alt={event.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b26] via-[#552583]/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8 flex items-center gap-3">
                 <div className="p-2 glass-dark rounded-full border border-white/10">
                    <Globe className="w-4 h-4 text-[#FDB927]" />
                 </div>
                 <span className="text-white/60 text-xs font-black tracking-wide uppercase italic">
                   The World's Team | Monitoring the {event.location} sector
                 </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Column Content */}
              <div className="lg:col-span-8 space-y-16">
                
                {/* Agency Briefing */}
                <div className="pb-12 border-b border-white/5 flex items-center justify-between">
                  <div className="space-y-1">
                    <h2 className="text-3xl font-black text-white italic -skew-x-12 uppercase tracking-tighter">{event.agency || 'LA Focus Group'}</h2>
                    <p className="text-white/40 text-lg font-light tracking-wide uppercase italic">Head Scout: <span className="text-[#FDB927] font-black">{event.host?.name}</span></p>
                  </div>
                  <div className="w-20 h-20 relative">
                    <img src={hostAvatar} className="w-full h-full rounded-3xl object-cover border-2 border-[#FDB927]/40 shadow-xl" />
                    {event.host?.isSuperhost && (
                      <div className="absolute -bottom-2 -right-2 bg-[#FDB927] text-[#552583] p-1 rounded-xl border-2 border-[#1a0b26] shadow-lg">
                        <Award className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                  <div className="flex items-start gap-5 p-6 glass border border-white/5 rounded-[2rem]">
                    <div className="p-4 glass-dark rounded-2xl border border-white/10 text-[#FDB927]">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-white tracking-tight uppercase italic">Tip-off Time</h4>
                      <p className="text-white/40 text-sm mt-1">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-6 glass border border-white/5 rounded-[2rem]">
                    <div className="p-4 glass-dark rounded-2xl border border-white/10 text-[#FDB927]">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-white tracking-tight uppercase italic">Defense Protocols</h4>
                      <p className="text-white/40 text-sm mt-1">Full court press recommended for this sector's coordinates.</p>
                    </div>
                  </div>
                </div>

                {/* Gemini Content */}
                <div className="pt-10 border-t border-white/5">
                   <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-[#FDB927] text-[#552583] rounded-2xl shadow-[0_0_30px_rgba(253,185,39,0.2)]">
                      <Activity className="w-6 h-6" />
                    </div>
                    <h3 className="text-3xl font-black text-white tracking-tighter italic uppercase -skew-x-12">Scouting Report</h3>
                  </div>
                  
                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-24 gap-6 glass border border-white/5 rounded-[3rem]">
                      <div className="relative">
                        <Loader2 className="w-12 h-12 text-[#FDB927] animate-spin" />
                        <div className="absolute inset-0 w-12 h-12 text-[#FDB927] animate-ping opacity-20" />
                      </div>
                      <p className="text-[#FDB927] font-black animate-pulse text-lg tracking-[0.2em] uppercase italic">Breaking down the tape...</p>
                    </div>
                  ) : (
                    <div className="text-white/80 leading-relaxed text-xl space-y-12 font-light italic tracking-tight">
                      {deepDive?.split('\n\n').map((para, i) => (
                        <p key={i} className="first-letter:text-6xl first-letter:font-black first-letter:text-[#FDB927] first-letter:mr-4 first-letter:float-left first-letter:leading-none first-letter:not-italic">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>

                {/* Investigator Profile */}
                <div className="pt-16 border-t border-white/5">
                  <h3 className="text-2xl font-black text-white mb-10 tracking-tight uppercase italic">The Coaching Staff</h3>
                  <div className="glass border border-white/5 rounded-[3rem] p-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex flex-col items-center gap-6 glass-dark rounded-[2.5rem] p-8 border border-white/10 min-w-[280px] shadow-2xl">
                      <div className="w-32 h-32 relative">
                        <img src={hostAvatar} className="w-full h-full rounded-full object-cover border-4 border-[#FDB927]/20" />
                        <div className="absolute bottom-2 right-2 bg-[#FDB927] text-[#552583] p-2 rounded-2xl border-4 border-[#1a0b26]">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="text-center">
                        <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter">{event.host?.name}</h4>
                        <div className="flex items-center justify-center gap-2 text-[10px] font-black text-[#FDB927] uppercase tracking-widest mt-2">
                           <Award className="w-4 h-4" /> All-Star Scout
                        </div>
                      </div>
                      <div className="w-full border-t border-white/5 pt-6 mt-2 flex justify-around">
                        <div className="text-center">
                          <div className="text-2xl font-black text-[#FDB927]">{event.host?.reviewsCount || 120}</div>
                          <div className="text-[9px] uppercase font-black text-white/30 tracking-widest mt-1">Wins</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-[#FDB927]">{event.host?.rating || 4.9}</div>
                          <div className="text-[9px] uppercase font-black text-white/30 tracking-widest mt-1">PER</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-black text-[#FDB927]">{event.host?.yearsExperience || 10}</div>
                          <div className="text-[9px] uppercase font-black text-white/30 tracking-widest mt-1">Rings</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex-1 space-y-8 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3">
                         <div className="w-10 h-10 glass-dark rounded-full flex items-center justify-center border border-white/10">
                            <MessageCircle className="w-5 h-5 text-[#FDB927]/40" />
                         </div>
                         <span className="text-lg font-black text-white uppercase italic">Scout's Notes</span>
                      </div>
                      <p className="text-white/50 leading-relaxed text-xl italic font-light tracking-tight">
                        "{event.host?.bio || 'Dedicated to winning. Every dark matter filament holds a championship key.'}"
                      </p>
                      <div className="pt-4">
                         <button className="px-10 py-5 bg-[#FDB927] text-[#552583] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all transform hover:-translate-y-1 shadow-lg italic">
                           Talk Trade Package
                         </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Booking/Subscription */}
              <div className="lg:col-span-4">
                <div className="sticky top-28 glass border border-white/10 rounded-[3rem] p-10 shadow-[0_30px_60px_rgba(85,37,131,0.3)] space-y-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#FDB927]/10 rounded-full -mr-24 -mt-24 blur-[80px] pointer-events-none" />
                  
                  <div className="flex justify-between items-center relative z-10">
                    <div>
                      <span className="text-3xl font-black text-white italic uppercase tracking-tighter">Showtime</span>
                      <span className="text-[10px] font-black text-[#FDB927]/40 block uppercase tracking-[0.2em] mt-1">Floor Seats Only</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] font-black bg-[#FDB927] text-[#552583] px-3 py-1.5 rounded-full shadow-[0_0_20px_rgba(253,185,39,0.3)]">
                      <Star className="w-3.5 h-3.5 fill-current" /> CHAMPION
                    </div>
                  </div>

                  <div className="glass-dark border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5 shadow-inner">
                    <div className="p-6">
                      <label className="block text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-2">Game Night</label>
                      <span className="text-lg font-black text-white tracking-tight">{new Date(event.date).toLocaleDateString()}</span>
                    </div>
                    <div className="p-6">
                      <label className="block text-[10px] font-black uppercase text-white/30 tracking-[0.2em] mb-2">Coverage</label>
                      <span className="text-lg font-black text-white tracking-tight">{event.metadata?.visibility || 'All-Star Broadcast'}</span>
                    </div>
                  </div>

                  {!isSubscribed ? (
                    <form onSubmit={handleSubscribe} className="space-y-8 relative z-10">
                      <div className="space-y-3">
                        <label className="block text-[10px] font-black uppercase text-white/40 ml-2 tracking-[0.2em]">Fan Comms Link</label>
                        <div className="flex items-center glass border border-white/10 rounded-2xl px-5 py-5 focus-within:ring-2 focus-within:ring-[#FDB927] transition-all shadow-inner">
                          <Mail className="w-6 h-6 text-white/20 mr-4" />
                          <input 
                            type="email" 
                            required
                            placeholder="mamba@lakers.com"
                            className="bg-transparent border-none outline-none text-base w-full font-bold text-white placeholder-white/20 uppercase tracking-tighter italic"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>
                      </div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-[#FDB927] text-[#552583] py-6 rounded-[1.5rem] font-black text-xl shadow-[0_15px_30px_rgba(253,185,39,0.2)] hover:shadow-[#FDB927]/40 hover:bg-white hover:text-black transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group italic uppercase tracking-tighter"
                      >
                        {isSubmitting ? <Loader2 className="w-7 h-7 animate-spin" /> : (
                          <>
                            LOCK IN MY SEAT 
                            <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </form>
                  ) : (
                    <div className="bg-[#FDB927]/10 border border-[#FDB927]/20 rounded-[2.5rem] p-10 flex flex-col items-center text-center gap-6 animate-in zoom-in-95 duration-500 relative z-10">
                      <div className="w-16 h-16 bg-[#FDB927] text-[#552583] rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(253,185,39,0.4)]">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <div>
                        <h4 className="font-black text-white text-3xl tracking-tight uppercase italic">COURTSIDE READY</h4>
                        <p className="text-base text-white/50 mt-2 font-light">Ticket verified for {email}.</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-3 text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">
                     <Atom className="w-4 h-4 animate-spin-slow" /> OFFICIAL PARTNER
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-[#FDB927]">
                    <span className="underline cursor-pointer hover:text-white transition-colors italic">Export Game Data</span>
                    <Info className="w-4 h-4 opacity-50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
