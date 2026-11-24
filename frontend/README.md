# AutoVista Events – Car Show Registration Dashboard

## Project Overview

A React-based dashboard for managing AutoVista Events Car Show 2027 registrations. It displays registration records, payment information, registration summaries, search, filters, and pagination.

## Technologies Used

- React
- Vite
- Bootstrap 5
- JavaScript
- Fetch API
- ASP.NET Core Web API

## Running the Frontend

Open a terminal inside the `frontend` folder and run:

```bash
npm install
npm run dev
```

Open the URL displayed by Vite, usually `http://localhost:5173`.

## Running the Backend

Start the ASP.NET Core backend from the `backend` folder:

```bash
dotnet run --project Api/Api.csproj
```

The API runs at `http://localhost:5205`.

## Switching Between Sample Data and Real API

The project contains two data sources:

- `src/api/sample-data.js` – sample registration data for frontend development and testing.
- `src/api/registrations-api.js` – real API functions that fetch data from the ASP.NET Core backend.

### Using Sample Data

In `src/pages/RegistrationsPage.jsx`, import the functions from the sample data file:

```javascript
import { getRegistrations, getSummary } from "../api/sample-data";
```

### Using the Real API

When the backend is ready, change the import to:

```javascript
import { getRegistrations, getSummary } from "../api/registrations-api";
```

Both data sources should provide the same function names and compatible return shapes so the dashboard can use either source without changing its UI logic.

## API Endpoints Used

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/registrations` | Get registrations with search, filters, and pagination |
| GET | `/api/registrations/summary` | Get dashboard summary |
| GET | `/api/registrations/{id}` | Get registration details |
| POST | `/api/registrations` | Create a registration |

### Registration Query Parameters

- `participantName` – search by participant name
- `type` – filter by registration type
- `status` – filter by registration status
- `page` – current page
- `pageSize` – number of records per page

Example:

```text
http://localhost:5205/api/registrations?page=1&pageSize=10
```

## Dashboard Features

- Registration summary KPI cards
- Registration records table
- Participant name search
- Registration type and status filters
- Pagination
- Loading skeletons
- Empty state
- API error state
- Payment and registration status badges
