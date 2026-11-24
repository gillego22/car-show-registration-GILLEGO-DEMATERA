
function KpiCard({ title, value, color, loading }) {
  return (
    <div className="col-12 col-sm-6 col-xl">
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <p className="text-secondary mb-2">{title}</p>

          {loading ? (
            <div className="placeholder-glow" aria-label="Loading">
              <span className="placeholder col-8 rounded" />
            </div>
          ) : (
            <h4 className={`fw-bold mb-0 ${color || "text-dark"}`}>
              {value}
            </h4>
          )}
        </div>
      </div>
    </div>
  );
}

export default KpiCard;
