function Navbar({ theme, onToggleTheme, apiConnected, onOpenSimulateModal }) {
    const isDark = theme === "dark";

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex h-18 items-center justify-between px-6 md:px-12 bg-[#0b130e]/80 dark-nav backdrop-blur-xl border-b border-white/10 transition-colors">
            <a href="#hero" className="flex items-center gap-2.5 font-extrabold text-lg tracking-tight">
                <svg width="26" height="26" viewBox="0 0 256 256" fill="none" className="text-emerald-400">
                    <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" fill="currentColor" />
                </svg>
                <span>flora<span className="font-light text-emerald-400">Watch</span></span>
                <span className="text-[10px] font-mono uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                    Rover
                </span>
            </a>

            <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs font-medium">
                <a href="#hero" className="px-3 py-1.5 rounded-full hover:opacity-100 transition-opacity">Home</a>
                <a href="#about" className="px-3 py-1.5 rounded-full hover:opacity-100 transition-opacity">About</a>
                <a href="#features" className="px-3 py-1.5 rounded-full hover:opacity-100 transition-opacity">Features</a>
                <a href="#flow" className="px-3 py-1.5 rounded-full hover:opacity-100 transition-opacity">Flow</a>
                <a href="#dashboard" className="px-3 py-1.5 rounded-full bg-white/10 font-semibold shadow-xs">Dashboard</a>
                <a href="#contact" className="px-3 py-1.5 rounded-full hover:opacity-100 transition-opacity">Contact</a>
            </div>

            <div className="flex items-center gap-3">
                {/* Clean Simple Day / Night Toggle Button */}
                <button
                    onClick={onToggleTheme}
                    type="button"
                    className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold hover:bg-white/10 transition-colors cursor-pointer"
                    title={isDark ? "Switch to Day Mode" : "Switch to Night Mode"}
                >
                    <span className="text-amber-400 font-bold">{isDark ? "☀" : "☾"}</span>
                    <span className="font-mono">{isDark ? "Day" : "Night"}</span>
                </button>

                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                    <span className={`h-2 w-2 rounded-full ${apiConnected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'}`} />
                    <span className="hidden sm:inline">{apiConnected ? 'API Connected' : 'Offline'}</span>
                </div>

                <button
                    onClick={onOpenSimulateModal}
                    className="rounded-full bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition-transform active:scale-95 cursor-pointer shadow-lg shadow-emerald-500/20"
                >
                    Live Telemetry
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
