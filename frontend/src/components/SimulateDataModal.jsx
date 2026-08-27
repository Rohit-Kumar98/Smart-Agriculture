import { useState } from "react";
import { createRoverObservation } from "../services/api.js";

const emptyTelemetry = {
    temperature: "", humidity: "", soil_moisture: "", latitude: "", longitude: "", image: "",
};

function SimulateDataModal({ isOpen, onClose, onSuccess }) {
    const [formData, setFormData] = useState(emptyTelemetry);
    const [imageName, setImageName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!isOpen) return null;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));
    };

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        setError(null);
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Choose a JPEG, PNG, or WebP image."); event.target.value = ""; return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError("Image must be 5 MB or smaller."); event.target.value = ""; return;
        }
        const reader = new FileReader();
        reader.onload = () => { setFormData((previous) => ({ ...previous, image: String(reader.result) })); setImageName(file.name); };
        reader.onerror = () => setError("The selected image could not be read.");
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); setLoading(true); setError(null);
        try {
            await createRoverObservation({
                temperature: Number(formData.temperature), humidity: Number(formData.humidity),
                soil_moisture: Number(formData.soil_moisture),
                latitude: Number(formData.latitude), longitude: Number(formData.longitude),
                image: formData.image || undefined,
            });
            setFormData(emptyTelemetry); setImageName(""); onSuccess(); onClose();
        } catch (submissionError) { setError(submissionError.message || "Failed to save telemetry."); }
        finally { setLoading(false); }
    };

    const inputClass = "w-full rounded-xl bg-slate-950/90 border border-white/20 px-3.5 py-2.5 text-sm font-bold text-white placeholder-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-all";
    const labelClass = "block text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1.5";

    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-500/30 bg-[#0e1a12] text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 bg-slate-900/90 px-6 py-4">
                <div><h3 className="font-extrabold text-white text-base tracking-tight">Add live telemetry</h3><p className="text-xs text-slate-400 font-mono">Only values entered below will be saved to the dashboard.</p></div>
                <button type="button" onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">x</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                {error && <div className="rounded-lg bg-rose-500/20 border border-rose-500/40 p-3 text-xs text-rose-300 font-mono">{error}</div>}
                <div className="grid grid-cols-2 gap-4">
                    <label><span className={labelClass}>Temperature (C)</span><input className={inputClass} type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} required /></label>
                    <label><span className={labelClass}>Humidity (%)</span><input className={inputClass} type="number" step="0.1" name="humidity" value={formData.humidity} onChange={handleChange} required /></label>
                </div>
                <label><span className={labelClass}>Soil moisture (%)</span><input className={inputClass} type="number" step="0.1" name="soil_moisture" value={formData.soil_moisture} onChange={handleChange} required /></label>
                <div className="grid grid-cols-2 gap-4">
                    <label><span className={labelClass}>Latitude</span><input className={inputClass} type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required /></label>
                    <label><span className={labelClass}>Longitude</span><input className={inputClass} type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required /></label>
                </div>
                <div className="border-t border-white/10 pt-4">
                    <label className="block cursor-pointer rounded-xl border border-dashed border-emerald-400/45 bg-emerald-500/5 p-4 text-center hover:bg-emerald-500/10"><span className="block text-sm font-bold text-emerald-300">Upload a crop image</span><span className="mt-1 block text-xs text-slate-400">JPEG, PNG, or WebP - up to 5 MB</span><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} /></label>
                    {imageName && <p className="mt-2 text-xs text-emerald-300">Attached: {imageName}</p>}
                </div>
                <div className="flex items-center justify-end gap-3 pt-2 border-t border-white/10"><button type="button" onClick={onClose} className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10">Cancel</button><button type="submit" disabled={loading} className="rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50">{loading ? "Saving..." : "Save telemetry"}</button></div>
            </form>
        </div>
    </div>;
}

export default SimulateDataModal;