import { useState } from "react";
import CropScan from "./CropScan.js";
import LocationCard from "./LocationCard.js";
import AlertPanel from "./AlertPanel.js";
import PesticideSprinklingBanner from "./PesticideSprinklingBanner.js";
import MovingSoilChart from "./MovingSoilChart.js";

function DashboardView({ observations, loading, error, onRefresh, onOpenSimulateModal, apiConnected }) {
    const [activeTab, setActiveTab] = useState("overview");
    const latest = observations[0];

    const disease = latest?.disease || "Healthy Crop";
    const isHealthy = !disease || disease.toLowerCase().includes("healthy") || disease.toLowerCase().includes("none");
    const healthScore = isHealthy ? 92 : 88;

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

                {/* Top Dual Cards: Moving Live Soil Moisture Wave Chart + Circular Health Score Ring */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Moving Live SVG Soil Moisture Curve */}
                    <div className="lg:col-span-8 glass-card p-6 bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(74,222,128,0.18)] hover:-translate-y-1 relative overflow-hidden group">
                        <MovingSoilChart observations={observations} currentMoisture={latest?.soil_moisture ?? 18} />
                    </div>

                    {/* Circular Health Score Ring Gauge */}
                    <div className="lg:col-span-4 glass-card p-6 bg-slate-900/60 border border-white/10 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-[0_12px_35px_rgba(74,222,128,0.18)] hover:-translate-y-1 flex items-center justify-around group">
                        <div className="relative flex items-center justify-center h-28 w-28">
                            <svg className="h-full w-full transform -rotate-90 group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.1)" strokeWidth="8" fill="none" />
                                <circle
                                    cx="50" cy="50" r="42"
                                    stroke="#4ade80"
                                    strokeWidth="8"
                                    strokeDasharray="263"
                                    strokeDashoffset={263 - (263 * healthScore) / 100}
                                    strokeLinecap="round"
                                    fill="none"
                                />
                            </svg>
                            <div className="absolute text-center">
                                <span className="text-2xl font-black text-white block group-hover:scale-110 group-hover:text-emerald-300 transition-all duration-300">{healthScore}</span>
                                <span className="text-[9px] font-mono uppercase text-slate-400 block font-semibold">HEALTH</span>
                            </div>
                        </div>

                        <div>
                            <span className="text-xs text-slate-400 block font-medium">Plant health</span>
                            <strong className={`text-sm font-bold block ${isHealthy ? 'text-emerald-400' : 'text-amber-400'} group-hover:text-emerald-300 transition-colors`}>
                                {disease}
                            </strong>
                        </div>
                    </div>
                </div>

                {/* Metric Pills Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Soil Moisture Pill Card */}
                    <div className="glass-card p-5 bg-slate-900/40 border border-white/10 hover:border-emerald-400/50 hover:bg-slate-900/70 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(74,222,128,0.22)] hover:-translate-y-1.5 group cursor-pointer">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono text-emerald-400 font-bold block tracking-wider uppercase">💧 &nbsp; SOIL MOISTURE</span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_8px_rgba(74,222,128,0.8)]" />
                        </div>
                        <span className="text-2xl font-black text-white block group-hover:text-emerald-300 transition-colors">
                            {latest?.soil_moisture ?? 18} <em className="text-xs font-normal text-slate-400">%</em>
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
                            {latest?.temperature ?? 31.0} <em className="text-xs font-normal text-slate-400">°C</em>
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
                            {latest?.humidity ?? 45.0} <em className="text-xs font-normal text-slate-400">%</em>
                        </span>
                        <span className="text-[10px] text-emerald-400 font-semibold block mt-1">Comfortable</span>
                    </div>
                </div>

                        {/* Intelligent Pesticide Sprinkling System Controller Banner */}
                        <PesticideSprinklingBanner observation={latest} />

                        {/* Crop Scan Diagnostics & Leaflet GPS Map */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <CropScan observation={latest} />
                            <LocationCard observation={latest} />
                        </div>

                        {/* Alerts Panel */}
                        <AlertPanel observation={latest} />

                        {/* History Log Table */}
                        <div className="glass-card bg-slate-900/60 border border-white/10 overflow-hidden">
                            <div className="p-4 border-b border-white/10 flex justify-between items-center">
                                <h4 className="text-sm font-bold text-white">Telemetry History Log</h4>
                                <span className="text-xs font-mono text-emerald-400">{observations.length} Logs</span>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs text-slate-300">
                                    <thead className="bg-black/30 text-[10px] uppercase font-mono text-slate-400">
                                        <tr>
                                            <th className="p-3">Timestamp</th>
                                            <th className="p-3">Temp</th>
                                            <th className="p-3">Humidity</th>
                                            <th className="p-3">Moisture</th>
                                            <th className="p-3">AI Disease</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {observations.map(obs => (
                                            <tr key={obs.id} className="hover:bg-white/5 transition-colors">
                                                <td className="p-3 font-mono">{new Date(obs.created_at).toLocaleTimeString()}</td>
                                                <td className="p-3 font-bold text-white">{obs.temperature}°C</td>
                                                <td className="p-3">{obs.humidity}%</td>
                                                <td className="p-3">{obs.soil_moisture}%</td>
                                                <td className="p-3 font-semibold text-emerald-400">{obs.disease || "Healthy"}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default DashboardView;
