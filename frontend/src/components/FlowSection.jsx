function FlowSection() {
    const steps = [
        { num: "01", name: "Sensors", desc: "Observe soil & air" },
        { num: "02", name: "ESP32 / Arduino", desc: "Processes readings" },
        { num: "03", name: "Cloud Database", desc: "Stores securely" },
        { num: "04", name: "Web Dashboard", desc: "Reveals patterns" },
        { num: "05", name: "Notifications", desc: "Guides your next move" }
    ];

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="flow">
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                03 — HOW IT FLOWS
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-16 leading-tight">
                From a tiny signal<br />
                <em className="font-playfair font-normal text-emerald-400">to meaningful care.</em>
            </h2>

            {/* 5-Step Pipeline Grid matching Screenshot 1 */}
            <div className="glass-card p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start relative">
                    {steps.map((step, idx) => (
                        <div key={idx} className="relative flex flex-col justify-between">
                            <div>
                                <span className="text-xs font-mono text-emerald-400 block mb-3 font-semibold">{step.num}</span>
                                <h4 className="text-lg font-bold text-white mb-1 tracking-tight">{step.name}</h4>
                                <p className="text-xs text-slate-400">{step.desc}</p>
                            </div>
                            
                            {idx < steps.length - 1 && (
                                <span className="hidden md:block absolute -right-4 top-2 text-emerald-400/50 font-mono text-sm">→</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FlowSection;
