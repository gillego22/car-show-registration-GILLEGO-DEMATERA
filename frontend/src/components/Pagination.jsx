
function Pagination({
  page,
  totalPages,
  totalCount,
  pageSize,
  loading,
  onPageChange,
}) {
  const startItem =
    totalCount === 0 ? 0 : (page - 1) * pageSize + 1;

  const endItem = Math.min(page * pageSize, totalCount);

  return (
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mt-3">
      <small className="text-secondary">
        Showing {startItem}–{endItem} of {totalCount} registrations
      </small>

      <div className="d-flex align-items-center gap-2">
        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={loading || page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </button>

        <span className="small">
          Page {page} of {totalPages || 1}
        </span>

        <button
          className="btn btn-outline-secondary btn-sm"
          disabled={loading || page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
