
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles, Bot } from 'lucide-react';
import { generateCounselingResponse } from '../services/geminiService';
import { ChatMessage } from '../types';
import { useData } from '../context/DataContext';

const AICounselor: React.FC = () => {
  const { aiSettings } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on settings
  useEffect(() => {
    if (messages.length === 0) {
        setMessages([{
            id: 'welcome',
            role: 'model',
            text: aiSettings.welcomeMessage || 'नमस्ते! मैं द्रोणा हूँ। मैं आपकी कैसे मदद कर सकता हूँ?',
            timestamp: new Date()
        }]);
    }
  }, [aiSettings.welcomeMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  // Prevent background scrolling when chat is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      // Pass the current settings to the service
      const responseText = await generateCounselingResponse(input, history, aiSettings);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-orange-600 to-red-600 text-white animate-bounce-slow"
          aria-label="Open AI Counselor"
        >
          <div className="relative">
              <MessageCircle size={28} />
              <span className="absolute -top-2 -right-2 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-200 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-yellow-400 text-[10px] items-center justify-center font-bold text-orange-900">AI</span>
              </span>
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:bottom-6 md:right-6 z-[60] w-full md:w-96 h-full md:h-[550px] md:max-h-[85vh] bg-white md:rounded-2xl shadow-2xl md:border border-orange-200 flex flex-col transition-all animate-fade-in-up">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 flex justify-between items-center text-white shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full border border-white/30">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-base font-heading">AI 'द्रोणा' (Counselor)</h3>
                <p className="text-xs text-orange-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> ऑनलाइन
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-orange-50/50 space-y-4 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-orange-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-orange-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-orange-100 shadow-sm flex items-center gap-2">
                  <Sparkles size={16} className="text-orange-500 animate-spin" />
                  <span className="text-xs text-gray-500 font-medium">द्रोणा सोच रहे हैं...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-100 pb-safe shrink-0">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="अपना सवाल पूछें..."
                className="flex-1 bg-transparent outline-none text-base md:text-sm text-gray-700 placeholder-gray-400 h-10"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="text-orange-600 hover:text-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-90 transition p-2"
              >
                <Send size={24} className="md:w-5 md:h-5" />
              </button>
            </div>
            <div className="text-center mt-2">
                <p className="text-[10px] text-gray-400 font-medium pb-1 md:pb-0">MDC Smart Support</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AICounselor;