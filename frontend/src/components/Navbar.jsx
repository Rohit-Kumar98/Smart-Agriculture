function Navbar({ activePage, onNavigate, theme, onToggleTheme, apiConnected, onOpenSimulateModal }) {
    const isDark = theme === "dark";

    const navPages = [
        { id: "home", name: "Home" },
        { id: "care", name: "About & Features" },
        { id: "dashboard", name: "Dashboard" },
        { id: "purpose", name: "Purpose" },
        { id: "contact", name: "Contact" },
        { id: "all", name: "Full View" }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex h-18 items-center justify-between px-4 lg:px-10 bg-[#0b130e]/85 dark-nav backdrop-blur-xl border-b border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
            {/* Brand Logo */}
            <button
                onClick={() => onNavigate("home")}
                className="group flex items-center gap-2.5 font-extrabold text-lg tracking-tight cursor-pointer bg-transparent border-0 text-white"
            >
                <svg width="26" height="26" viewBox="0 0 256 256" fill="none" className="text-emerald-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
                    <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="currentColor" />
                </svg>
                <span>flora<span className="font-light text-emerald-400 group-hover:text-emerald-300 transition-colors">Watch</span></span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md group-hover:bg-emerald-500/20 transition-all">
                    Rover
                </span>
            </button>

            {/* Taskbar Pages Navigation Buttons */}
            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 hover:border-emerald-500/30 rounded-full px-2 py-1 text-xs font-medium backdrop-blur-md transition-all duration-300 shadow-inner">
                {navPages.map((page) => {
                    const isActive = activePage === page.id;
                    return (
                        <button
                            key={page.id}
                            onClick={() => onNavigate && onNavigate(page.id)}
                            className={`px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer font-semibold whitespace-nowrap ${
                                isActive
                                    ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(74,222,128,0.4)] font-bold scale-105"
                                    : "text-slate-300 hover:text-emerald-300 hover:bg-emerald-500/15 hover:scale-105 active:scale-95"
                            }`}
                        >
                            {page.name}
                        </button>
                    );
                })}
            </div>

            {/* Actions & Controls */}
            <div className="flex items-center gap-2.5">
                {/* Day / Night Theme Toggle */}
                <button
                    onClick={onToggleTheme}
                    type="button"
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold hover:bg-amber-500/15 hover:border-amber-400/40 hover:text-amber-300 transition-all duration-200 hover:scale-105 cursor-pointer"
                    title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
                >
                    <span className="text-amber-400 font-bold">{isDark ? "☀" : "☾"}</span>
                    <span className="font-mono">{isDark ? "Day" : "Night"}</span>
                </button>

                {/* API Status Indicator */}
                <div className="hidden sm:flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                    <span className={`h-2 w-2 rounded-full ${apiConnected ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.8)]' : 'bg-rose-500'}`} />
                    <span>{apiConnected ? 'API Connected' : 'Offline'}</span>
                </div>

                {/* Live Telemetry Modal Button */}
                <button
                    onClick={onOpenSimulateModal}
                    className="rounded-full bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.5)] hover:scale-105 transition-all duration-200 active:scale-95 cursor-pointer whitespace-nowrap"
                >
                    Live Telemetry
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
