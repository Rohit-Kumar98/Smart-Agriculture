function AboutSection() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="about">
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                01 — SMART PLANT CARE
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Every plant has a story.<br />
                    <em className="font-playfair font-normal text-emerald-400">Now you can read it.</em>
                </h2>

                <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                    <p className="font-medium text-white">
                        Plant Monitoring System uses connected sensors to understand exactly what your plants need—at the right moment.
                    </p>
                    <p className="text-slate-400 text-sm md:text-base">
                        Track soil moisture, temperature, humidity, light intensity, and plant health status in real time. Simple insights help your plants thrive while reducing water wastage.
                    </p>
                    <div className="pt-2">
                        <a href="#features" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                            Explore the system <span className="text-lg">↓</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Stat Row matching Screenshot 3 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 glass-card border border-white/10 rounded-2xl">
                <div className="space-y-1 border-r border-white/10 last:border-0 pr-4">
                    <span className="block text-4xl md:text-5xl font-black text-white tracking-tight">24/7</span>
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400">live monitoring</span>
                </div>
                <div className="space-y-1 border-r border-white/10 last:border-0 pr-4">
                    <span className="block text-4xl md:text-5xl font-black text-white tracking-tight">5</span>
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400">vital signals tracked</span>
                </div>
                <div className="space-y-1 border-r border-white/10 last:border-0 pr-4">
                    <span className="block text-4xl md:text-5xl font-black text-white tracking-tight">30%</span>
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400">less water used</span>
                </div>
                <div className="space-y-1 pr-4">
                    <span className="block text-4xl md:text-5xl font-black text-white tracking-tight">1</span>
                    <span className="block text-xs font-mono uppercase tracking-wider text-slate-400">clear dashboard</span>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
