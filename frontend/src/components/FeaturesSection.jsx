function FeaturesSection() {
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
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="features">
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                02 — EVERYTHING IN VIEW
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-16 leading-tight">
                Smart signals for<br />
                <em className="font-playfair font-normal text-emerald-400">healthier growth.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((item, idx) => (
                    <div key={idx} className="glass-card glass-card-hover p-8 space-y-4">
                        <span className="text-2xl text-emerald-400 font-mono block mb-2">{item.icon}</span>
                        <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;
