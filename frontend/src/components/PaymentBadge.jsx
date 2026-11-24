
function PaymentBadge({ status }) {
  const styles = {
    Unpaid: "bg-danger",
    Partial: "bg-warning text-dark",
    Paid: "bg-success",
  };

  return (
    <span className={`badge ${styles[status] || "bg-secondary"}`}>
      {status}
    </span>
  );
}

export default PaymentBadge;
