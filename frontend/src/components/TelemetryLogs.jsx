function TelemetryLogs({ observations, loading, error }) {
    return (
        <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
            <div className="mb-12">
                <div className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase mb-4">
                    TELEMETRY RECORDS
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                    Observation<br />
                    <em className="font-playfair font-normal text-emerald-400">history.</em>
                </h2>
                <p className="mt-4 text-slate-400 text-sm max-w-md">
                    Review every reading submitted by the rover.
                </p>
            </div>

            <div className="glass-card bg-slate-900/60 border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-white">Telemetry History Log</h3>
                    <span className="text-xs font-mono text-emerald-400">{observations.length} Logs</span>
                </div>

                {loading && <p className="p-8 text-sm text-slate-400">Loading telemetry logs...</p>}
                {error && <p className="p-8 text-sm text-rose-300">{error}</p>}
                {!loading && !error && observations.length === 0 && (
                    <p className="p-8 text-sm text-slate-400">No telemetry logs have been submitted yet.</p>
                )}
                {!loading && !error && observations.length > 0 && (
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
                                {observations.map((observation) => (
                                    <tr key={observation.id} className="hover:bg-white/5 transition-colors">
                                        <td className="p-3 font-mono">{new Date(observation.created_at).toLocaleTimeString()}</td>
                                        <td className="p-3 font-bold text-white">{observation.temperature}°C</td>
                                        <td className="p-3">{observation.humidity}%</td>
                                        <td className="p-3">{observation.soil_moisture}%</td>
                                        <td className="p-3 font-semibold text-emerald-400">{observation.disease || "Healthy"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
}

export default TelemetryLogs;
