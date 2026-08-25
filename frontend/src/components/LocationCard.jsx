import LocationMap from "./LocationMap";

function LocationCard({ observation }) {
    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                    Rover Location
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Latest GPS position reported by the rover.
                </p>
            </div>

            <LocationMap observation={observation} />

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                        Latitude
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {observation.latitude}
                    </p>
                </div>

                <div className="rounded-lg bg-gray-50 p-3">
                    <p className="text-xs text-gray-500">
                        Longitude
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {observation.longitude}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LocationCard;