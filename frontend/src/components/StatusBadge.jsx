
function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-warning text-dark",
    Confirmed: "bg-success",
    CheckedIn: "bg-primary",
    Cancelled: "bg-danger",
  };

  return (
    <span className={`badge ${styles[status] || "bg-secondary"}`}>
      {status === "CheckedIn" ? "Checked In" : status}
    </span>
  );
}

export default StatusBadge;
