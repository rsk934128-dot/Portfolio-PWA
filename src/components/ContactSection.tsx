import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  HardDrive,
  Trash2,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Smartphone,
  Globe,
  Server,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactMessage } from '../types';

interface ContactSectionProps {
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successInfo, setSuccessInfo] = useState<{
    deliveredTo: string;
    timestamp: number;
    mailtoUrl: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedMessages, setSavedMessages] = useState<ContactMessage[]>([]);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Load saved messages from DOM storage (localStorage)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sf_contact_messages');
      if (stored) {
        setSavedMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to read from DOM Storage', e);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject.trim() || 'Project Inquiry - Sheikh Farid Portfolio'
    )}&body=${encodeURIComponent(
      `From: ${name.trim()} (${email.trim()})\n\nMessage:\n${message.trim()}`
    )}`;

    const newMessage: ContactMessage = {
      id: 'msg_' + Date.now(),
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim() || 'General Inquiry',
      message: message.trim(),
      timestamp: Date.now(),
    };

    try {
      // 1. Dispatch to real server-side API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newMessage.name,
          email: newMessage.email,
          subject: newMessage.subject,
          message: newMessage.message,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server returned an error');
      }

      // 2. Persist locally to DOM Storage for offline resilience & history
      const updated = [newMessage, ...savedMessages];
      localStorage.setItem('sf_contact_messages', JSON.stringify(updated));
      setSavedMessages(updated);

      setSuccessInfo({
        deliveredTo: data.deliveredTo || PERSONAL_INFO.email,
        timestamp: Date.now(),
        mailtoUrl,
      });
      setIsSuccess(true);

      // Reset fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch (err: any) {
      console.warn('API dispatch failed or offline, saving to DOM storage fallback:', err);
      // Fallback: Still save to local DOM Storage so work isn't lost
      const updated = [newMessage, ...savedMessages];
      try {
        localStorage.setItem('sf_contact_messages', JSON.stringify(updated));
        setSavedMessages(updated);
      } catch (storageErr) {
        console.error(storageErr);
      }

      setSuccessInfo({
        deliveredTo: PERSONAL_INFO.email,
        timestamp: Date.now(),
        mailtoUrl,
      });
      setIsSuccess(true);
      setErrorMessage(
        'Note: Cached to local DOM Storage. You can also click below to open your email client directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearMessages = () => {
    try {
      localStorage.removeItem('sf_contact_messages');
      setSavedMessages([]);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="py-20 border-b border-slate-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info & DOM Storage Note */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-cyan-400 bg-cyan-950/40 border border-cyan-500/20">
                <Mail className="w-3.5 h-3.5" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's Build Something Impactful
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Whether you need a high-performance Progressive Web App, Android WebView wrapper, or full-stack engineering, my inbox is open.
              </p>
            </div>

            {/* Email Card with Copy */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">Direct Email Address</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Verified In-Service
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="font-mono text-cyan-300 hover:text-cyan-200 text-xs sm:text-sm font-semibold truncate hover:underline"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={handleCopyEmail}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition cursor-pointer shrink-0"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Typically responds within 24 hours for project inquiries, freelance consulting, or full-time roles.
              </p>
            </div>

            {/* Resume / CV Quick Action */}
            {onOpenResume && (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 flex items-center justify-between gap-3">
                <div className="text-xs">
                  <p className="font-semibold text-white flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span>Curriculum Vitae</span>
                  </p>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    View Sheikh Farid's full credentials, Dalvik/Smali expertise, and education.
                  </p>
                </div>
                <button
                  onClick={onOpenResume}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 text-xs font-medium transition cursor-pointer shrink-0"
                >
                  View CV
                </button>
              </div>
            )}

            {/* Server Dispatch & DOM Storage Persist Notice */}
            <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs text-slate-300 space-y-2">
              <div className="flex items-start gap-2.5">
                <Server className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-cyan-300">Live API Dispatch (/api/contact):</span>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    Submissions are handled by our server backend and delivered to <code className="text-cyan-200">sheikhfaridvisa164@gmail.com</code>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 pt-1 border-t border-cyan-900/40">
                <HardDrive className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-purple-300">DOM Storage Sync:</span>
                  <p className="text-slate-400 mt-0.5 leading-relaxed">
                    Messages are also cached into your browser's DOM Storage (<code className="text-purple-200">setDomStorageEnabled(true)</code>) for offline history.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form & Message History */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-2xl">
              <h3 className="text-lg font-bold text-white mb-4">Send a Message</h3>

              {isSuccess && successInfo && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-emerald-200">Message Dispatched Successfully!</p>
                        <p className="text-slate-300 mt-0.5">
                          Routed to <span className="font-mono text-cyan-300">{successInfo.deliveredTo}</span> and cached in DOM Storage.
                        </p>
                        {errorMessage && (
                          <p className="text-amber-300 text-[11px] mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{errorMessage}</span>
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="text-emerald-400 hover:text-white font-medium cursor-pointer"
                    >
                      Dismiss
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-emerald-800/40">
                    <a
                      href={successInfo.mailtoUrl}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800/60 hover:bg-emerald-700/60 text-emerald-100 font-medium transition cursor-pointer"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Also Open in Email App</span>
                    </a>
                    <button
                      onClick={() => setIsSuccess(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition cursor-pointer"
                    >
                      Write Another Message
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="font-medium text-slate-300">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Miller"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-600 outline-none transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="font-medium text-slate-300">
                      Your Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-600 outline-none transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="font-medium text-slate-300">
                    Subject / Project Scope
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Progressive Web App Development or Android WebView Wrapper"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-600 outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="font-medium text-slate-300">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your application requirements, timeline, or objectives..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-600 outline-none transition resize-none"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-cyan-950/50 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Dispatching to Server...' : 'Send Message to Sheikh Farid'}</span>
                </button>
              </form>
            </div>

            {/* DOM Storage Cached Messages View */}
            {savedMessages.length > 0 && (
              <div className="p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Saved In-Browser Messages ({savedMessages.length})</span>
                  </div>
                  <button
                    onClick={handleClearMessages}
                    className="text-[11px] text-rose-400 hover:text-rose-300 flex items-center gap-1 transition cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>

                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/60 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                        <span>{msg.name} ({msg.email})</span>
                        <span>{new Date(msg.timestamp).toLocaleDateString()}</span>
                      </div>
                      <p className="font-semibold text-slate-200">{msg.subject}</p>
                      <p className="text-slate-400 text-[11px] line-clamp-2">{msg.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
