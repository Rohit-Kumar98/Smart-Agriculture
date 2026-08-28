import { useState } from "react";

function ContactSection() {
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [newsletterSent, setNewsletterSent] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (newsletterEmail) {
            setNewsletterSent(true);
            setTimeout(() => setNewsletterSent(false), 4000);
            setNewsletterEmail("");
        }
    };

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="contact">
            {/* Top Contact Form Block */}
            <div className="mb-20">
                <div>
                    <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4 font-bold">
                        GET IN TOUCH
                    </div>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Let’s grow<br />
                        <em className="font-playfair font-normal text-emerald-400">something better.</em>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed mb-8">
                        Have a question or a project in mind? We would love to hear from you.
                    </p>

                    {/* Social Links with Icons matching screenshot */}
                    <div className="flex items-center gap-6 text-sm font-semibold text-emerald-400">
                        <a href="https://github.com/Rohit-Kumar98/Smart-Agriculture.git" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors group">
                            <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                            </svg>
                            <span>GitHub</span>
                        </a>

                        <a href="https://youtu.be/jzK3t4D7A0U?si=NvH62Q2QdvVZWC9Y" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors group">
                            <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                            </svg>
                            <span>YouTube</span>
                        </a>

                        <a href="https://www.instagram.com/plantspeakkkk?igsi=Ym5jMGlnNHdrbWpr" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-emerald-300 transition-colors group">
                            <svg className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <rect x="3" y="3" width="18" height="18" rx="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                            </svg>
                            <span>Instagram</span>
                        </a>
                    </div>
                </div>

            </div>

            {/* Comprehensive Footer Section matching Screenshot */}
            <footer className="glass-card p-8 md:p-10 bg-[#09120d]/95 border border-white/10 rounded-3xl shadow-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 items-start">
                    
                    {/* Brand Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight text-white">
                            <svg width="24" height="24" viewBox="0 0 256 256" fill="none" className="text-emerald-400">
                                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="currentColor" />
                            </svg>
                            <span>Plant<span className="font-light text-emerald-400">Speak</span></span>
                        </div>
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Building digital experiences that create real impact.
                        </p>
                        <p className="text-[11px] text-slate-500 font-mono">
                            © 2026 PlantSpeak. All rights reserved.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 text-xs text-slate-300 font-medium">
                            <li><a href="#hero" className="hover:text-emerald-300 transition-colors">Home</a></li>
                            <li><a href="#about" className="hover:text-emerald-300 transition-colors">About</a></li>
                            <li><a href="#dashboard" className="hover:text-emerald-300 transition-colors">Dashboard</a></li>
                            <li><a href="#benefits" className="hover:text-emerald-300 transition-colors">Purpose</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Services</h4>
                        <ul className="space-y-2 text-xs text-slate-300 font-medium">
                            <li><span className="hover:text-emerald-300 transition-colors cursor-pointer">IoT Telemetry</span></li>
                            <li><span className="hover:text-emerald-300 transition-colors cursor-pointer">AI Diagnostics</span></li>
                            <li><span className="hover:text-emerald-300 transition-colors cursor-pointer">Smart Sprinkling</span></li>
                            <li><span className="hover:text-emerald-300 transition-colors cursor-pointer">Soil Analytics</span></li>
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="space-y-3">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">📍</span>
                                <span>
                                    Institute of Technical Education and Research (ITER)<br />
                                    Siksha 'O' Anusandhan<br />
                                    Bhubaneswar, Odisha 751030
                                </span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">✉️</span>
                                <a href="mailto:plantspeak0@gmail.com" className="hover:text-emerald-300 transition-colors">plantspeak0@gmail.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-emerald-400 text-sm">📞</span>
                                <a href="tel:+919771843923" className="hover:text-emerald-300 transition-colors">+91 9771843923</a>
                            </li>
                        </ul>
                    </div>

                    {/* Follow Us & Stay in the Loop Newsletter */}
                    <div className="space-y-4">
                        <h4 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">Follow Us</h4>
                        
                        {/* Social Icon circles */}
                        <div className="flex items-center gap-2">
                            <a href="https://github.com/Rohit-Kumar98/Smart-Agriculture.git" target="_blank" rel="noreferrer" aria-label="GitHub" className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                            </a>
                            <a href="https://youtu.be/jzK3t4D7A0U?si=NvH62Q2QdvVZWC9Y" target="_blank" rel="noreferrer" aria-label="YouTube" className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z"/></svg>
                            </a>
                            <a href="https://www.instagram.com/plantspeakkkk?igsi=Ym5jMGlnNHdrbWpr" target="_blank" rel="noreferrer" aria-label="Instagram" className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-emerald-500/20 hover:text-emerald-400 hover:border-emerald-500/30 transition-all">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                            </a>
                        </div>

                        <div>
                            <span className="text-xs font-mono font-bold text-slate-300 block mb-1">Stay in the loop</span>
                            <p className="text-[11px] text-slate-400 mb-2">Get updates on new projects and insights.</p>
                            <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-1">
                                <input
                                    type="email"
                                    required
                                    value={newsletterEmail}
                                    onChange={(e) => setNewsletterEmail(e.target.value)}
                                    placeholder="Your email"
                                    className="w-full rounded-xl bg-slate-950/90 border border-white/15 px-3.5 py-2 text-xs text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-md"
                                >
                                    {newsletterSent ? "✓" : "→"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                    <p>© 2026 PlantSpeak. All rights reserved.</p>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors cursor-pointer group"
                    >
                        <span>Back to top</span>
                        <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                    </button>
                </div>
            </footer>
        </section>
    );
}

export default ContactSection;
