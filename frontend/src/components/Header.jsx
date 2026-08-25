function Header({ theme, onToggleTheme, onOpenSimulateModal, onRefresh, isRefreshing, apiConnected }) {
    return (
        <header className="sticky top-0 z-40 flex items-center justify-between border-b border-gray-200 bg-white/95 px-6 py-4 backdrop-blur-md">
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 font-bold text-white shadow-md shadow-emerald-600/20">
                    🌿
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-tight text-gray-900">
                        Smart Agriculture System
                    </h1>
                    <p className="text-xs text-gray-500">
                        Rover Monitoring & Disease Telemetry Dashboard
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                    <span
                        className={`h-2.5 w-2.5 rounded-full ${
                            apiConnected ? "bg-emerald-500 animate-pulse" : "bg-rose-500"
                        }`}
                    />
                    <span>{apiConnected ? "Connected" : "Offline"}</span>
                </div>

                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-xs hover:bg-gray-50 disabled:opacity-50 transition-colors cursor-pointer"
                    title="Refresh telemetry"
                >
                    <span className={isRefreshing ? "animate-spin" : ""}>🔄</span>
                    <span>{isRefreshing ? "Refreshing..." : "Refresh"}</span>
                </button>

                <button
                    onClick={onOpenSimulateModal}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                    <span>+</span>
                    <span>Simulate Telemetry</span>
                </button>
            </div>
        </header>
    );
}

export default Header;
