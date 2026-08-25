import { useEffect, useRef } from "react";

const SPOTLIGHT_R = 260;

function HeroSpotlight() {
    const canvasRef = useRef(null);
    const heroTitleRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const reveal = document.getElementById("revealImage");
        const heroTitle = heroTitleRef.current;

        if (!canvas || !reveal) return;

        const ctx = canvas.getContext("2d");
        const mouse = { x: -999, y: -999 };
        const smooth = { x: -999, y: -999 };
        let rafRef;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const renderMask = () => {
            smooth.x += (mouse.x - smooth.x) * 0.1;
            smooth.y += (mouse.y - smooth.y) * 0.1;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const gradient = ctx.createRadialGradient(
                smooth.x,
                smooth.y,
                0,
                smooth.x,
                smooth.y,
                SPOTLIGHT_R
            );
            gradient.addColorStop(0, "rgba(255,255,255,1)");
            gradient.addColorStop(0.4, "rgba(255,255,255,1)");
            gradient.addColorStop(0.6, "rgba(255,255,255,.75)");
            gradient.addColorStop(0.75, "rgba(255,255,255,.4)");
            gradient.addColorStop(0.88, "rgba(255,255,255,.12)");
            gradient.addColorStop(1, "rgba(255,255,255,0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(smooth.x, smooth.y, SPOTLIGHT_R, 0, Math.PI * 2);
            ctx.fill();

            const mask = canvas.toDataURL();
            reveal.style.maskImage = `url(${mask})`;
            reveal.style.webkitMaskImage = `url(${mask})`;

            rafRef = requestAnimationFrame(renderMask);
        };

        const onMouseMove = (event) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;

            if (heroTitle) {
                const x = (event.clientX / window.innerWidth - 0.5) * 10;
                const y = (event.clientY / window.innerHeight - 0.5) * 8;
                heroTitle.style.transform = `translate3d(${x}px, ${y}px, 35px)`;
            }
        };

        const onMouseLeave = () => {
            if (heroTitle) {
                heroTitle.style.transform = "translate3d(0, 0, 0)";
            }
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);
        window.addEventListener("mousemove", onMouseMove);
        heroTitle?.parentElement?.addEventListener("mouseleave", onMouseLeave);

        rafRef = requestAnimationFrame(renderMask);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            window.removeEventListener("mousemove", onMouseMove);
            heroTitle?.parentElement?.removeEventListener("mouseleave", onMouseLeave);
            cancelAnimationFrame(rafRef);
        };
    }, []);

    return (
        <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-6 py-24 overflow-hidden" id="hero">
            <div className="base-image hero-zoom absolute inset-0 z-0" />
            <canvas id="maskCanvas" ref={canvasRef} aria-hidden="true" className="absolute inset-0 pointer-events-none z-10" />
            <div className="reveal-image absolute inset-0 pointer-events-none z-20" id="revealImage" />

            <div className="relative z-30 max-w-4xl space-y-6" ref={heroTitleRef}>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
                    <span className="font-playfair font-normal text-emerald-400 block mb-2">
                        Plants speak.
                    </span>
                    <span className="block">
                        We help you listen.
                    </span>
                </h1>

                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-4">
                    Plant Monitoring System brings soil moisture, temperature, humidity, light, and plant health together in one beautifully simple view.
                </p>

                <div className="pt-6">
                    <a
                        href="#dashboard"
                        className="inline-flex items-center gap-3 rounded-full bg-white text-slate-950 px-8 py-4 text-sm font-extrabold shadow-2xl hover:bg-emerald-400 transition-all hover:scale-105"
                    >
                        View Dashboard <span>→</span>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-6 z-30 text-xs font-mono text-slate-500 flex items-center gap-2">
                <span>✦ Move cursor to reveal plant insights</span>
            </div>
        </section>
    );
}

export default HeroSpotlight;
