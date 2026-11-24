
const API_BASE_URL = "http://localhost:5205/api/registrations";

// GET registrations with search, filters, and pagination
export async function getRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (participantName.trim()) {
    params.set("participantName", participantName.trim());
  }

  if (type) {
    params.set("type", type);
  }

  if (status) {
    params.set("status", status);
  }

  const response = await fetch(`${API_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`Failed to load registrations (${response.status})`);
  }

  return response.json();
}

// GET dashboard summary
export async function getSummary() {
  const response = await fetch(`${API_BASE_URL}/summary`);

  if (!response.ok) {
    throw new Error(`Failed to load summary (${response.status})`);
  }

  return response.json();
}

// GET registration details by ID
export async function getRegistrationById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Failed to load registration (${response.status})`);
  }

  return response.json();
}
