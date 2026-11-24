
const registrations = [
  {
    id: 1,
    registrationNumber: "CS27-0001",
    registrationDate: "2027-02-10T08:30:00",
    participantName: "Juan Dela Cruz",
    contactNumber: "09171234567",
    email: "juan@example.com",
    address: "Sorsogon City",
    carMake: "Toyota",
    carModel: "Supra",
    plateNumber: "ABC-1234",
    type: "Exhibitor",
    status: "Confirmed",
    registrationFee: 2500,
    amountPaid: 2500,
    paymentStatus: "Paid",
  },
  {
    id: 2,
    registrationNumber: "CS27-0002",
    registrationDate: "2027-02-10T09:15:00",
    participantName: "Maria Santos",
    contactNumber: "09181234567",
    email: "maria@example.com",
    address: "Legazpi City",
    carMake: "Honda",
    carModel: "Civic Type R",
    plateNumber: "XYZ-5678",
    type: "Competitor",
    status: "Pending",
    registrationFee: 3500,
    amountPaid: 1000,
    paymentStatus: "Partial",
  },
  {
    id: 3,
    registrationNumber: "CS27-0003",
    registrationDate: "2027-02-10T10:00:00",
    participantName: "Pedro Reyes",
    contactNumber: "09191234567",
    email: "pedro@example.com",
    address: "Naga City",
    carMake: "Mitsubishi",
    carModel: "Lancer Evolution",
    plateNumber: "DEF-9012",
    type: "VIP",
    status: "CheckedIn",
    registrationFee: 5000,
    amountPaid: 5000,
    paymentStatus: "Paid",
  },
];

const sampleRegistrations = Array.from({ length: 25 }, (_, index) => {
  const base = registrations[index % registrations.length];

  return {
    ...base,
    id: index + 1,
    registrationNumber: `CS27-${String(index + 1).padStart(4, "0")}`,
    participantName:
      index < 3 ? base.participantName : `${base.participantName} ${index + 1}`,
  };
});

export async function getRegistrations({
  participantName = "",
  type = "",
  status = "",
  page = 1,
  pageSize = 10,
} = {}) {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  let filtered = [...sampleRegistrations];

  if (participantName) {
    filtered = filtered.filter((item) =>
      item.participantName.toLowerCase().includes(participantName.toLowerCase())
    );
  }

  if (type) {
    filtered = filtered.filter((item) => item.type === type);
  }

  if (status) {
    filtered = filtered.filter((item) => item.status === status);
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;

  return {
    items: filtered.slice(startIndex, startIndex + pageSize),
    page,
    pageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary() {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const totalRegistrations = sampleRegistrations.length;

  const totalPayments = sampleRegistrations.reduce(
    (total, item) => total + item.amountPaid,
    0
  );

  const uncollectedPayments = sampleRegistrations.reduce(
    (total, item) => total + (item.registrationFee - item.amountPaid),
    0
  );

  return {
    totalRegistrations,
    totalPayments,
    uncollectedPayments,
    confirmed: sampleRegistrations.filter(
      (item) => item.status === "Confirmed"
    ).length,
    checkedIn: sampleRegistrations.filter(
      (item) => item.status === "CheckedIn"
    ).length,
  };
}
