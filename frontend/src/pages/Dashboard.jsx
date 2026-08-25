import { useEffect, useState, useCallback } from "react";

import Navbar from "../components/Navbar.js";
import HeroSpotlight from "../components/HeroSpotlight.js";
import AboutSection from "../components/AboutSection.js";
import FeaturesSection from "../components/FeaturesSection.js";
import FlowSection from "../components/FlowSection.js";
import DashboardView from "../components/DashboardView.js";
import BenefitsSection from "../components/BenefitsSection.js";
import ContactSection from "../components/ContactSection.js";
import SimulateDataModal from "../components/SimulateDataModal.js";

import { getRoverData } from "../services/api.js";

function Dashboard() {
    const [observations, setObservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [apiConnected, setApiConnected] = useState(true);
    const [isSimulateModalOpen, setIsSimulateModalOpen] = useState(false);

    // Day / Night Theme State
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("plant-theme") || "dark";
    });

    useEffect(() => {
        document.body.classList.toggle("light-mode", theme === "light");
        localStorage.setItem("plant-theme", theme);
    }, [theme]);

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

    return (
        <div className="min-h-screen font-sans selection:bg-emerald-500 selection:text-slate-950">
            {/* Top Navigation with Day/Night Toggle */}
            <Navbar
                theme={theme}
                onToggleTheme={toggleTheme}
                apiConnected={apiConnected}
                onOpenSimulateModal={() => setIsSimulateModalOpen(true)}
            />

            <main className="pt-18">
                {/* Hero Spotlight Section */}
                <HeroSpotlight />

                {/* Section 01 - Smart Plant Care & Stats */}
                <AboutSection />

                {/* Section 02 - Features Grid */}
                <FeaturesSection />

                {/* Section 03 - How It Flows Pipeline */}
                <FlowSection />

                {/* Section 04 - Live Dashboard Suite */}
                <DashboardView
                    observations={observations}
                    loading={loading}
                    error={error}
                    apiConnected={apiConnected}
                    onRefresh={() => loadData(false)}
                    onOpenSimulateModal={() => setIsSimulateModalOpen(true)}
                />

                {/* Section 05 - Grow with Purpose Benefits */}
                <BenefitsSection />

                {/* Section 07 - Contact Form & Footer */}
                <ContactSection />
            </main>

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
