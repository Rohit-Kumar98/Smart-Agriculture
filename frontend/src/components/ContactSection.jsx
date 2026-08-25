import { useState } from "react";

function ContactSection() {
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div>
                    <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                        07 — GET IN TOUCH
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6 leading-tight">
                        Let’s grow<br />
                        <em className="font-playfair font-normal text-emerald-400">something better.</em>
                    </h2>
                    <p className="text-slate-400 text-sm md:text-base max-w-md leading-relaxed mb-8">
                        Have a question or a project in mind? We would love to hear from you.
                    </p>

                    <div className="flex gap-6 text-sm font-semibold text-emerald-400">
                        <a href="#contact" className="hover:text-emerald-300 transition-colors">GitHub</a>
                        <a href="#contact" className="hover:text-emerald-300 transition-colors">LinkedIn</a>
                        <a href="mailto:hello@plantmonitoring.system" className="hover:text-emerald-300 transition-colors">Email</a>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="glass-card p-8 bg-slate-900/80 border border-white/10 space-y-5">
                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Name</label>
                        <input
                            type="text"
                            required
                            placeholder="Alex Green"
                            className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Email</label>
                        <input
                            type="email"
                            required
                            placeholder="alex@example.com"
                            className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Message</label>
                        <textarea
                            rows="4"
                            required
                            placeholder="Tell us about your growing space..."
                            className="w-full rounded-xl bg-slate-950/80 border border-white/10 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-emerald-400 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-xl bg-emerald-500 py-3.5 px-6 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                        {sent ? "Message sent ✓" : "Send message ↗"}
                    </button>
                </form>
            </div>

            <footer className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
                <p>© 2026 Plant Monitoring System. All rights reserved.</p>
                <a href="#hero" className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">Back to top ↑</a>
            </footer>
        </section>
    );
}

export default ContactSection;
