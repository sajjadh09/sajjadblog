import React, { useState, useEffect } from 'react';
import { Code, Search, Moon, Sun, Menu, X, Laptop, Bot, Ticket, ChevronDown, ChevronUp, CheckCircle, AlertCircle, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import emailjs from 'emailjs-com';
import { projects, blogPosts, testimonials } from '../data';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';

function StatCounter({ target, duration = 2000 }: { target: number, duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(target * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, duration]);

  return <span className="stat-number">{count}</span>;
}

export default function Home() {
  const [theme, setTheme] = useState('dark');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedBlog, setExpandedBlog] = useState<number | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.body.dataset.theme = savedTheme;

    const handleScroll = () => {
      const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navHeight;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [location.hash]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setSubmitStatus('submitting');

    const formData = new FormData(form);
    const templateParams = {
      contact_form_name: formData.get('name'),
      contact_form_email: formData.get('email'),
      contact_form_subject: formData.get('subject'),
      contact_form_message: formData.get('message')
    };

    emailjs.send('service_3hmh0hd', 'template_kzw4u89', templateParams, 'tQg-ORHKROt-NGZdR')
      .then(() => {
        setSubmitStatus('success');
        form.reset();
        setTimeout(() => setSubmitStatus('idle'), 5000);
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        setSubmitStatus('error');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      });
  };

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <Code size={24} /> Sajjad Blog
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a></li>
            <li><a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
            <li><a href="#blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Articles</a></li>
            <li><a href="#services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</a></li>
            <li><a href="#contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
          <div className="nav-icons">
            <button className="search-toggle" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search size={18} />
            </button>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button className="mobile-menu md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        
        <div className={`search-bar ${isSearchOpen ? 'active' : ''}`}>
          <input type="text" id="search-input" placeholder="Search articles & projects..." />
          <button className="search-close" onClick={() => setIsSearchOpen(false)}>
            <X size={20} />
          </button>
        </div>
      </nav>

      <section id="home" className="hero relative overflow-hidden bg-slate-950">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite_alternate]"></div>
          <div className="absolute top-[20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-purple-600/20 blur-[150px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]"></div>
          
          {/* Dynamic Mouse Gradient */}
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
            }}
          />
          
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>

        <div className="hero-content relative z-10">
          <div className="hero-text">
            <h1 className="hero-title">Web/App Developer & <span className="gradient-text">Tech Writer</span></h1>
            <p className="hero-subtitle">Building innovative solutions | Writing about Python, AI, Web Dev, Islamic Knowledge | Web/App Development Freelancer from Abuja, Nigeria</p>
            <div className="hero-buttons">
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn btn-secondary">
                Hire Me
              </a>
            </div>
            
            <div className="hero-stats-row mt-12 pt-8 border-t border-white/20 flex flex-row md:flex-col gap-8 md:gap-6 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:border-t-0 md:border-l md:pl-8 md:mt-0 md:pt-0">
              <div className="stat-item">
                <StatCounter target={10} />
                <span className="text-xs font-medium opacity-80 uppercase tracking-wider">Projects</span>
              </div>
              <div className="stat-item">
                <StatCounter target={6} />
                <span className="text-xs font-medium opacity-80 uppercase tracking-wider">Articles</span>
              </div>
              <div className="stat-item">
                <StatCounter target={102} />
                <span className="text-xs font-medium opacity-80 uppercase tracking-wider">Happy Clients</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Empty div to maintain grid layout, or you can put an image here */}
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <div className="about-text">
              <h3 className="text-2xl font-semibold mb-4 text-[#667eea]">Web/App Developer & Freelancer</h3>
              <p className="mb-6">Software developer from Nigeria. Building Python AI tools and responsive websites, passionate about AI, Machine Learning, Clean Code, Modern Web Tech, and helping local businesses go digital. Running a freelance tech business also writing books and articles about my industry and Islamic themes.</p>
              <div className="skills">
                <h4>Skills</h4>
                <div className="skill-tags">
                  {['HTML/CSS/JS', 'Python', 'React', 'Node.js', 'AI/ML', 'WordPress'].map((skill, index) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
            <div className="about-image flex justify-center">
              <img 
                src="https://picsum.photos/seed/sajjad/800/800"
                alt="Sajjad - Web/App Developer"
                className="profile-photo"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((project, index) => (
              <div className="project-card" key={index}>
                <img src={project.image} alt={project.title} referrerPolicy="no-referrer" />
                <div className="card-content">
                  <h3 className="card-title">{project.title}</h3>
                  <div className="card-tech">
                    {project.tech.map((t, i) => <span key={i}>{t}</span>)}
                  </div>
                  <p className="mb-4">{project.desc}</p>
                  <div className="flex gap-3 mt-4">
                    {project.demoLink && (
                      <Link to={project.demoLink} className="btn btn-primary text-sm py-2 px-4 flex items-center gap-2 flex-1 justify-center">
                        <ExternalLink size={18} /> Live Demo
                      </Link>
                    )}
                    {project.link && (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-secondary text-sm py-2 px-4 flex items-center gap-2 flex-1 justify-center">
                        <Github size={18} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="section">
        <div className="container">
          <h2 className="section-title">My Articles</h2>
          <div className="blog-grid">
            {blogPosts.map((post, index) => (
              <div className="blog-card" key={index}>
                <img src={post.image} alt={post.title} referrerPolicy="no-referrer" />
                <div className="card-content">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="mb-2">{post.excerpt}</p>
                  <small className="text-gray-500 block mb-4">{post.date}</small>
                  
                  <button 
                    className="read-more-btn"
                    onClick={() => setExpandedBlog(expandedBlog === index ? null : index)}
                  >
                    {expandedBlog === index ? 'Show Less' : 'Read Full Article'}
                    {expandedBlog === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  
                  <div className={`blog-article ${expandedBlog === index ? 'active' : ''}`}>
                    <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="section">
        <div className="container">
          <h2 className="section-title">Services for Business</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="icon-wrapper">
                <Laptop size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Web Development</h3>
              <p>Modern, responsive websites that convert visitors to customers</p>
            </div>
            <div className="service-card">
              <div className="icon-wrapper">
                <Bot size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Automation</h3>
              <p>Python bots and automation for business efficiency</p>
            </div>
            <div className="service-card">
              <div className="icon-wrapper">
                <Ticket size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Event Ticketing</h3>
              <p>Custom ticketing platforms for events, concerts, and businesses</p>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="section bg-[var(--card-bg)]">
        <div className="container">
          <h2 className="section-title">Client Testimonials</h2>
          <div className="relative max-w-4xl mx-auto overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full shrink-0 px-2 md:px-4 py-2">
                  <div className="bg-white px-6 py-10 md:px-16 md:py-12 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative h-full flex flex-col justify-center items-center text-center overflow-hidden group">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Large Quote Icon */}
                    <div className="absolute -top-2 -left-2 text-indigo-50 opacity-60 transform -rotate-6">
                      <svg width="80" height="80" className="md:w-[100px] md:h-[100px]" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.017 21L16.41 14.592C16.634 13.987 16.75 13.344 16.75 12.686V6H22V12.686C22 15.584 20.849 18.363 18.803 20.41L14.017 21ZM5.01697 21L7.40997 14.592C7.63397 13.987 7.74997 13.344 7.74997 12.686V6H13V12.686C13 15.584 11.849 18.363 9.80297 20.41L5.01697 21Z" />
                      </svg>
                    </div>
                    
                    <p className="text-base md:text-xl italic mb-8 relative z-10 text-slate-700 leading-relaxed max-w-2xl mx-auto font-medium">"{testimonial.content}"</p>
                    
                    <div className="flex flex-col items-center gap-3 md:gap-4 mt-auto">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur-[6px] opacity-40 group-hover:opacity-70 transition-opacity"></div>
                        <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-white relative z-10 shadow-sm" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex flex-col items-center">
                        <h4 className="font-bold text-sm md:text-base text-slate-900">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-indigo-600 font-medium">{testimonial.role}</p>
                        <p className="text-[9px] md:text-[10px] uppercase tracking-wider mt-1 text-slate-400 font-bold">{testimonial.project}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Carousel Controls - Hidden on mobile */}
            <button 
              onClick={() => setCurrentTestimonial(prev => prev === 0 ? testimonials.length - 1 : prev - 1)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-r-2xl border border-l-0 border-slate-100 text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all z-10 shadow-md items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => setCurrentTestimonial(prev => (prev + 1) % testimonials.length)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white p-3 rounded-l-2xl border border-r-0 border-slate-100 text-slate-400 hover:text-indigo-600 hover:shadow-lg transition-all z-10 shadow-md items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
            
            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'bg-indigo-600 w-8' : 'bg-slate-300 w-2.5 hover:bg-indigo-400'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section">
        <div className="container">
          <h2 className="section-title">Let's Work Together</h2>
          
          {submitStatus === 'success' && (
            <div className="max-w-[600px] mx-auto mb-8 p-4 bg-emerald-100 text-emerald-800 rounded-xl flex items-center gap-3 animate-[slideIn_0.5s_ease]">
              <CheckCircle size={24} className="text-emerald-600" />
              <div>
                <h4 className="font-semibold">Message sent successfully!</h4>
                <p className="text-sm">I'll get back to you as soon as possible.</p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="max-w-[600px] mx-auto mb-8 p-4 bg-red-100 text-red-800 rounded-xl flex items-center gap-3 animate-[slideIn_0.5s_ease]">
              <AlertCircle size={24} className="text-red-600" />
              <div>
                <h4 className="font-semibold">Oops! Something went wrong.</h4>
                <p className="text-sm">Please try again or email me directly.</p>
              </div>
            </div>
          )}

          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <input type="text" name="name" placeholder="Your Name" required disabled={submitStatus === 'submitting'} />
              <input type="email" name="email" placeholder="Your Email" required disabled={submitStatus === 'submitting'} />
            </div>
            <div className="form-group">
              <input type="text" name="subject" placeholder="Project/Business Inquiry" required disabled={submitStatus === 'submitting'} />
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Tell me about your project..." rows={5} required disabled={submitStatus === 'submitting'}></textarea>
            </div>
            <button type="submit" className="btn btn-primary w-full md:w-auto" disabled={submitStatus === 'submitting'}>
              {submitStatus === 'submitting' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Sajjad. Built with ❤ and clean code</p>
        </div>
      </footer>
    </>
  );
}
