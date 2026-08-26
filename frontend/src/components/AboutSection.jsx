function AboutSection() {
    const features = [
        {
            icon: "⌁",
            title: "Real-Time Monitoring",
            desc: "Always know what is happening in the soil and around every leaf."
        },
        {
            icon: "◌",
            title: "IoT Sensor Integration",
            desc: "Connect ESP32 or Arduino devices with a quick, dependable setup."
        },
        {
            icon: "✦",
            title: "Automatic Alerts",
            desc: "Receive thoughtful notifications before a little issue becomes a big one."
        },
        {
            icon: "◫",
            title: "Data Visualization",
            desc: "Turn readings into clear trends, comparisons, and useful decisions."
        },
        {
            icon: "▣",
            title: "Mobile Dashboard",
            desc: "Stay close to your garden from any screen, wherever you are."
        },
        {
            icon: "◒",
            title: "Water Saving Analytics",
            desc: "Water precisely when needed and see the impact of every drop saved."
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 scroll-mt-20" id="about">
            {/* Section Tag */}
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                SMART PLANT CARE & TELEMETRY
            </div>

            {/* Combined Section Headline */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-start">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                    Every plant has a story.<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                        Smart signals for healthier growth.
                    </span>
                    <br />
                    <em className="font-playfair font-normal text-emerald-400/90 text-3xl md:text-4xl block mt-2">
                        Now you can read it in real time.
                    </em>
                </h2>

                <div className="space-y-4 text-slate-300 text-base md:text-lg leading-relaxed">
                    <p className="font-medium text-white">
                        Plant Monitoring System combines connected IoT sensors and smart signal analytics to understand exactly what your plants need—at the precise moment they need it.
                    </p>
                    <p className="text-slate-400 text-sm md:text-base">
                        Track soil moisture, ambient temperature, humidity, light intensity, and plant health status live. Simple, automated insights ensure optimal growth while dramatically reducing water waste.
                    </p>
                    <div className="pt-2">
                        <a href="#dashboard" className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group">
                            Jump to Live Dashboard <span className="text-lg transition-transform group-hover:translate-x-1">→</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Features Signal Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((item, idx) => (
                    <div key={idx} className="glass-card glass-card-hover p-8 space-y-4 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(74,222,128,0.15)] group">
                        <span className="text-3xl text-emerald-400 font-mono block mb-2 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-300">{item.icon}</span>
                        <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-emerald-300 transition-colors">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AboutSection;
