function AlertPanel({ observation }) {
    const alerts = [];

    if (!observation) return null;

    if (observation.soil_moisture !== undefined && observation.soil_moisture < 25) {
        alerts.push({
            type: "warning",
            title: "Low Soil Moisture Warning",
            message: `Soil moisture is at ${observation.soil_moisture}%. Irrigation recommended.`,
        });
    }

    if (observation.temperature !== undefined && observation.temperature > 35) {
        alerts.push({
            type: "warning",
            title: "High Heat Alert",
            message: `Ambient temperature reached ${observation.temperature}°C.`,
        });
    }

    if (observation.humidity !== undefined && observation.humidity > 85) {
        alerts.push({
            type: "warning",
            title: "High Atmospheric Humidity",
            message: `Humidity is ${observation.humidity}%, increasing fungal disease risk.`,
        });
    }

    if (observation.disease && observation.disease !== "Healthy Crop" && observation.disease !== "Healthy" && observation.disease !== "None") {
        const rawConf = observation.confidence;
        const confText = rawConf !== null && rawConf !== undefined
            ? (rawConf > 1 ? `${Math.round(rawConf)}% confidence` : `${Math.round(rawConf * 100)}% confidence`)
            : "high certainty";

        alerts.push({
            type: "danger",
            title: `Pathogen Detected: ${observation.disease}`,
            message: `AI Diagnostic match with ${confText}. Severity level: ${observation.severity || "Unspecified"}.`,
        });
    }

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Alerts
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Important conditions detected by the system.
                        </p>
                    </div>

                    {alerts.length > 0 && (
                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                            {alerts.length} active
                        </span>
                    )}
                </div>
            </div>

            <div className="p-6">
                {alerts.length === 0 ? (
                    <div className="flex items-center gap-3 rounded-lg bg-green-50 p-4">
                        <span className="text-xl">✓</span>

                        <div>
                            <p className="font-medium text-green-800">
                                No active alerts
                            </p>

                            <p className="text-sm text-green-700">
                                Current rover readings look normal.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {alerts.map((alert, index) => {
                            const isDanger = alert.type === "danger";

                            return (
                                <div
                                    key={index}
                                    className={
                                        isDanger
                                            ? "rounded-lg border border-red-200 bg-red-50 p-4"
                                            : "rounded-lg border border-yellow-200 bg-yellow-50 p-4"
                                    }
                                >
                                    <div className="flex gap-3">
                                        <span className="text-xl">
                                            {isDanger ? "🔴" : "🟡"}
                                        </span>

                                        <div>
                                            <p
                                                className={
                                                    isDanger
                                                        ? "font-medium text-red-800"
                                                        : "font-medium text-yellow-800"
                                                }
                                            >
                                                {alert.title}
                                            </p>

                                            <p
                                                className={
                                                    isDanger
                                                        ? "mt-1 text-sm text-red-700"
                                                        : "mt-1 text-sm text-yellow-700"
                                                }
                                            >
                                                {alert.message}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default AlertPanel;
