import { useState } from "react";
import { createRoverObservation } from "../services/api.js";

function SimulateDataModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        temperature: "27.5",
        humidity: "58.0",
        soil_moisture: "22.0",
        ph: "6.5",
        latitude: "28.6142",
        longitude: "77.2093",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const payload = {
                temperature: parseFloat(formData.temperature),
                humidity: parseFloat(formData.humidity),
                soil_moisture: parseFloat(formData.soil_moisture),
                ph: parseFloat(formData.ph),
                latitude: parseFloat(formData.latitude),
                longitude: parseFloat(formData.longitude),
                disease: "Healthy Crop",
                confidence: 95.0,
                severity: "None",
            };

            await createRoverObservation(payload);
            onSuccess();
            onClose();
        } catch (err) {
            setError(err.message || "Failed to transmit rover telemetry.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-[#0e1a12] border border-emerald-500/30 text-white shadow-2xl transition-all">
                {/* Modal Header */}
                <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 text-lg shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                            📡
                        </span>
                        <div>
                            <h3 className="font-extrabold text-white text-base tracking-tight">
                                Transmit Telemetry Payload
                            </h3>
                            <p className="text-xs text-slate-400 font-mono">
                                Send live sensor telemetry directly to Django backend
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                        ✕
                    </button>
                </div>

                {/* Form Fields with High Contrast Styling */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    {error && (
                        <div className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-3 text-xs text-rose-300 font-mono">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                                Temperature (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                                Humidity (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="humidity"
                                value={formData.humidity}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                            Soil Moisture (%)
                        </label>
                        <input
                            type="number"
                            step="0.1"
                            name="soil_moisture"
                            value={formData.soil_moisture}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="0.0001"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="0.0001"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                className="w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/25 active:scale-95 cursor-pointer"
                        >
                            {loading ? "Transmitting..." : "Send Telemetry"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SimulateDataModal;
