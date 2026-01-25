import { Helmet } from "react-helmet";

const StudentPaymentHistory = () => {
  // Dummy data (replace with API later)
  const payments = [
    {
      id: 1,
      course: "React for Beginners",
      amount: "$49",
      date: "12 Jan 2025",
      status: "Paid",
    },
    {
      id: 2,
      course: "Advanced JavaScript",
      amount: "$39",
      date: "05 Feb 2025",
      status: "Paid",
    },
  ];

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Student | Payment History</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Payment History
        </h1>
        <p className="text-slate-600 mt-1">
          View your course payment records
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white border border-slate-200 rounded-xl">
        <table className="table w-full">
          <thead className="bg-slate-100">
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((pay, index) => (
              <tr key={pay.id}>
                <td>{index + 1}</td>
                <td className="font-medium">{pay.course}</td>
                <td>{pay.amount}</td>
                <td>{pay.date}</td>
                <td>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    {pay.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {payments.length === 0 && (
          <p className="text-center py-6 text-slate-500">
            No payment history found.
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentPaymentHistory;
