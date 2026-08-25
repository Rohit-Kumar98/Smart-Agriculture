import { useState } from "react";
import CropScan from "./CropScan.js";
import LocationCard from "./LocationCard.js";
import AlertPanel from "./AlertPanel.js";
import PesticideSprinklingBanner from "./PesticideSprinklingBanner.js";

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
                        04 — LIVE DASHBOARD
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

                        {/* Top Dual Cards: Soil Moisture Live Chart + Circular Health Score Ring matching Screenshot 2 */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            
                            {/* Live SVG Soil Moisture Curve */}
                            <div className="lg:col-span-8 glass-card p-6 bg-slate-900/60 border border-white/10 relative overflow-hidden">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">SOIL MOISTURE</span>
                                        <span className="text-3xl font-black text-white">{latest?.soil_moisture ?? 18}<sup>%</sup></span>
                                    </div>
                                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                                        ↑ LIVE
                                    </span>
                                </div>

                                <div className="h-32 w-full">
                                    <svg viewBox="0 0 600 120" preserveAspectRatio="none" className="h-full w-full">
                                        <defs>
                                            <linearGradient id="chartFillGrad" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                                                <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0,90 C80,70 120,95 200,60 C280,30 340,75 420,50 C500,25 540,40 600,15 L600,120 L0,120 Z"
                                            fill="url(#chartFillGrad)"
                                        />
                                        <path
                                            d="M0,90 C80,70 120,95 200,60 C280,30 340,75 420,50 C500,25 540,40 600,15"
                                            fill="none"
                                            stroke="#4ade80"
                                            strokeWidth="3"
                                        />
                                    </svg>
                                </div>

                                <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-2">
                                    <span>8 AM</span>
                                    <span>11 AM</span>
                                    <span>2 PM</span>
                                    <span>5 PM</span>
                                    <span>NOW</span>
                                </div>
                            </div>

                            {/* Circular Health Score Ring Gauge matching Screenshot 2 */}
                            <div className="lg:col-span-4 glass-card p-6 bg-slate-900/60 border border-white/10 flex items-center justify-around">
                                <div className="relative flex items-center justify-center h-28 w-28">
                                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 100 100">
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
                                        <span className="text-2xl font-black text-white block">{healthScore}</span>
                                        <span className="text-[9px] font-mono uppercase text-slate-400 block">HEALTH</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs text-slate-400 block">Plant health</span>
                                    <strong className={`text-sm font-bold block ${isHealthy ? 'text-emerald-400' : 'text-amber-400'}`}>
                                        {disease}
                                    </strong>
                                </div>
                            </div>
                        </div>

                        {/* Metric Pills Row matching Screenshot 2 */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="glass-card p-4 bg-slate-900/40 border border-white/10">
                                <span className="text-[10px] font-mono text-amber-400 block mb-1">☀ &nbsp; LIGHT LEVEL</span>
                                <span className="text-xl font-extrabold text-white block">8.4k <em className="text-xs font-normal text-slate-400">lux</em></span>
                                <span className="text-[10px] text-emerald-400 block mt-1">Optimal</span>
                            </div>

                            <div className="glass-card p-4 bg-slate-900/40 border border-white/10">
                                <span className="text-[10px] font-mono text-rose-400 block mb-1">♨ &nbsp; TEMPERATURE</span>
                                <span className="text-xl font-extrabold text-white block">{latest?.temperature ?? 31.0} <em className="text-xs font-normal text-slate-400">°C</em></span>
                                <span className="text-[10px] text-amber-400 block mt-1">Elevated</span>
                            </div>

                            <div className="glass-card p-4 bg-slate-900/40 border border-white/10">
                                <span className="text-[10px] font-mono text-sky-400 block mb-1">◒ &nbsp; HUMIDITY</span>
                                <span className="text-xl font-extrabold text-white block">{latest?.humidity ?? 45.0} <em className="text-xs font-normal text-slate-400">%</em></span>
                                <span className="text-[10px] text-emerald-400 block mt-1">Comfortable</span>
                            </div>

                            <div className="glass-card p-4 bg-slate-900/40 border border-white/10">
                                <span className="text-[10px] font-mono text-emerald-400 block mb-1">🧪 &nbsp; SOIL pH</span>
                                <span className="text-xl font-extrabold text-white block">{latest?.ph ?? 5.8} <em className="text-xs font-normal text-slate-400">pH</em></span>
                                <span className="text-[10px] text-emerald-400 block mt-1">Balanced</span>
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
                                            <th className="p-3">pH</th>
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
                                                <td className="p-3">{obs.ph}</td>
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
