import { useEffect, useState } from "react";

import Header from "../components/Header";
import SensorGrid from "../components/SensorGrid";
import CropScan from "../components/CropScan";
import LocationCard from "../components/LocationCard";
import AlertPanel from "../components/AlertPanel";

import { getRoverData } from "../services/api";

function Dashboard() {
    const [observations, setObservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getRoverData();

                setObservations(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    const latestObservation = observations[0];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="mx-auto max-w-7xl px-6 py-8">

                {/* Page Header */}
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-900">
                        Rover Dashboard
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Monitor field conditions and rover observations.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-gray-500">
                            Loading rover data...
                        </p>
                    </div>
                )}

                {/* Error */}
                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6">
                        <p className="font-medium text-red-700">
                            Unable to load rover data
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            {error}
                        </p>
                    </div>
                )}

                {/* Dashboard */}
                {!loading && !error && latestObservation && (
                    <>
                        {/* Sensor Readings */}
                        <SensorGrid
                            observation={latestObservation}
                        />

                        {/* Crop Scan + Location */}
                        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                            <CropScan
                                observation={latestObservation}
                            />

                            <LocationCard
                                observation={latestObservation}
                            />

                        </div>

                        {/* Alerts */}
                        <div className="mt-6">
                            <AlertPanel
                                observation={latestObservation}
                            />
                        </div>

                        {/* Observation History */}
                        <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

                            <div className="border-b border-gray-200 px-6 py-5">
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Observation History
                                </h3>

                                <p className="mt-1 text-sm text-gray-500">
                                    Previous readings collected by the rover.
                                </p>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-sm">

                                    <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                                        <tr>
                                            <th className="px-6 py-4">
                                                Time
                                            </th>

                                            <th className="px-6 py-4">
                                                Temperature
                                            </th>

                                            <th className="px-6 py-4">
                                                Humidity
                                            </th>

                                            <th className="px-6 py-4">
                                                Soil Moisture
                                            </th>

                                            <th className="px-6 py-4">
                                                pH
                                            </th>

                                            <th className="px-6 py-4">
                                                Disease
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">

                                        {observations.map((observation) => (
                                            <tr
                                                key={observation.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="whitespace-nowrap px-6 py-4 text-gray-700">
                                                    {new Date(
                                                        observation.created_at
                                                    ).toLocaleString()}
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {observation.temperature} °C
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {observation.humidity} %
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {observation.soil_moisture} %
                                                </td>

                                                <td className="px-6 py-4 text-gray-700">
                                                    {observation.ph}
                                                </td>

                                                <td className="px-6 py-4">
                                                    {observation.disease ? (
                                                        <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-700">
                                                            {observation.disease}
                                                        </span>
                                                    ) : (
                                                        <span className="text-gray-400">
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>

                            {/* No observations */}
                            {observations.length === 0 && (
                                <div className="p-8 text-center text-sm text-gray-500">
                                    No observations available.
                                </div>
                            )}

                        </div>
                    </>
                )}

                {/* No Data */}
                {!loading && !error && !latestObservation && (
                    <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">

                        <p className="text-gray-600">
                            No rover observations available.
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                            Send data from the rover to see it here.
                        </p>

                    </div>
                )}

            </main>
        </div>
    );
}

export default Dashboard;