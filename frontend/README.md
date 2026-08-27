# Smart Agriculture Rover 🌱

A smart agriculture monitoring system that uses a field rover to collect environmental data, GPS coordinates, and crop images and presents the information through a web-based monitoring dashboard.

The system is designed to provide a common software interface between the rover hardware and the application, allowing sensor and image data to be sent to a single backend API and visualized through a React dashboard.

---

## Overview

The Smart Agriculture Rover consists of three major software layers:

1. **Rover / Data Source**
   - Collects environmental sensor readings.
   - Captures GPS coordinates.
   - Captures crop images.
   - Sends collected data to the backend.

2. **Backend**
   - Built using Django and Django REST Framework.
   - Provides a single API endpoint for rover observations.
   - Stores observations in SQLite.
   - Stores uploaded crop images.
   - Provides data to the frontend.

3. **Frontend**
   - Built using React and Vite.
   - Provides a dashboard for monitoring rover observations.
   - Displays sensor readings, crop images, GPS location, alerts, and observation history.
   - Uses Leaflet and OpenStreetMap for rover location visualization.

The architecture is designed so that the backend does not depend on a specific hardware implementation. Any rover/controller capable of sending the required API request can communicate with the backend.

---

## System Architecture

```text
                         ┌─────────────────────┐
                         │        ROVER        │
                         │                     │
                         │ Sensors + Camera    │
                         │ GPS                 │
                         └──────────┬──────────┘
                                    │
                                    │ POST
                                    │ JSON + Image
                                    ▼
                         ┌─────────────────────┐
                         │    Django REST API  │
                         │                     │
                         │ /api/rover-data/    │
                         └──────────┬──────────┘
                                    │
                         ┌──────────┴──────────┐
                         │                     │
                         ▼                     ▼
                  ┌─────────────┐       ┌─────────────┐
                  │   SQLite    │       │    Media    │
                  │  Database   │       │   Storage   │
                  └──────┬──────┘       └──────┬──────┘
                         │                     │
                         └──────────┬──────────┘
                                    │
                                    │ GET
                                    ▼
                         ┌─────────────────────┐
                         │    React Dashboard  │
                         │                     │
                         │ Sensors             │
                         │ Crop Scan           │
                         │ GPS Map              │
                         │ Alerts              │
                         │ Observation History │
                         └─────────────────────┘