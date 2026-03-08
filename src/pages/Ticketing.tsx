import React, { useState } from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Ticket, CheckCircle, Search, Filter, User, ChevronRight, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_EVENTS = [
  { id: 1, category: 'Tech', title: 'Tech Conference 2026', date: 'Oct 15, 2026', time: '09:00 AM', location: 'Abuja Tech Hub', price: 15000, image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800', tags: ['AI', 'Web3', 'Networking'] },
  { id: 2, category: 'Business', title: 'Startup Pitch Night', date: 'Nov 02, 2026', time: '06:00 PM', location: 'Lagos Innovation Center', price: 5000, image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?auto=format&fit=crop&q=80&w=800', tags: ['Funding', 'Startups'] },
  { id: 3, category: 'Tech', title: 'Python Developers Meetup', date: 'Dec 10, 2026', time: '10:00 AM', location: 'Virtual Event', price: 0, image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=800', tags: ['Python', 'Coding'] },
  { id: 4, category: 'Music', title: 'Afrobeats Festival', date: 'Dec 24, 2026', time: '04:00 PM', location: 'Eko Atlantic City', price: 25000, image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800', tags: ['Live Music', 'Festival'] }
];

export default function Ticketing() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  const [ticketType, setTicketType] = useState<'regular' | 'vip'>('regular');
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const event = MOCK_EVENTS.find(e => e.id === selectedEvent);
  
  const filteredEvents = activeCategory === 'All' 
    ? MOCK_EVENTS 
    : MOCK_EVENTS.filter(e => e.category === activeCategory);

  const handlePurchase = () => {
    setIsPurchased(true);
  };

  const reset = () => {
    setSelectedEvent(null);
    setTicketCount(1);
    setTicketType('regular');
    setIsPurchased(false);
  };

  const getPrice = () => {
    if (!event) return 0;
    if (event.price === 0) return 0;
    return ticketType === 'vip' ? event.price * 2.5 : event.price;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans">
      
      {/* Navbar */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2 font-bold text-xl text-indigo-400">
              <Ticket size={24} className="fill-indigo-900" /> TixFlow
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-indigo-400">Find Events</a>
            <a href="#" className="hover:text-indigo-400">Create Event</a>
            <a href="#" className="hover:text-indigo-400">Help Center</a>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://github.com/sajjad/event-ticketing" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-300 hover:text-white flex items-center gap-2 mr-4">
              Source Code
            </a>
            <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-slate-700 transition-colors">
              <User size={18} />
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!selectedEvent ? (
          <>
            {/* Hero / Search */}
            <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-white mb-12 relative overflow-hidden shadow-xl shadow-indigo-600/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              
              <div className="relative z-10 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Discover experiences you'll love.</h1>
                <p className="text-indigo-100 text-lg mb-8">Book tickets for the best tech conferences, music festivals, and business events in Africa.</p>
                
                <div className="bg-slate-800 rounded-2xl p-2 flex items-center shadow-lg">
                  <div className="flex-1 flex items-center gap-3 px-4 border-r border-slate-700">
                    <Search size={20} className="text-slate-400" />
                    <input type="text" placeholder="Search events, artists, venues..." className="w-full bg-transparent border-none focus:outline-none text-slate-50 placeholder:text-slate-400 py-2" />
                  </div>
                  <div className="hidden md:flex items-center gap-3 px-4">
                    <MapPin size={20} className="text-slate-400" />
                    <span className="text-slate-300">Lagos, NG</span>
                  </div>
                  <button className="bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-base hover:bg-indigo-600 transition-colors">
                    Search
                  </button>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2 hide-scrollbar">
              <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-700 bg-slate-800 text-slate-300 shadow-sm shrink-0 text-base">
                <Filter size={18} /> Filters
              </button>
              {['All', 'Tech', 'Music', 'Business', 'Arts'].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2 rounded-full font-bold text-base transition-colors shrink-0 ${activeCategory === cat ? 'bg-indigo-500 text-white shadow-md' : 'bg-slate-800 text-slate-300 border border-slate-700 hover:border-slate-600'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Event Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map(evt => (
                <div 
                  key={evt.id} 
                  className="bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 border border-slate-800 group cursor-pointer flex flex-col"
                  onClick={() => setSelectedEvent(evt.id)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-indigo-400 uppercase tracking-wider">
                      {evt.category}
                    </div>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-3 text-slate-50 group-hover:text-indigo-400 transition-colors">{evt.title}</h3>
                    
                    <div className="space-y-2 text-sm text-slate-400 mb-6 flex-1">
                      <div className="flex items-center gap-3">
                        <Calendar size={16} className="text-indigo-400" /> 
                        <span>{evt.date} • {evt.time}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin size={16} className="text-indigo-400" /> 
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                      <span className="font-bold text-lg text-slate-50">
                        {evt.price === 0 ? 'Free' : `₦${evt.price.toLocaleString()}`}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-colors">
                        <ChevronRight size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : !isPurchased ? (
          
          /* Detailed View & Checkout */
          <div className="max-w-5xl mx-auto animate-[fadeIn_0.3s_ease]">
            <button onClick={reset} className="text-sm text-slate-400 hover:text-indigo-400 mb-6 flex items-center gap-2 font-medium transition-colors">
              <ArrowLeft size={16} /> Back to Events
            </button>
            
            <div className="bg-slate-900 rounded-3xl shadow-xl overflow-hidden border border-slate-800 flex flex-col lg:flex-row">
              
              {/* Event Details Side */}
              <div className="lg:w-1/2 relative">
                <img src={event?.image} alt={event?.title} className="w-full h-64 lg:h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent flex flex-col justify-end p-8 text-white">
                  <div className="flex gap-2 mb-4">
                    {event?.tags.map(tag => (
                      <span key={tag} className="bg-slate-800/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium">{tag}</span>
                    ))}
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{event?.title}</h2>
                  <div className="space-y-2 text-slate-300">
                    <p className="flex items-center gap-3"><Calendar size={18} /> {event?.date} at {event?.time}</p>
                    <p className="flex items-center gap-3"><MapPin size={18} /> {event?.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Checkout Side */}
              <div className="lg:w-1/2 p-8 md:p-12 bg-slate-900 flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-8 text-slate-50">Select Tickets</h3>
                
                {/* Ticket Types */}
                <div className="space-y-4 mb-8">
                  <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${ticketType === 'regular' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-indigo-500/50'}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${ticketType === 'regular' ? 'border-indigo-500' : 'border-slate-600'}`}>
                        {ticketType === 'regular' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                      </div>
                      <div>
                        <div className="font-bold text-slate-50">Regular Admission</div>
                        <div className="text-sm text-slate-400">Standard entry to the event</div>
                      </div>
                    </div>
                    <div className="font-bold text-lg text-slate-50">
                      {event?.price === 0 ? 'Free' : `₦${event?.price.toLocaleString()}`}
                    </div>
                    <input type="radio" name="ticketType" className="hidden" checked={ticketType === 'regular'} onChange={() => setTicketType('regular')} />
                  </label>

                  {event?.price !== 0 && (
                    <label className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${ticketType === 'vip' ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-700 hover:border-indigo-500/50'}`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${ticketType === 'vip' ? 'border-indigo-500' : 'border-slate-600'}`}>
                          {ticketType === 'vip' && <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full"></div>}
                        </div>
                        <div>
                          <div className="font-bold text-slate-50 flex items-center gap-2">VIP Access <span className="bg-amber-500/20 text-amber-400 text-[10px] px-2 py-0.5 rounded-full uppercase font-bold tracking-wider">Premium</span></div>
                          <div className="text-sm text-slate-400">Front row seating & backstage</div>
                        </div>
                      </div>
                      <div className="font-bold text-lg text-slate-50">
                        ₦{(event!.price * 2.5).toLocaleString()}
                      </div>
                      <input type="radio" name="ticketType" className="hidden" checked={ticketType === 'vip'} onChange={() => setTicketType('vip')} />
                    </label>
                  )}
                </div>
                
                {/* Quantity */}
                <div className="flex justify-between items-center mb-8 bg-slate-800 p-4 rounded-2xl">
                  <span className="font-semibold text-slate-300">Quantity</span>
                  <div className="flex items-center gap-4 bg-slate-900 border border-slate-700 rounded-xl p-1 shadow-sm">
                    <button onClick={() => setTicketCount(Math.max(1, ticketCount - 1))} className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">-</button>
                    <span className="font-bold w-4 text-center text-slate-50">{ticketCount}</span>
                    <button onClick={() => setTicketCount(ticketCount + 1)} className="w-8 h-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors">+</button>
                  </div>
                </div>
                
                {/* Total & Pay */}
                <div className="border-t border-slate-800 pt-6 mb-8">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-slate-400 font-medium">Total Amount</span>
                    <span className="font-black text-3xl text-slate-50">
                      {getPrice() === 0 ? 'Free' : `₦${(getPrice() * ticketCount).toLocaleString()}`}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 text-right">Includes all taxes and fees</p>
                </div>
                
                <button 
                  onClick={handlePurchase} 
                  className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-500/30 transition-all flex justify-center items-center gap-2"
                >
                  <CreditCard size={24} /> Complete Purchase
                </button>
              </div>
            </div>
          </div>
        ) : (
          
          /* Success State / Ticket */
          <div className="max-w-md mx-auto animate-[slideIn_0.5s_ease]">
            <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
              
              {/* Success Header */}
              <div className="bg-emerald-600 p-8 text-white text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg">
                    <CheckCircle size={32} className="text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Payment Successful!</h2>
                  <p className="text-emerald-100 font-medium">Your tickets have been sent to your email.</p>
                </div>
              </div>
              
              {/* Ticket Body */}
              <div className="p-8 relative bg-slate-900">
                {/* Perforations */}
                <div className="absolute -left-4 top-0 w-8 h-8 bg-slate-950 rounded-full transform -translate-y-1/2 shadow-inner"></div>
                <div className="absolute -right-4 top-0 w-8 h-8 bg-slate-950 rounded-full transform -translate-y-1/2 shadow-inner"></div>
                <div className="absolute left-0 right-0 top-0 border-t-2 border-dashed border-slate-800"></div>
                
                <div className="text-center mb-8 pt-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 ${ticketType === 'vip' ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                    {ticketType} Admission
                  </span>
                  <h3 className="text-2xl font-black text-slate-50 mb-2">{event?.title}</h3>
                  <p className="text-slate-400 font-medium">{event?.date} • {event?.time}</p>
                </div>
                
                <div className="bg-slate-800 rounded-2xl p-6 mb-8 flex justify-center border border-slate-700">
                  {/* Mock QR Code */}
                  <svg width="160" height="160" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="opacity-80">
                    <rect width="100" height="100" fill="transparent" />
                    <path d="M10,10 h30 v30 h-30 z M15,15 h20 v20 h-20 z M20,20 h10 v10 h-10 z M60,10 h30 v30 h-30 z M65,15 h20 v20 h-20 z M70,20 h10 v10 h-10 z M10,60 h30 v30 h-30 z M15,65 h20 v20 h-20 z M20,70 h10 v10 h-10 z M50,50 h10 v10 h-10 z M70,50 h20 v10 h-20 z M50,70 h20 v20 h-20 z M80,70 h10 v20 h-10 z M60,60 h10 v10 h-10 z M45,10 h10 v10 h-10 z M45,25 h10 v20 h-10 z M10,45 h20 v10 h-20 z M80,45 h10 v10 h-10 z" fill="#f8fafc" />
                  </svg>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Name</p>
                    <p className="font-bold text-slate-50">John Doe</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Order Number</p>
                    <p className="font-bold text-slate-50 font-mono">#{Math.floor(Math.random() * 1000000)}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Quantity</p>
                    <p className="font-bold text-slate-50">{ticketCount} Ticket(s)</p>
                  </div>
                  <div>
                    <p className="text-slate-500 mb-1">Total Paid</p>
                    <p className="font-bold text-slate-50">{getPrice() === 0 ? 'Free' : `₦${(getPrice() * ticketCount).toLocaleString()}`}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-800 border-t border-slate-700 flex flex-col gap-4">
                <button className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-indigo-500 transition-colors">
                  Download PDF Ticket
                </button>
                <button onClick={reset} className="w-full bg-slate-900 text-slate-300 border border-slate-700 py-4 rounded-xl font-bold text-lg hover:bg-slate-800 transition-colors">
                  Browse More Events
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
