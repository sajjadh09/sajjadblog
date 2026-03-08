import React, { useState, useEffect } from 'react';
import { ArrowLeft, Menu, X, Zap, Layers, Cpu, Globe, Layout, Smartphone, ChevronRight, Github, Star, Code2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WebDesign() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle scroll for navbar blur effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle mouse movement for dynamic gradient
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#030014] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden relative">
      
      {/* Custom Atmospheric Background (Aurora Effect) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-600/20 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_alternate]"></div>
        <div className="absolute top-[20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-cyan-600/20 blur-[150px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[50%] h-[50%] rounded-full bg-fuchsia-600/20 blur-[100px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite_alternate]"></div>
        
        {/* Dynamic Mouse Gradient */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 80%)`
          }}
        />

        {/* Subtle Grid Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      {/* Actual Content */}
      <div className="relative z-10">
        
        {/* Portfolio Back Button (Fixed) */}
        <div className="fixed bottom-6 right-6 z-50">
          <Link to="/" className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-4 py-2 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-cyan-500/25">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
        </div>

        {/* Cloned Website Navbar */}
        <nav className={`fixed top-0 w-full z-40 transition-all duration-300 border-b ${isScrolled ? 'bg-[#030014]/80 backdrop-blur-lg border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                <Layout size={18} className="text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Chronicle<span className="text-cyan-400">UI</span></span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
              <a href="#features" className="hover:text-white transition-colors">Features</a>
              <a href="#components" className="hover:text-white transition-colors">Components</a>
              <a href="#docs" className="hover:text-white transition-colors">Documentation</a>
              <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="https://github.com/sajjad/web-design-agency" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-slate-300 hover:text-white transition-colors flex items-center gap-2 mr-2">
                Source Code
              </a>
              <a href="#" className="text-sm font-medium text-slate-300 hover:text-white transition-colors flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                <Github size={18} /> GitHub
              </a>
              <button className="bg-white text-black px-4 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-colors">
                Get Started
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-30 bg-[#030014]/95 backdrop-blur-xl pt-24 px-6 md:hidden flex flex-col gap-6 border-b border-white/10 pb-8">
            <a href="#features" className="text-2xl font-medium text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#components" className="text-2xl font-medium text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Components</a>
            <a href="#docs" className="text-2xl font-medium text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Documentation</a>
            <a href="#pricing" className="text-2xl font-medium text-slate-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <hr className="border-white/10 my-4" />
            <button className="bg-white text-black px-4 py-2 rounded-full text-base font-bold w-full">
              Get Started
            </button>
          </div>
        )}

        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 md:pt-52 md:pb-32 max-w-7xl mx-auto flex flex-col items-center text-center">
          <a href="#" onClick={(e) => e.preventDefault()} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-sm font-medium mb-8 hover:bg-white/10 transition-colors">
            <Star size={14} className="fill-cyan-400" /> Introducing Chronicle UI v2.0 <ChevronRight size={14} />
          </a>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-8 max-w-4xl leading-[1.1]">
            Design at the speed of thought.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
            A beautiful, responsive, and highly customizable CSS framework built for modern web applications. Stop writing boilerplate and start shipping.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-white text-black px-6 py-3 rounded-full font-bold text-base hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
              Start Building <ChevronRight size={18} />
            </button>
            <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-6 py-3 rounded-full font-bold text-base hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Code2 size={18} /> Read Docs
            </button>
          </div>
          
          {/* Hero Image/Mockup */}
          <div className="mt-20 w-full max-w-5xl relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-transparent z-10 bottom-0 h-full"></div>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-2 shadow-2xl shadow-cyan-500/10 overflow-hidden relative">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200" 
                alt="Dashboard Mockup" 
                className="w-full h-auto rounded-b-xl opacity-80"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Bento Grid Features Section */}
        <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-white">Everything you need.</h2>
            <p className="text-slate-400 text-lg max-w-2xl">Chronicle UI provides a comprehensive set of tools to build stunning, responsive layouts without the headache of manual CSS.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            
            {/* Feature 1: Large */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <Layout size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Advanced CSS Grid</h3>
                  <p className="text-slate-400">Build complex, two-dimensional layouts with our intuitive grid system. Perfectly responsive out of the box.</p>
                </div>
              </div>
            </div>

            {/* Feature 2: Small */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/10 rounded-full blur-2xl group-hover:bg-violet-500/20 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center text-violet-400 mb-6">
                  <Zap size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
                  <p className="text-slate-400 text-sm">Zero runtime CSS. Compiled ahead of time for maximum performance.</p>
                </div>
              </div>
            </div>

            {/* Feature 3: Small */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-2xl group-hover:bg-fuchsia-500/20 transition-colors"></div>
              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-6">
                  <Smartphone size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Mobile First</h3>
                  <p className="text-slate-400 text-sm">Every component is designed to look perfect on devices of all sizes.</p>
                </div>
              </div>
            </div>

            {/* Feature 4: Large */}
            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-colors group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-colors"></div>
              <div className="relative z-10 flex-1">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Layers size={24} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Glassmorphism Ready</h3>
                <p className="text-slate-400">Beautiful backdrop filters, subtle borders, and glowing effects are built right into the utility classes.</p>
              </div>
              <div className="flex-1 w-full flex justify-center">
                {/* Mini mockup */}
                <div className="w-full max-w-xs h-40 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center p-4">
                  <div className="w-full space-y-3">
                    <div className="h-4 w-1/2 bg-white/20 rounded-full"></div>
                    <div className="h-4 w-3/4 bg-white/10 rounded-full"></div>
                    <div className="h-4 w-full bg-white/5 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Code Showcase Section */}
        <section className="py-24 px-6 border-t border-white/10 bg-black/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 text-white">Developer experience first.</h2>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                We believe that writing CSS should be an enjoyable experience. Our utility-first approach combined with semantic component classes gives you the best of both worlds.
              </p>
              <ul className="space-y-4">
                {['TypeScript support out of the box', 'Fully customizable theme engine', 'Accessible by default (WAI-ARIA)'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                      <Zap size={12} />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex-1 w-full">
              <div className="rounded-2xl border border-white/10 bg-[#0d1117] overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-black/40">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">Button.tsx</span>
                </div>
                <div className="p-6 overflow-x-auto">
                  <pre className="text-sm font-mono leading-relaxed">
                    <span className="text-pink-400">export default</span> <span className="text-blue-400">function</span> <span className="text-yellow-200">Button</span>({`{`} <br/>
                    {'  '}children, <br/>
                    {'  '}variant = <span className="text-green-300">'primary'</span><br/>
                    {`}`} : ButtonProps) {`{`}<br/>
                    {'  '}<span className="text-pink-400">return</span> (<br/>
                    {'    '}&lt;<span className="text-blue-300">button</span><br/>
                    {'      '}<span className="text-cyan-300">className</span>=<span className="text-green-300">"px-6 py-3 rounded-full font-bold transition-all hover:scale-105"</span><br/>
                    {'    '}&gt;<br/>
                    {'      '}{`{`}children{`}`}<br/>
                    {'    '}&lt;/<span className="text-blue-300">button</span>&gt;<br/>
                    {'  '});<br/>
                    {`}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 py-12 px-6 bg-[#030014]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Layout size={20} className="text-cyan-400" />
              <span className="font-bold text-lg tracking-tight text-white">Chronicle<span className="text-cyan-400">UI</span></span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Chronicle UI. A Web Design Chronicle Project.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}><Github size={20} /></a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}><Globe size={20} /></a>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
