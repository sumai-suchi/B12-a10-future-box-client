import { Helmet } from "react-helmet";

const AdminOverview = () => {
  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin Dashboard | Overview</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Admin Dashboard
        </h1>
        <p className="text-slate-600 mt-1">
          Welcome back! Here’s a quick overview.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Total Courses" value="12" />
        <StatCard title="Total Students" value="340" />
        <StatCard title="Enrollments" value="520" />
        <StatCard title="Pending Reviews" value="3" />
      </div>
    </div>
  );
};

export default AdminOverview;

/* ================= Small Reusable Card ================= */
const StatCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
      <h3 className="text-sm text-slate-500">{title}</h3>
      <p className="text-2xl font-bold text-slate-800 mt-2">{value}</p>
    </div>
  );
};
