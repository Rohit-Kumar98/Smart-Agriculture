function BenefitsSection() {
    const benefits = [
        {
            num: "01",
            title: "Save Chemical Costs",
            desc: "Spray pesticides only where infection exists instead of blanket field spraying."
        },
        {
            num: "02",
            title: "Prevent Soil Toxicity",
            desc: "Protect beneficial soil microbes and maintain balanced soil pH."
        },
        {
            num: "03",
            title: "Early Outbreak Control",
            desc: "Detect fungal and bacterial leaf diseases before they spread to entire crops."
        },
        {
            num: "04",
            title: "Water Conservation",
            desc: "Precision soil moisture tracking ensures water is delivered only when root zone requires it."
        },
        {
            num: "05",
            title: "Open Hardware Integration",
            desc: "Compatible with ESP32, Raspberry Pi, Arduino, and standard JSON HTTP payloads."
        },
        {
            num: "06",
            title: "Eco-Friendly Farming",
            desc: "Substantially reduces chemical runoff into water tables and surrounding ecosystems."
        }
    ];

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="benefits">
            <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                05 — GROW WITH PURPOSE
            </div>

            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-16 leading-tight">
                Good for crops.<br />
                <em className="font-playfair font-normal text-emerald-400">Smarter for the farm.</em>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {benefits.map((item, idx) => (
                    <div key={idx} className="glass-card glass-card-hover p-8 space-y-3">
                        <span className="text-xs font-mono font-bold text-emerald-400 block mb-2">{item.num}</span>
                        <h3 className="text-xl font-bold text-white tracking-tight">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default BenefitsSection;
