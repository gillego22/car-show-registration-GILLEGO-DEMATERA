
function RegistrationFilters({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
  onClear,
}) {
  return (
    <section className="card border-0 shadow-sm mb-4">
      <div className="card-body">
        <h5 className="fw-bold mb-3">Registration Filters</h5>

        <div className="row g-3">
          <div className="col-12 col-md-4">
            <label className="form-label">Search Participant</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter participant name..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label">Registration Type</label>
            <select
              className="form-select"
              value={type}
              onChange={(event) => setType(event.target.value)}
            >
              <option value="">All Types</option>
              <option value="Exhibitor">Exhibitor</option>
              <option value="Competitor">Competitor</option>
              <option value="VIP">VIP</option>
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label className="form-label">Registration Status</label>
            <select
              className="form-select"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="CheckedIn">Checked In</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-12 col-md-2 d-flex align-items-end">
            <button
              className="btn btn-outline-secondary w-100"
              onClick={onClear}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegistrationFilters;
