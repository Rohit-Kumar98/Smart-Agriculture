import { useEffect, useState } from "react";

function MovingSoilChart({ observations = [], currentMoisture = 18 }) {
    // Continuous animation phase for real-time wave motion
    const [phase, setPhase] = useState(0);
    const [hoverPoint, setHoverPoint] = useState(null);

    // Smooth 60fps animation loop
    useEffect(() => {
        let animationFrameId;
        const animate = () => {
            setPhase((prev) => (prev + 0.03) % (Math.PI * 2));
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    // Derive moisture sequence from live observations or default fallback
    const rawValues = observations.length >= 4
        ? observations.slice(0, 8).map(o => Number(o.soil_moisture) || 18).reverse()
        : [14, 17, 21, 19, 23, 20, 24, currentMoisture];

    const width = 600;
    const height = 120;
    const paddingX = 15;
    const paddingY = 15;

    // Calculate (x, y) points with organic dynamic sine wave displacement
    const points = rawValues.map((val, idx) => {
        const x = (idx / (rawValues.length - 1)) * (width - 2 * paddingX) + paddingX;
        // Dynamic sine wave offset moving left to right
        const waveOffset = Math.sin(phase + idx * 0.75) * 4;
        const normalizedVal = Math.min(Math.max(val, 0), 100);
        const y = height - paddingY - (normalizedVal / 100) * (height - 2 * paddingY) + waveOffset;
        return { x, y, val };
    });

    // Generate smooth bezier spline path
    const createBezierPath = (pts) => {
        if (pts.length < 2) return "";
        let path = `M ${pts[0].x},${pts[0].y}`;
        for (let i = 0; i < pts.length - 1; i++) {
            const p0 = pts[i];
            const p1 = pts[i + 1];
            const cp1x = p0.x + (p1.x - p0.x) / 2;
            const cp1y = p0.y;
            const cp2x = p0.x + (p1.x - p0.x) / 2;
            const cp2y = p1.y;
            path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p1.x},${p1.y}`;
        }
        return path;
    };

    const linePath = createBezierPath(points);
    const lastPoint = points[points.length - 1] || { x: width - paddingX, y: height / 2, val: currentMoisture };
    const areaPath = `${linePath} L ${lastPoint.x},${height} L ${points[0].x},${height} Z`;

    const timeLabels = ["8 AM", "10 AM", "12 PM", "2 PM", "4 PM", "6 PM", "8 PM", "NOW"];

    return (
        <div className="relative w-full">
            {/* Header Row */}
            <div className="flex justify-between items-center mb-3">
                <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">SOIL MOISTURE</span>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-black text-white">
                            {hoverPoint ? hoverPoint.val : currentMoisture}<sup>%</sup>
                        </span>
                        {hoverPoint && (
                            <span className="text-xs font-mono text-emerald-400 animate-fade-in">
                                ({hoverPoint.label})
                            </span>
                        )}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5 shadow-[0_0_12px_rgba(74,222,128,0.25)]">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                        LIVE STREAMING
                    </span>
                </div>
            </div>

            {/* SVG Dynamic Wave Graph */}
            <div className="h-32 w-full relative">
                {/* Horizontal Guide Lines */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                    <div className="border-b border-emerald-400/40 w-full" />
                    <div className="border-b border-emerald-400/40 w-full" />
                    <div className="border-b border-emerald-400/40 w-full" />
                </div>

                <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
                    <defs>
                        <linearGradient id="chartFillGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#4ade80" stopOpacity="0.0" />
                        </linearGradient>
                        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#4ade80" />
                            <stop offset="100%" stopColor="#34d399" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Gradient Background Wave Fill */}
                    <path d={areaPath} fill="url(#chartFillGrad)" className="transition-all duration-75" />

                    {/* Animated Wave Spline Line */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="url(#lineGrad)"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        className="transition-all duration-75"
                    />

                    {/* Live Pulse Marker Beacon at Tip */}
                    <g transform={`translate(${lastPoint.x}, ${lastPoint.y})`}>
                        <circle r="10" fill="#4ade80" opacity="0.35" className="animate-ping" />
                        <circle r="6" fill="#4ade80" className="shadow-lg" />
                        <circle r="2.5" fill="#ffffff" />
                    </g>

                    {/* Interactive Hover Point Markers */}
                    {points.map((pt, i) => (
                        <g
                            key={i}
                            className="cursor-pointer group"
                            onMouseEnter={() => setHoverPoint({ val: pt.val, label: timeLabels[i] || "LOG" })}
                            onMouseLeave={() => setHoverPoint(null)}
                        >
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="12"
                                fill="transparent"
                            />
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r="4"
                                className="fill-emerald-300 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:scale-125"
                            />
                        </g>
                    ))}
                </svg>
            </div>

            {/* Time Axis Footer */}
            <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-1 border-t border-white/5 pt-2">
                {timeLabels.map((lbl, idx) => (
                    <span key={idx} className={lbl === "NOW" ? "text-emerald-400 font-bold animate-pulse" : ""}>
                        {lbl}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default MovingSoilChart;
