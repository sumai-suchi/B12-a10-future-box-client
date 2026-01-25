import { Helmet } from "react-helmet";
import { useParams, useNavigate } from "react-router";
import { useState } from "react";

const UpdateData = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy existing data (replace with API fetch later)
  const [courseData, setCourseData] = useState({
    title: "React for Beginners",
    category: "Web Development",
    price: 49,
    description: "Learn React from scratch with hands-on projects.",
    status: "Published",
  });

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Course ID:", id, courseData);
    // TODO: connect update API here
    navigate("/dashboard/admin/myAddedCourse");
  };

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Admin | Update Course</title>
      </Helmet>

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-800">
          Update Course
        </h1>
        <p className="text-slate-600 mt-1">
          Editing course ID: <span className="font-medium">{id}</span>
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Course Title
          </label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={courseData.category}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Price (USD)
          </label>
          <input
            type="number"
            name="price"
            value={courseData.price}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            rows={4}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Status
          </label>
          <select
            name="status"
            value={courseData.status}
            onChange={handleChange}
            className="mt-1 w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Update Course
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateData;
