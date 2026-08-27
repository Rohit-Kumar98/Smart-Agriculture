function CropScan({ observation }) {
    const hasImage = Boolean(observation?.image_url);
    const disease = observation?.disease;
    const isHealthy = !disease || disease === "Healthy Crop" || disease === "Healthy" || disease === "None";

    const rawConf = observation?.confidence;
    const confDisplay = rawConf !== null && rawConf !== undefined
        ? (rawConf > 1 ? `${Math.round(rawConf)}%` : `${Math.round(rawConf * 100)}%`)
        : "—";

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        Latest Crop Scan Analysis
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        Camera feed & AI disease detection from rover payload.
                    </p>
                </div>

                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    isHealthy ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                }`}>
                    {isHealthy ? "Healthy Leaf" : "Pathogen Warning"}
                </span>
            </div>

            <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-gray-200">
                {hasImage ? (
                    <img
                        src={observation.image_url}
                        alt="Latest crop scan"
                        className="h-72 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-72 flex-col items-center justify-center bg-gradient-to-br from-emerald-950/20 via-slate-900 to-emerald-900/40 p-6 text-center text-slate-300">
                        <span className="text-5xl mb-3">🍃</span>
                        <p className="font-medium text-slate-200">
                            Telemetry Active — No Image Payload attached
                        </p>
                        <p className="mt-1 text-xs text-slate-400 max-w-xs">
                            Sensors logged environmental metrics. Attach a Base64 leaf image during simulation to preview AI visual detection.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
                <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">
                        AI Diagnosis
                    </p>

                    <p className="mt-1 font-semibold text-gray-900 truncate" title={observation?.disease}>
                        {observation?.disease || "—"}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">
                        Confidence
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {confDisplay}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-gray-500">
                        Severity Level
                    </p>

                    <p className="mt-1 font-semibold text-gray-900">
                        {observation?.severity || "—"}
                    </p>
                </div>
            </div>

            {observation?.advisory && (observation.advisory.cause || observation.advisory.recommendation || observation.advisory.prevention) && (
                <div className="mt-4 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
                    <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">Crop Advisory</p>
                    <p className="mt-2"><strong>Cause:</strong> {observation.advisory.cause}</p>
                    <p className="mt-1"><strong>Recommendation:</strong> {observation.advisory.recommendation}</p>
                    <p className="mt-1"><strong>Prevention:</strong> {observation.advisory.prevention}</p>
                </div>
            )}

        </div>
    );
}

export default CropScan;
