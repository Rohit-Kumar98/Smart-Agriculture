function SensorCard({ title, value, unit, icon, status, statusType = "normal" }) {
    const statusStyles = {
        optimal: "bg-emerald-50 text-emerald-700 border-emerald-200",
        warning: "bg-amber-50 text-amber-700 border-amber-200",
        danger: "bg-rose-50 text-rose-700 border-rose-200",
        normal: "bg-gray-50 text-gray-600 border-gray-200",
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-xs hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {title}
                </p>

                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50 text-lg">
                    {icon}
                </span>
            </div>

            <div className="mt-3 flex items-baseline gap-1.5">
                <span className="text-3xl font-bold text-gray-900 tracking-tight">
                    {value !== undefined && value !== null ? value : "—"}
                </span>

                <span className="text-sm font-medium text-gray-500">
                    {unit}
                </span>
            </div>

            {status && (
                <div className="mt-3">
                    <span
                        className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                            statusStyles[statusType] || statusStyles.normal
                        }`}
                    >
                        {status}
                    </span>
                </div>
            )}
        </div>
    );
}

export default SensorCard;
