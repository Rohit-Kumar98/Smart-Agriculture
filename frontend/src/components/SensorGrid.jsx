import SensorCard from "./SensorCard";

function SensorGrid({ observation }) {
    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SensorCard
                title="Temperature"
                value={observation.temperature}
                unit="°C"
                icon="🌡️"
            />

            <SensorCard
                title="Humidity"
                value={observation.humidity}
                unit="%"
                icon="💧"
            />

            <SensorCard
                title="Soil Moisture"
                value={observation.soil_moisture}
                unit="%"
                icon="🌱"
            />

            <SensorCard
                title="Soil pH"
                value={observation.ph}
                unit=""
                icon="⚗️"
            />
        </section>
    );
}

export default SensorGrid;