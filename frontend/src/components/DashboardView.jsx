import { useState } from "react";
import CropScan from "./CropScan.js";
import LocationCard from "./LocationCard.js";
import AlertPanel from "./AlertPanel.js";

const statusPillClasses = {
    ok: "bg-white/90 text-slate-700",
    completed: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20",
    failed: "bg-rose-500/15 text-rose-300 border border-rose-400/20",
    fault: "bg-amber-500/15 text-amber-300 border border-amber-400/20",
    unavailable: "bg-slate-500/15 text-slate-400 border border-slate-400/20",
    skipped: "bg-slate-500/15 text-slate-400 border border-slate-400/20",
};

function StatusPill({ label, status }) {
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${statusPillClasses[status] || statusPillClasses.unavailable}`}>
            {label}: {status || "unavailable"}
        </span>
    );
}

function DashboardView({ observations, loading, error, onRefresh, onOpenSimulateModal, apiConnected }) {
    const [activeTab, setActiveTab] = useState("overview");
    const latest = observations[0];

    const hasObservations = observations.length > 0;

    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10" id="dashboard">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                <div>
                    <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-3">
                        LIVE DASHBOARD
                    </div>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                        Your garden,<br />
                        <em className="font-playfair font-normal text-emerald-400">at a glance.</em>
                    </h2>
                </div>
                <p className="text-slate-400 text-sm max-w-md">
                    Small readings become a calmer, clearer picture of plant health.
                </p>
            </div>

            {/* Glassmorphism Dashboard Layout */}
            <div className="glass-card border border-white/15 rounded-3xl p-6 md:p-8 bg-[#0e1a12]/90 shadow-2xl space-y-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-white/10">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                                LIVE TELEMETRY FROM DJANGO BACKEND
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                SENSOR ONLINE
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 mt-1">
                            Your garden is thriving <span className="text-emerald-400">✦</span>
                        </h3>
                    </div>

                    <button
                        onClick={onOpenSimulateModal}
                        className="rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
                    >
                        + Add / Simulate Telemetry
                    </button>
                </div>

                {hasObservations && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="rounded-2xl bg-white/[0.03] p-4 md:p-5">
                            <h4 className="text-sm font-semibold text-slate-400 mb-3">Sensor Status</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(latest.sensor_status || {}).map(([label, status]) => (
                                    <StatusPill key={label} label={label.replace("_", " ")} status={status} />
                                ))}
                            </div>
                        </div>
                        <div className="rounded-2xl bg-white/[0.03] p-4 md:p-5">
                            <h4 className="text-sm font-semibold text-slate-400 mb-3">Processing Status</h4>
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(latest.processing_status || {}).map(([label, status]) => (
                                    <StatusPill key={label} label={label.replace("_", " ")} status={status} />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && !hasObservations && (
                    <div className="rounded-2xl border border-dashed border-emerald-400/35 bg-emerald-500/5 px-6 py-14 text-center">
                        <p className="text-lg font-bold text-white">No telemetry has been submitted yet.</p>
                        <p className="mt-2 text-sm text-slate-400">Add your first sensor reading and optional crop image to populate this dashboard.</p>
                    </div>
                )}

                {hasObservations && <>
                {/* Metric Pills Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Soil Moisture Pill Card */}
                    <div className="glass-card p-5 bg-slate-900/40 border border-white/10 hover:border-emerald-400/50 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(74,222,128,0.22)] hover:-translate-y-1.5 group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block tracking-wider uppercase">💧 &nbsp; SOIL MOISTURE</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        </div>
                        <span className="text-2xl font-black text-white block group-hover:text-emerald-300 transition-colors">
                            {latest?.soil_moisture} <em className="text-xs font-normal text-slate-400">%</em>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Optimal</span>
                    </div>

                    {/* Temperature Pill Card */}
                    <div className="glass-card p-5 bg-slate-900/40 border border-white/10 hover:border-rose-400/50 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(244,63,94,0.22)] hover:-translate-y-1.5 group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-rose-400 font-bold block tracking-wider uppercase">♨ &nbsp; TEMPERATURE</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                        </div>
                        <span className="text-2xl font-black text-white block group-hover:text-rose-300 transition-colors">
                            {latest?.temperature} <em className="text-xs font-normal text-slate-400">°C</em>
                        </span>
                        <span className="text-[10px] text-amber-400 font-semibold block mt-1">Elevated</span>
                    </div>

                    {/* Humidity Pill Card */}
                    <div className="glass-card p-5 bg-slate-900/40 border border-white/10 hover:border-sky-400/50 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(56,189,248,0.22)] hover:-translate-y-1.5 group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-sky-400 font-bold block tracking-wider uppercase">◒ &nbsp; HUMIDITY</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                        </div>
                        <span className="text-2xl font-black text-white block group-hover:text-sky-300 transition-colors">
                            {latest?.humidity} <em className="text-xs font-normal text-slate-400">%</em>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Comfortable</span>
                    </div>
                </div>

                        {/* Crop Scan Diagnostics & Leaflet GPS Map */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CropScan observation={latest} />
                            <LocationCard observation={latest} />
                        </div>

                        {/* Alerts Panel */}
                        <AlertPanel observation={latest} />

                </>
                }
            </div>
        </section>
    );
}

export default DashboardView;
