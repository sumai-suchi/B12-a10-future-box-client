import { Helmet } from "react-helmet";

const AdminEnrollments = () => {
  // Temporary static data (replace with API later)
  const enrollments = [
    {
      _id: "1",
      studentName: "John Doe",
      courseTitle: "React for Beginners",
      date: "2026-01-20",
      status: "Active",
    },
    {
      _id: "2",
      studentName: "Jane Smith",
      courseTitle: "Node & Express Basics",
      date: "2026-01-22",
      status: "Completed",
    },
    {
      _id: "3",
      studentName: "Ali Rahman",
      courseTitle: "HTML & CSS Fundamentals",
      date: "2026-01-23",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin | Enrollments</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Student Enrollments
        </h1>
        <p className="text-slate-600 mt-1">
          List of students enrolled in your courses.
        </p>
      </div>

      {/* Enrollment Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-slate-600">
            <tr>
              <th className="text-left px-5 py-3">Student Name</th>
              <th className="text-left px-5 py-3">Course Title</th>
              <th className="text-left px-5 py-3">Enrollment Date</th>
              <th className="text-left px-5 py-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((enroll) => (
              <tr
                key={enroll._id}
                className="border-t border-slate-200 hover:bg-slate-50"
              >
                <td className="px-5 py-3">{enroll.studentName}</td>
                <td className="px-5 py-3">{enroll.courseTitle}</td>
                <td className="px-5 py-3">{enroll.date}</td>
                <td className="px-5 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                    ${
                      enroll.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {enroll.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enrollments.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            No enrollments yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminEnrollments;
