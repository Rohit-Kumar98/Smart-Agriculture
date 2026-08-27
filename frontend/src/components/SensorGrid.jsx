import SensorCard from "./SensorCard.js";

function SensorGrid({ observation }) {
    const temp = observation?.temperature ?? 0;
    let tempStatus = "Optimal";
    let tempType = "optimal";
    if (temp > 35) {
        tempStatus = "High Heat";
        tempType = "danger";
    } else if (temp < 15) {
        tempStatus = "Low Temp";
        tempType = "warning";
    }

    const hum = observation?.humidity ?? 0;
    let humStatus = "Comfortable";
    let humType = "optimal";
    if (hum > 85) {
        humStatus = "High Humidity";
        humType = "warning";
    } else if (hum < 30) {
        humStatus = "Dry Air";
        humType = "warning";
    }

    const moisture = observation?.soil_moisture ?? 0;
    let moistureStatus = "Adequate";
    let moistureType = "optimal";
    if (moisture < 25) {
        moistureStatus = "Dry Soil - Needs Water";
        moistureType = "danger";
    } else if (moisture > 80) {
        moistureStatus = "Saturated";
        moistureType = "warning";
    }

    return (
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SensorCard
                title="Temperature"
                value={observation?.temperature}
                unit="°C"
                icon="🌡️"
                status={tempStatus}
                statusType={tempType}
            />

            <SensorCard
                title="Humidity"
                value={observation?.humidity}
                unit="%"
                icon="💧"
                status={humStatus}
                statusType={humType}
            />

            <SensorCard
                title="Soil Moisture"
                value={observation?.soil_moisture}
                unit="%"
                icon="🌱"
                status={moistureStatus}
                statusType={moistureType}
            />

        </section>
    );
}

export default SensorGrid;
