
import Pagination from "../components/Pagination";
import RegistrationFilters from "../components/RegistrationFilters";
import PaymentBadge from "../components/PaymentBadge";
import StatusBadge from "../components/StatusBadge";
import KpiCard from "../components/KpiCard";
import { useEffect, useState } from "react";
import { getRegistrations, getSummary } from "../api/registrations-api";

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount ?? 0);
}

function formatDate(date) {
  return new Date(date).toLocaleString("en-PH", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState([]);
  const [summary, setSummary] = useState(null);

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    let active = true;

    async function loadDashboard() {
      try {
        setLoading(true);
        setError("");

        const [registrationData, summaryData] = await Promise.all([
          getRegistrations({
            participantName: search,
            type,
            status,
            page,
            pageSize,
          }),
          getSummary(),
        ]);

        if (!active) return;

        setRegistrations(registrationData.items);
        setTotalCount(registrationData.totalCount);
        setTotalPages(registrationData.totalPages);
        setSummary(summaryData);
      } catch (err) {
        if (active) {
          setError("Unable to load registrations. Please try again.");
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      active = false;
    };
  }, [search, type, status, page, pageSize, retry]);

  function clearFilters() {
    setSearch("");
    setType("");
    setStatus("");
    setPage(1);
  }

  return (
    <div className="dashboard-container">
      <header className="mb-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
          <div>
            <h2 className="fw-bold mb-1">AutoVista Events</h2>
            <p className="text-secondary mb-0">
              Car Show 2027 · Sorsogon City Coliseum
            </p>
          </div>

          <span className="badge text-bg-dark p-2">
            Registration Dashboard
          </span>
        </div>
      </header>

      <section className="mb-4">
        <h5 className="fw-bold mb-3">Dashboard Overview</h5>

        <div className="row g-3">
          <KpiCard
            title="Total Registrations"
            value={summary?.totalRegistrations ?? "..."}
            loading={loading}
          />

          <KpiCard
            title="Total Payments"
            value={summary ? formatCurrency(summary.totalPayments) : "..."}
            color="text-success"
            loading={loading}
          />

          <KpiCard
            title="Uncollected Payments"
            value={
              summary ? formatCurrency(summary.uncollectedPayments) : "..."
            }
            color="text-danger"
            loading={loading}
          />

          <KpiCard
            title="Confirmed"
            value={summary?.confirmed ?? "..."}
            color="text-success"
            loading={loading}
          />

          <KpiCard
            title="Checked In"
            value={summary?.checkedIn ?? "..."}
            color="text-primary"
            loading={loading}
          />
        </div>
      </section>

      <RegistrationFilters
        search={search}
        setSearch={setSearch}
        type={type}
        setType={setType}
        status={status}
        setStatus={setStatus}
        onClear={clearFilters}
      />

      <section className="card border-0 shadow-sm">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mb-3">
            <h5 className="fw-bold mb-0">Registration Records</h5>

            <div className="d-flex align-items-center gap-2">
              <label className="small text-secondary">Rows per page</label>
              <select
                className="form-select form-select-sm"
                style={{ width: "85px" }}
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="alert alert-danger d-flex justify-content-between align-items-center">
              <span>{error}</span>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => setRetry((current) => current + 1)}
              >
                Try Again
              </button>
            </div>
          )}

          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Reg No.</th>
                  <th>Date</th>
                  <th>Participant</th>
                  <th>Car Details</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Fee / Paid</th>
                  <th>Payment</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  Array.from({ length: pageSize }, (_, index) => (
                    <tr key={`skeleton-${index}`}>
                      {Array.from({ length: 8 }, (_, column) => (
                        <td key={column}>
                          <div className="placeholder-glow">
                            <span
                              className={`placeholder rounded ${
                                column === 2 || column === 3
                                  ? "col-10"
                                  : "col-7"
                              }`}
                            />
                            {column === 2 || column === 3 ? (
                              <div className="placeholder-glow mt-2">
                                <span className="placeholder col-6 rounded" />
                              </div>
                            ) : null}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : registrations.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center py-5">
                      <p className="fw-semibold mb-2">
                        No registrations match your filters.
                      </p>
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={clearFilters}
                      >
                        Clear Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  registrations.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-semibold">
                        {item.registrationNumber}
                      </td>

                      <td className="small text-secondary">
                        {formatDate(item.registrationDate)}
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {item.participantName}
                        </div>
                        <div className="small text-secondary">
                          {item.contactNumber}
                        </div>
                        <div className="small text-secondary">
                          {item.email}
                        </div>
                      </td>

                      <td>
                        <div className="fw-semibold">
                          {item.carMakeModel || "No car details"}
                        </div>
                        <div className="small text-secondary">
                          {item.plateNumber || "No plate number"}
                        </div>
                      </td>

                      <td>{item.type}</td>

                      <td>
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="small">
                        <div>{formatCurrency(item.registrationFee)}</div>
                        <div className="text-secondary">
                          {formatCurrency(item.amountPaid)}
                        </div>
                      </td>

                      <td>
                        <PaymentBadge status={item.paymentStatus} />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            page={page}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={pageSize}
            loading={loading}
            onPageChange={setPage}
          />
        </div>
      </section>
    </div>
  );
}
