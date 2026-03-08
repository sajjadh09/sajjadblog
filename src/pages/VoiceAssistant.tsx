import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type AppState = 'idle' | 'listening' | 'thinking' | 'speaking' | 'error';

export default function VoiceAssistant() {
  const [appState, setAppState] = useState<AppState>('idle');
  const [transcript, setTranscript] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    synthRef.current = window.speechSynthesis;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setAppState('listening');
        setTranscript('');
        setBotMessage('');
        setErrorMsg(null);
      };

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        setTranscript(interimTranscript || finalTranscript);
        
        if (finalTranscript) {
          processUserInput(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          setErrorMsg('Microphone access denied. Please allow permissions.');
          setAppState('error');
        } else if (event.error !== 'no-speech') {
          setErrorMsg(`Error: ${event.error}`);
          setAppState('error');
        } else {
          setAppState('idle');
        }
      };

      recognitionRef.current.onend = () => {
        // If we are still in listening state and it ended without final results, go back to idle
        setAppState((prev) => (prev === 'listening' ? 'idle' : prev));
      };
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const processUserInput = async (text: string) => {
    setAppState('thinking');
    
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: text,
        config: {
          systemInstruction: "You are a helpful, friendly, and concise voice assistant. Keep your answers brief (1-3 sentences) so they are easy to listen to. You can answer questions, give suggestions, tell jokes, and have a natural conversation.",
        }
      });
      
      const reply = response.text || "I'm sorry, I couldn't process that.";
      setBotMessage(reply);
      speakResponse(reply);
      
    } catch (error) {
      console.error("Gemini API Error:", error);
      setErrorMsg("Failed to connect to the AI brain. Please try again.");
      setAppState('error');
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current) return;
    
    synthRef.current.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to find a good voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google UK English')) || voices[0];
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.onstart = () => setAppState('speaking');
    utterance.onend = () => setAppState('idle');
    utterance.onerror = () => setAppState('idle');
    
    synthRef.current.speak(utterance);
  };

  const toggleListening = () => {
    if (appState === 'listening') {
      recognitionRef.current?.stop();
      setAppState('idle');
    } else if (appState === 'speaking') {
      synthRef.current?.cancel();
      setAppState('idle');
    } else {
      try {
        recognitionRef.current?.start();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // Dynamic styles for the Orb based on state
  const getOrbStyles = () => {
    switch (appState) {
      case 'listening':
        return {
          core: 'scale-125 bg-white',
          glow1: 'scale-150 bg-purple-400 opacity-60 animate-pulse',
          glow2: 'scale-125 bg-blue-500 opacity-40 animate-pulse',
        };
      case 'thinking':
        return {
          core: 'scale-90 bg-white opacity-80 animate-pulse',
          glow1: 'scale-110 bg-pink-400 opacity-50 animate-[spin_3s_linear_infinite]',
          glow2: 'scale-100 bg-indigo-500 opacity-30 animate-[spin_2s_linear_infinite_reverse]',
        };
      case 'speaking':
        return {
          core: 'scale-110 bg-white animate-[pulse_0.5s_ease-in-out_infinite]',
          glow1: 'scale-150 bg-teal-400 opacity-70 animate-[pulse_0.5s_ease-in-out_infinite_alternate]',
          glow2: 'scale-150 bg-emerald-500 opacity-50 animate-[pulse_0.7s_ease-in-out_infinite_alternate]',
        };
      case 'error':
        return {
          core: 'scale-100 bg-red-100',
          glow1: 'scale-110 bg-red-500 opacity-50',
          glow2: 'scale-100 bg-red-600 opacity-30',
        };
      case 'idle':
      default:
        return {
          core: 'scale-100 bg-white opacity-90',
          glow1: 'scale-100 bg-indigo-400 opacity-30 animate-[pulse_4s_ease-in-out_infinite]',
          glow2: 'scale-100 bg-purple-500 opacity-20',
        };
    }
  };

  const orbStyles = getOrbStyles();

  const getStatusText = () => {
    switch (appState) {
      case 'listening': return 'Listening...';
      case 'thinking': return 'Thinking...';
      case 'speaking': return 'Speaking...';
      case 'error': return 'Error';
      case 'idle': default: return 'Tap to speak';
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-[#050505] text-white font-sans overflow-hidden selection:bg-indigo-500/30 relative">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Noise Overlay */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        
        {/* Ambient Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-indigo-900/20 mix-blend-screen filter blur-[100px] animate-[spin_20s_linear_infinite]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 mix-blend-screen filter blur-[120px] animate-[spin_25s_linear_infinite_reverse]"></div>
        <div className="absolute top-[20%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-teal-900/10 mix-blend-screen filter blur-[80px] animate-[pulse_10s_ease-in-out_infinite]"></div>
      </div>

      {/* Top Navigation */}
      <div className="w-full p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-2 opacity-70">
          <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></div>
          <span className="text-sm font-medium tracking-widest uppercase text-indigo-100">AI Assistant</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://github.com/sajjad/ai-voice-assistant" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white/70 hover:text-white flex items-center gap-2">
            Source Code
          </a>
          <Link 
            to="/" 
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center backdrop-blur-md transition-colors"
            onClick={() => synthRef.current?.cancel()}
          >
            <X size={20} className="text-white" />
          </Link>
        </div>
      </div>

      {/* Main Content Area (The Orb) */}
      <div className="flex-1 flex flex-col items-center justify-center relative px-6 z-10">
        
        {/* Transcript / Bot Message Display */}
        <div className="absolute top-10 left-0 w-full px-8 text-center flex flex-col items-center justify-center min-h-[100px]">
          {appState === 'error' && errorMsg ? (
            <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-2 rounded-full backdrop-blur-md border border-red-500/20">
              <AlertCircle size={18} />
              <span className="text-sm">{errorMsg}</span>
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-light text-indigo-50 max-w-2xl leading-relaxed transition-all duration-500 drop-shadow-lg">
              {appState === 'speaking' ? botMessage : transcript}
            </p>
          )}
        </div>

        {/* The ChatGPT-style Orb */}
        <button 
          onClick={toggleListening}
          className="relative flex items-center justify-center w-64 h-64 focus:outline-none group cursor-pointer mt-12"
        >
          {/* Outer Glow 2 */}
          <div className={`absolute w-56 h-56 rounded-full mix-blend-screen filter blur-3xl transition-all duration-1000 ease-in-out ${orbStyles.glow2}`}></div>
          
          {/* Outer Glow 1 */}
          <div className={`absolute w-40 h-40 rounded-full mix-blend-screen filter blur-2xl transition-all duration-700 ease-in-out ${orbStyles.glow1}`}></div>
          
          {/* Core */}
          <div className={`absolute w-24 h-24 rounded-full mix-blend-screen filter blur-md transition-all duration-500 ease-in-out shadow-[0_0_40px_rgba(255,255,255,0.8)] ${orbStyles.core}`}></div>
          
          {/* Solid Center (to hide the background completely in the middle) */}
          <div className={`absolute w-16 h-16 bg-white rounded-full transition-all duration-300 ${appState === 'listening' ? 'scale-110' : 'scale-100'}`}></div>
        </button>

      </div>

      {/* Bottom Controls */}
      <div className="w-full p-8 flex flex-col items-center justify-end z-10 pb-12">
        <p className="text-indigo-200/60 text-sm font-medium tracking-wide mb-8 transition-all duration-300">
          {getStatusText()}
        </p>
        
        <div className="flex items-center gap-6">
          <button 
            onClick={toggleListening}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
              appState === 'listening' || appState === 'speaking' || appState === 'thinking'
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30' 
                : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
            }`}
          >
            {appState === 'listening' || appState === 'speaking' || appState === 'thinking' ? (
              <X size={24} />
            ) : (
              <Mic size={24} />
            )}
          </button>
        </div>
      </div>

    </div>
  );
}
