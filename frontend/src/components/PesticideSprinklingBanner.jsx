import { useState } from "react";

function PesticideSprinklingBanner({ observation }) {
    const [isManualActive, setIsManualActive] = useState(false);

    if (!observation) return null;

    const disease = observation.disease || "Healthy Crop";
    const severity = observation.severity || "None";
    const rawConf = observation.confidence ?? 0.95;
    const confidence = rawConf > 1 ? rawConf / 100 : rawConf;

    const isHealthy =
        !disease ||
        disease.toLowerCase().includes("healthy") ||
        disease.toLowerCase().includes("none");

    let infectionPct = 0;
    let dosageMl = 0;
    let flowRate = 0;
    let sprinklerStatus = "IDLE";
    let stateText = "SPRINKLER IDLE 🟢";

    if (!isHealthy) {
        const sevLower = severity.toLowerCase();
        if (sevLower === "low") {
            infectionPct = Math.round(25 * confidence);
            dosageMl = 15;
            flowRate = 0.5;
            sprinklerStatus = "ACTIVE";
            stateText = "LOW DOSAGE ACTIVE 💧";
        } else if (sevLower === "moderate") {
            infectionPct = Math.round(60 * confidence);
            dosageMl = 35;
            flowRate = 1.2;
            sprinklerStatus = "ACTIVE";
            stateText = "MODERATE SPRAY ACTIVE 💧";
        } else if (sevLower === "high" || sevLower === "severe") {
            infectionPct = Math.min(100, Math.round(92 * confidence));
            dosageMl = 65;
            flowRate = 2.4;
            sprinklerStatus = "WARNING";
            stateText = "HIGH DOSAGE REQUIRED ⚠️";
        }
    }

    if (isManualActive) {
        sprinklerStatus = "ACTIVE";
        stateText = "MANUAL SPRAY OVERRIDE 💧";
        if (dosageMl === 0) {
            dosageMl = 25;
            flowRate = 1.0;
        }
    }

    return (
        <div className="rounded-2xl border border-emerald-500/20 bg-linear-to-br from-slate-900 via-slate-850 to-emerald-950 p-6 text-white shadow-xl mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-700/60 pb-5">
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/20 text-2xl border border-emerald-500/30">
                        💧
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight text-emerald-400">
                            Intelligent Pesticide Sprinkling System
                        </h3>
                        <p className="text-xs text-slate-300">
                            Automated chemical metering scaled strictly by crop disease infection severity.
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide border ${
                            sprinklerStatus === "IDLE"
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                                : sprinklerStatus === "WARNING"
                                ? "bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse"
                                : "bg-sky-500/20 text-sky-300 border-sky-500/40 animate-pulse"
                        }`}
                    >
                        <span className="h-2 w-2 rounded-full bg-current" />
                        {stateText}
                    </span>
                </div>
            </div>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Diagnosed Disease
                    </span>
                    <span className="text-base font-bold text-slate-100 block mt-1">
                        {disease}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">
                        Severity: {severity} ({Math.round(confidence * 100)}% conf)
                    </span>
                </div>

                <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Infection Level
                    </span>
                    <span className="text-2xl font-black text-emerald-400 block mt-0.5">
                        {infectionPct}%
                    </span>
                    <div className="mt-2 h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-linear-to-r from-emerald-400 via-amber-400 to-rose-500 transition-all duration-500"
                            style={{ width: `${infectionPct}%` }}
                        />
                    </div>
                </div>

                <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/50">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Target Pesticide Dosage
                    </span>
                    <span className="text-2xl font-black text-sky-400 block mt-0.5">
                        {dosageMl} <span className="text-xs font-normal text-slate-300">mL/m²</span>
                    </span>
                    <span className="text-xs text-slate-400 mt-1 block">
                        Flow Rate: {flowRate} L/min
                    </span>
                </div>

                <div className="rounded-xl bg-slate-800/60 p-4 border border-slate-700/50 flex flex-col justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                        Manual Override Control
                    </span>
                    <button
                        onClick={() => setIsManualActive(!isManualActive)}
                        className={`mt-2 w-full rounded-lg py-2 px-3 text-xs font-bold transition-all cursor-pointer ${
                            isManualActive
                                ? "bg-rose-600 hover:bg-rose-700 text-white"
                                : "bg-sky-600 hover:bg-sky-500 text-white"
                        }`}
                    >
                        {isManualActive ? "Stop Manual Spray ⏹" : "Start Manual Spray 💧"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PesticideSprinklingBanner;
