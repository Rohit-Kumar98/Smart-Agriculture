function SensorCard({ title, value, unit, icon }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                    {title}
                </p>

                <span className="text-xl">
                    {icon}
                </span>
            </div>

            <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-gray-900">
                    {value}
                </span>

                <span className="text-sm text-gray-500">
                    {unit}
                </span>
            </div>
        </div>
    );
}

export default SensorCard;