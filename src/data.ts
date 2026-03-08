export const projects = [
    { 
        title: 'Python Voice Assistant', 
        tech: ['Python', 'SpeechRecognition', 'Pyttsx3'], 
        desc: 'A voice assistant that detects laughter and responds with personality. Built with NLTK for emotion detection and PyAudio for real-time processing.',
        link: 'https://github.com/sajjad/voice-assistant',
        demoLink: '/project/voice-assistant',
        image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&q=80&w=800'
    },
    {
        title: 'Web Design Chronicle', 
        tech: ['HTML', 'CSS', 'JavaScript'],  
        desc: 'A comprehensive chronicle of modern web design patterns and layouts. Features responsive grids, dark mode, and interactive components.',
        link: 'https://github.com/sajjad/web-design-chronicle',
        demoLink: '/project/web-design',
        image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'
    },
    { 
        title: 'Event Ticketing Platform', 
        tech: ['React', 'Node.js', 'MongoDB'],  
        desc: 'Custom ticketing platforms for events, concerts, and businesses. Includes QR code generation, Stripe payments, and an admin dashboard.',
        link: 'https://github.com/sajjad/event-ticketing',
        demoLink: '/project/ticketing',
        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800'
    },
];

export const testimonials = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Operations Manager, TechFlow Inc.",
        content: "Sajjad's Python Voice Assistant completely transformed our customer service kiosk. It's not just functional; the laugh detection makes it feel genuinely human. Our customer satisfaction scores went up by 40% in the first month.",
        project: "Python Voice Assistant",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "David Okeke",
        role: "Founder, Lagos Events Co.",
        content: "We needed a robust ticketing platform that could handle thousands of concurrent users and integrate seamlessly with local payment gateways. Sajjad delivered a flawless system that processed over 10,000 tickets without a single crash.",
        project: "Event Ticketing Platform",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Creative Director, Studio Minimal",
        content: "The Web Design Chronicle is a masterpiece of modern CSS architecture. Sajjad's deep understanding of Grid and Flexbox helped our agency streamline our development process. He doesn't just write code; he crafts digital experiences.",
        project: "Web Design Chronicle",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
    }
];

export const blogPosts = [
    {
        title: 'Python Voice AI: Adding Personality to Code',
        date: 'Dec 25, 2025',
        excerpt: 'Building a voice assistant that laughs at your jokes and understands context.',
        image: 'https://images.unsplash.com/photo-1525373698358-041e3a460346?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>Python Voice AI: Adding Personality to Code</h2>
            <p>I recently built an AI assistant that doesn't just transcribe text—it detects laughter and responds with a matching tone. This project opened my eyes to how we can make client applications feel more human.</p>
            <h3>Core Tech Stack</h3>
            <ul>
                <li><strong>SpeechRecognition:</strong> For capturing audio input from the microphone.</li>
                <li><strong>NLTK (Natural Language Toolkit):</strong> For basic emotion and keyword detection.</li>
                <li><strong>Pyttsx3:</strong> For offline text-to-speech conversion.</li>
            </ul>
            <h3>The Laughter Detection Algorithm</h3>
            <p>Instead of complex neural networks, I started with a simple heuristic approach to detect when a user is laughing or using humorous keywords.</p>
            <pre><code>import speech_recognition as sr

def detect_laugh(audio_text):
    laugh_keywords = ['haha', 'lol', 'hehe', 'lmao', 'hilarious']
    # Check if any of the keywords exist in the transcribed text
    return any(word in audio_text.lower() for word in laugh_keywords)

def respond_to_user(text):
    if detect_laugh(text):
        return "I'm glad you found that funny! I try my best."
    return "I understand. How else can I help?"</code></pre>
            <h3>Real-World Applications</h3>
            <p>This kind of nuanced interaction is perfect for:</p>
            <ul>
                <li><strong>Customer Service Bots:</strong> De-escalating tense situations with appropriate tone.</li>
                <li><strong>Virtual Companions:</strong> Creating more engaging experiences for elderly care or education.</li>
                <li><strong>Interactive Gaming:</strong> NPCs that react to the player's actual voice tone.</li>
            </ul>
        `
    },
    {
        title: 'CSS Grid vs Flexbox: Modern Layout Mastery',
        date: 'Dec 22, 2025',
        excerpt: 'Stop guessing which one to use. Here is the definitive guide for 2026 websites.',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>CSS Grid vs Flexbox: Which Layout System Wins for 2026 Websites?</h2>
            <p>As a self-taught developer, I wasted months struggling with layouts, using floats and absolute positioning. Then I learned Flexbox, and eventually Grid. Here's what actually works in modern web development.</p>
            
            <h3>Flexbox = 1D Layouts (Rows OR Columns)</h3>
            <p>Flexbox is designed for laying out items in a single direction. It excels at distributing space and aligning content.</p>
            <ul>
                <li><strong>Best for:</strong> Navigation bars, button groups, aligning icons with text, card contents.</li>
                <li><strong>Super simple:</strong> <code>display: flex; align-items: center; justify-content: space-between;</code></li>
                <li><strong>Auto-centering magic:</strong> The easiest way to center a div.</li>
            </ul>

            <h3>Grid = 2D Layouts (Rows AND Columns)</h3>
            <p>Grid is designed for larger-scale layouts where you need to control both the horizontal and vertical placement of elements simultaneously.</p>
            <ul>
                <li><strong>Best for:</strong> Full page layouts, photo galleries, complex dashboards, bento-box designs.</li>
                <li><strong>Explicit control:</strong> <code>grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));</code></li>
                <li><strong>Mobile-first responsive:</strong> You can often achieve responsive layouts without media queries!</li>
            </ul>

            <h3>Real Project Results</h3>
            <p>In a recent dashboard project, I used Grid for the main layout structure (sidebar + header + main content area) and Flexbox for the internal components (navigation links, user profile badge). This reduced my CSS by 50% compared to my older projects!</p>
            
            <pre><code class="language-css">/* The Ultimate Responsive Grid Template */
.dashboard-layout {
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: 60px 1fr;
    grid-template-areas: 
        "sidebar header"
        "sidebar main";
    height: 100vh;
}

/* The Ultimate Responsive Card Grid */
.card-container { 
    display: grid; 
    gap: 2rem; 
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
}</code></pre>
            <p><strong>The 2026 Rule:</strong> Use Flexbox for components, use Grid for pages.</p>
        `
    },
    {
        title: '5 Python Projects Every Beginner Should Build',
        date: 'Dec 20, 2025',
        excerpt: 'These are the exact profitable projects I built to land my first freelance clients.',
        image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>5 Python Projects That Landed Me Freelance Clients</h2>
            <p>Don't get stuck in tutorial hell. These projects turned my GitHub into a client magnet because they solve actual business problems.</p>
            
            <h3>#1 Voice Assistant (Customer Service)</h3>
            <p>I built a custom laugh-detection bot for a local business's customer service kiosk. It made the interaction feel less robotic.</p>
            <pre><code>import speech_recognition as sr
r = sr.Recognizer()
with sr.Microphone() as source:
    print("Listening...")
    audio = r.listen(source)</code></pre>

            <h3>#2 WhatsApp Business Bot</h3>
            <p>Using the Twilio API and Python, I created a bot that automatically replies to common customer inquiries (opening hours, menu, pricing). I sold this for N10k per project to local restaurants.</p>

            <h3>#3 E-commerce Price Tracker</h3>
            <p>A web scraper using BeautifulSoup that checks Jumia for specific products and sends a WhatsApp alert when the price drops below a certain threshold. Great for personal use, but also sellable to deal-hunters.</p>

            <h3>#4 Event Ticketing System</h3>
            <p>A Flask application that generates unique QR codes for tickets and emails them to buyers. I deployed this for church and community events, charging N20k per project.</p>

            <h3>#5 GitHub Portfolio Analyzer</h3>
            <p>A dashboard built with Streamlit that analyzes a user's GitHub repositories and visualizes their most used languages and commit activity. This specific project landed me a US-based client who needed data visualization.</p>
            
            <p><strong>Pro Tip:</strong> Deploy your projects to Railway.app or Render, share the live links on Twitter, and watch the clients DM you.</p>
        `
    },
    {
        title: 'Why Nigerian Businesses Need Websites Now',
        date: 'Dec 18, 2025',
        excerpt: 'Relying solely on WhatsApp Business is costing you 70% of your potential customers.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>Why Nigerian Businesses Need Websites in 2026</h2>
            <p>I see it every day: a great local business relying 100% on their WhatsApp Business page or an Instagram account. While these are great tools, relying solely on them means you are losing up to 70% of potential customers. Here's why websites win...</p>
            
            <h3>The Limits of WhatsApp & Instagram</h3>
            <ul>
                <li><strong>No Professional Catalog:</strong> Scrolling through a chat history to find a product is frustrating for buyers.</li>
                <li><strong>Zero Google Visibility:</strong> When someone in Abuja searches "best cake shop near me", your WhatsApp number won't show up. A website will.</li>
                <li><strong>Trust Factor:</strong> A dedicated domain name (e.g., yourbusiness.com.ng) instantly builds trust compared to a free social media profile.</li>
            </ul>

            <h3>The $20 Website Strategy</h3>
            <p>A website doesn't have to cost millions. I built a simple, fast website for a local butcher shop. The result? A 300% increase in orders within two months. By using free hosting (like Netlify or Vercel) and buying a local domain name (N5k/year), the overhead is incredibly low.</p>

            <h3>My 3-Step Client Conversion Formula</h3>
            <p>When I build sites for local businesses, I focus on conversion, not just pretty designs:</p>
            <ol>
                <li><strong>The Hero Section:</strong> A clear value proposition ("Fresh meat delivery - Order now!") paired with a prominent "Chat on WhatsApp" button.</li>
                <li><strong>The Catalog:</strong> A clean grid of high-quality photos and clear prices. No "DM for price" nonsense.</li>
                <li><strong>The Contact/Trust Area:</strong> Embedded Google Maps, clear phone numbers, and customer testimonials.</li>
            </ol>
            
            <p>80% of customers visit Google first before making a purchasing decision. If you aren't there, you are leaving money on the table. Be #1 or lose business.</p>
        `
    },
    {
        title: 'React for Beginners: Build Fast in 2025',
        date: 'Dec 15, 2025',
        excerpt: 'Why freelancers charge $500+ for React apps, and how you can start building them.',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>React for Beginners: Build Fast Sites in 2026</h2>
            <p>If you know HTML, CSS, and basic JavaScript, learning React is the highest-ROI skill you can acquire. It's the reason freelancers can charge $500+ for web applications instead of $50 for static pages.</p>
            
            <h3>React vs Static Sites</h3>
            <ul>
                <li><strong>Static Sites (HTML/CSS):</strong> Great for basic informational sites, portfolios, and landing pages. Hard to manage when the site grows to 50+ pages.</li>
                <li><strong>React (Single Page Applications):</strong> Perfect for dynamic dashboards, interactive UIs, e-commerce, and anything requiring complex user state.</li>
            </ul>

            <h3>The Power of Components</h3>
            <p>React lets you build reusable UI pieces. For a hotel booking project I built, I created a single <code>BookingCard</code> component and reused it 50 times with different data.</p>
            
            <pre><code>import React, { useState } from 'react';

function BookingCard({ room }) {
    const [isBooked, setIsBooked] = useState(false);

    return (
        &lt;div className="p-4 border rounded-lg shadow-md"&gt;
            &lt;h3 className="text-xl font-bold"&gt;{room.name}&lt;/h3&gt;
            &lt;p className="text-gray-600"&gt;₦{room.price}/night&lt;/p&gt;
            
            &lt;button 
                onClick={() =&gt; setIsBooked(true)}
                disabled={isBooked}
                className={\`mt-2 px-4 py-2 rounded \${isBooked ? 'bg-gray-400' : 'bg-blue-600 text-white'}\`}
            &gt;
                {isBooked ? 'Reserved' : 'Book Now'}
            &lt;/button&gt;
        &lt;/div&gt;
    );
}</code></pre>
            
            <h3>The 2026 Modern Stack</h3>
            <p>Don't overcomplicate things. The best stack for a beginner right now is: <strong>Vite + React + Tailwind CSS + Vercel (for hosting)</strong>. It's blazing fast to develop and free to host.</p>
        `
    },
    {
        title: 'Freelance Developer Roadmap',
        date: 'Dec 28, 2025',
        excerpt: 'How I went from self-taught beginner to earning $2k/month in 6 months.',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800',
        content: `
            <h2>Freelance Developer Roadmap 2026</h2>
            <p>Everyone asks me how to get clients. The truth is, it's not about knowing every programming language; it's about solving problems and showing proof of work. Here is my exact roadmap from self-taught to $2k/month.</p>
            
            <h3>Phase 1: The Proof of Work (Month 1)</h3>
            <p>Clients don't care about your certificates; they care about what you can build.</p>
            <ul>
                <li>Build 3-5 solid projects (not just to-do lists). Think: a local business website, a data dashboard, and an API integration.</li>
                <li>Host them live on Vercel or GitHub Pages.</li>
                <li>Document your building process on Twitter/X. Build in public.</li>
            </ul>

            <h3>Phase 2: The First Clients (Month 2-3)</h3>
            <p>Start local. Don't jump straight to Upwork where competition is fierce.</p>
            <ul>
                <li>Identify local businesses (restaurants, gyms, salons) using only WhatsApp or Instagram.</li>
                <li>Build a mockup of a website for them <em>before</em> pitching.</li>
                <li>Pitch them: "I built this for you. It will help you get Google traffic. It's N50k."</li>
                <li>Goal: Get 3 paying clients to build confidence and testimonials.</li>
            </ul>

            <h3>Phase 3: Scaling Up (Month 4+)</h3>
            <p>Once you have a portfolio of real client work, you can increase your rates and target international clients.</p>
            <ul>
                <li>Move from static sites to SaaS dashboards and custom web apps (React/Node.js).</li>
                <li>Start charging $500 - $1000+ USD per project.</li>
                <li>Learn to integrate payment gateways like Stripe or Paystack.</li>
                <li>Ask for referrals from your first clients.</li>
            </ul>
            
            <p><strong>Essential Tools:</strong> Vercel (Hosting), Figma (Design), Tailwind CSS (Styling), and strong communication skills.</p>
        `
    },
];
