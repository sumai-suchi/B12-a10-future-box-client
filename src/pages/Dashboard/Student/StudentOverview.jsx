import { Helmet } from "react-helmet";

const StudentOverview = () => {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Student Dashboard | Overview</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Student Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Welcome back! Track your learning progress here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Enrolled Courses" value="3" />
        <StatCard title="Completed Courses" value="1" />
        <StatCard title="In Progress" value="2" />
        <StatCard title="Certificates Earned" value="1" />
      </div>
    </div>
  );
};

export default StudentOverview;

/* ================= Small Local Card ================= */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
  );
};
