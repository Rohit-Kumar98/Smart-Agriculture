function CropScan({ observation }) {
    const hasImage = Boolean(observation?.image_url);

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-900">
                    Latest Crop Scan
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Most recent image captured by the rover.
                </p>
            </div>

            <div className="overflow-hidden rounded-lg bg-gray-100">
                {hasImage ? (
                    <img
                        src={observation.image_url}
                        alt="Latest crop scan"
                        className="h-72 w-full object-cover"
                    />
                ) : (
                    <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                        No image available
                    </div>
                )}
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4">
                <div>
                    <p className="text-xs text-gray-500">
                        Disease
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {observation.disease || "—"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Confidence
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {observation.confidence !== null
                            ? `${observation.confidence}%`
                            : "—"}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-500">
                        Severity
                    </p>

                    <p className="mt-1 font-medium text-gray-900">
                        {observation.severity || "—"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CropScan;