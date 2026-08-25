const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getRoverData() {
    const response = await fetch(
        `${API_BASE_URL}/rover-data/`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch rover data from backend API");
    }

    return response.json();
}

export async function createRoverObservation(observationData) {
    const response = await fetch(`${API_BASE_URL}/rover-data/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(observationData),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = Object.values(errorData).flat().join(" ") || "Failed to submit observation";
        throw new Error(errorMessage);
    }

    return response.json();
}