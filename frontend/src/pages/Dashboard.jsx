import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar.js";
import HeroSpotlight from "../components/HeroSpotlight.js";
import AboutSection from "../components/AboutSection.js";
import DashboardView from "../components/DashboardView.js";
import BenefitsSection from "../components/BenefitsSection.js";
import ContactSection from "../components/ContactSection.js";
import SimulateDataModal from "../components/SimulateDataModal.js";

import { getRoverData } from "../services/api.js";

function Dashboard() {
    // Separate Page view state: 'home', 'care', 'dashboard', 'purpose', 'contact', 'all'
    const [activePage, setActivePage] = useState("all");
    const [observations, setObservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiConnected, setApiConnected] = useState(true);
    const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    // Day / Night Theme State
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("plant-theme") || "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("light-mode", theme === "light");
        localStorage.setItem("plant-theme", theme);
    }, [theme]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 250) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    const loadData = useCallback(async (isSilent = false) => {
        try {
            const data = await getRoverData();
            setObservations(data);
            setError(null);
            setApiConnected(true);
        } catch (err) {
            setError(err.message);
            setApiConnected(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // Initial load + 5-second live polling interval
    useEffect(() => {
        loadData(false);

        const interval = setInterval(() => {
            loadData(true);
        }, 5000);

        return () => clearInterval(interval);
    }, [loadData]);

    const handleNavigate = (pageId) => {
        setActivePage(pageId);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
            {/* Top Navigation Taskbar with Separate Page Switching */}
            <Navbar
                activePage={activePage}
                onNavigate={handleNavigate}
                theme={theme}
                onToggleTheme={toggleTheme}
                apiConnected={apiConnected}
                onOpenSimulateModal={() => setIsSimulateModalOpen(true)}
            />

            <main className="pt-18 min-h-[85vh]">
                {/* Page 1: Home View */}
                {(activePage === "home" || activePage === "all") && (
                    <HeroSpotlight onNavigate={handleNavigate} />
                )}

                {/* Page 2: Smart Plant Care & Telemetry */}
                {(activePage === "care" || activePage === "all") && (
                    <div className="animate-fade-in transition-all">
                        <AboutSection />
                    </div>
                )}

                {/* Page 3: Live Dashboard Suite */}
                {(activePage === "dashboard" || activePage === "all") && (
                    <div className="animate-fade-in transition-all">
                        <DashboardView
                            observations={observations}
                            loading={loading}
                            error={error}
                            apiConnected={apiConnected}
                            onRefresh={() => loadData(false)}
                            onOpenSimulateModal={() => setIsSimulateModalOpen(true)}
                        />
                    </div>
                )}

                {/* Page 4: Grow With Purpose Benefits */}
                {(activePage === "purpose" || activePage === "all") && (
                    <div className="animate-fade-in transition-all">
                        <BenefitsSection />
                    </div>
                )}

                {/* Page 5: Contact Section */}
                {(activePage === "contact" || activePage === "all") && (
                    <div className="animate-fade-in transition-all">
                        <ContactSection />
                    </div>
                )}
            </main>

            {/* Floating Back to Top Button */}
            {showBackToTop && (
                <button
                    onClick={scrollToTop}
                    aria-label="Back to top"
                    className="fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-3 text-xs font-extrabold shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border border-emerald-400/40 hover:shadow-[0_0_25px_rgba(74,222,128,0.5)] cursor-pointer group"
                >
                    <span className="text-base group-hover:-translate-y-1 transition-transform">↑</span>
                    <span className="hidden sm:inline font-mono uppercase tracking-wider font-bold">Top</span>
                </button>
            )}

            {/* Telemetry Simulation Modal */}
            <SimulateDataModal
                isOpen={isSimulateModalOpen}
                onClose={() => setIsSimulateModalOpen(false)}
                onSuccess={() => loadData(false)}
            />
        </div>
    );
}

export default Dashboard;
