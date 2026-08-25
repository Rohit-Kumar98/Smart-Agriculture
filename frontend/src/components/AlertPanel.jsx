function AlertPanel({ observation }) {
    const alerts = [];

    // Temporary generic thresholds.
    // We will replace these once the crop requirements are confirmed.

    if (observation.soil_moisture < 20) {
        alerts.push({
            type: "warning",
            title: "Low Soil Moisture",
            message: `Soil moisture is ${observation.soil_moisture}%.`,
        });
    }

    if (observation.temperature > 40) {
        alerts.push({
            type: "warning",
            title: "High Temperature",
            message: `Temperature is ${observation.temperature}°C.`,
        });
    }

    if (observation.humidity > 90) {
        alerts.push({
            type: "warning",
            title: "High Humidity",
            message: `Humidity is ${observation.humidity}%.`,
        });
    }

    if (observation.disease) {
        alerts.push({
            type: "danger",
            title: "Disease Detected",
            message: `${observation.disease}${
                observation.confidence !== null
                    ? ` (${observation.confidence}% confidence)`
                    : ""
            }.`,
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
                            const isDanger =
                                alert.type === "danger";

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