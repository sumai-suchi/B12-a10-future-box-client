import axios from "axios";
import { useContext } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const AddCourses = () => {
  const { user } = useContext(AuthContext);
  const email = user?.email;
  const handleAddCourseData = async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const image = e.target.image.value;
    const price = e.target.price.value;
    const duration = e.target.duration.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const name = e.target.name.value;

    const UserImage = e.target.UserImage.value;
    const isFeatured = e.target.isFeatured.value;
    const rating = e.target.rating.value;
    const level = e.target.level.value;
    const instructor = e.target.instructor.value;

    console.log(
      title,
      image,
      price,
      duration,
      category,
      name,
      email,
      UserImage,
      isFeatured,
      rating,
      level,
      instructor,
      description
    );
    const courseData = {
      title,
      image,
      price,
      description,
      duration,
      category,
      name,
      email,
      UserImage,
      isFeatured,
      rating,
      level,
      instructor,
    };

    try {
      const res = await axios.post(
        `https://b12-a10-future-box-server-hazel.vercel.app/addedCourses`,
        courseData
      );
      const result = res.data;
      if (result.insertedId) {
        toast("Course added successfully");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" w-full mt-20 opacity-70 flex items-center justify-center p-2 md:p-6">
      <form
        onSubmit={handleAddCourseData}
        className="bg-neutral-50  shadow-2xl rounded-2xl p-8 w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Add New Course
        </h2>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Title */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter course title"
              className="w-full border border-gray-300 bg-neutral-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2">
          {/* Price */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              placeholder="Enter price"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Duration */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              Duration
            </label>
            <input
              type="text"
              name="duration"
              placeholder="e.g. 6 weeks"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
        </div>
        {/* user info */}
        <div className="flex flex-col md:flex-row gap-2">
          {/* Title */}
          <div className="flex-1">
            <label className="block  text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={user?.displayName}
              placeholder="Enter course title"
              className="w-full border border-gray-300 bg-neutral-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block  text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={user?.email}
              placeholder="Enter course title"
              className="w-full border border-gray-300 bg-neutral-100 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Image URL */}
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              User Image URL
            </label>
            <input
              type="text"
              name="UserImage"
              value={user?.photoURL}
              placeholder="Paste image URL"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-col gap-2 md:flex-row">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              placeholder="e.g. Web Development"
              className="w-full bg-neutral-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              rating
            </label>
            <input
              type="number"
              name="rating"
              placeholder="Enter rating"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              level
            </label>
            <input
              type="text"
              name="level"
              placeholder="Enter level"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold mb-2">
              instructor
            </label>
            <input
              type="text"
              name="instructor"
              placeholder="Enter level"
              className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            placeholder="Write a short description"
            className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none resize-none"
          ></textarea>
        </div>

        {/* Featured Checkbox */}
        <div className="flex items-center">
          <input
            type="checkbox"
            name="isFeatured"
            className="h-5 w-5 text-purple-600 border-gray-300 focus:ring-purple-500"
          />
          <label className="ml-2 text-gray-700">Mark as Featured</label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-all"
        >
          Submit Course
        </button>
      </form>
    </div>
  );
};

export default AddCourses;
