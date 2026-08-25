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
        disease: "Early Leaf Blight",
        confidence: "89.5",
        severity: "Moderate",
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
                disease: formData.disease.trim(),
                confidence: formData.confidence ? parseFloat(formData.confidence) : null,
                severity: formData.severity.trim(),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl transition-all border border-gray-200">
                <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/50 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 font-bold">
                            📡
                        </span>
                        <div>
                            <h3 className="font-bold text-gray-900">
                                Simulate Rover Telemetry Payload
                            </h3>
                            <p className="text-xs text-gray-500">
                                Transmit simulated sensor metrics directly to Django REST API
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600 transition-colors"
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
                    {error && (
                        <div className="rounded-lg bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Temperature (°C)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="temperature"
                                value={formData.temperature}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Humidity (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="humidity"
                                value={formData.humidity}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Soil Moisture (%)
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="soil_moisture"
                                value={formData.soil_moisture}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Soil pH
                            </label>
                            <input
                                type="number"
                                step="0.1"
                                name="ph"
                                value={formData.ph}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Latitude
                            </label>
                            <input
                                type="number"
                                step="0.0001"
                                name="latitude"
                                value={formData.latitude}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Longitude
                            </label>
                            <input
                                type="number"
                                step="0.0001"
                                name="longitude"
                                value={formData.longitude}
                                onChange={handleChange}
                                required
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3 space-y-3">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            AI Diagnostic Crop Payload
                        </p>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Disease Name / Status
                            </label>
                            <input
                                type="text"
                                name="disease"
                                value={formData.disease}
                                onChange={handleChange}
                                placeholder="e.g. Healthy Crop, Leaf Spot, Powder Mildew"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Confidence (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    name="confidence"
                                    value={formData.confidence}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Severity
                                </label>
                                <select
                                    name="severity"
                                    value={formData.severity}
                                    onChange={handleChange}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                >
                                    <option value="None">None</option>
                                    <option value="Low">Low</option>
                                    <option value="Moderate">Moderate</option>
                                    <option value="High">High</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 transition-colors shadow-xs"
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
