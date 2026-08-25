const API_BASE_URL = "http://127.0.0.1:8000/api";

export async function getRoverData() {
    const response = await fetch(
        `${API_BASE_URL}/rover-data/`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch rover data");
    }

    return response.json();
}