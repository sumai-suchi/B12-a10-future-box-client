import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";

const UpdateData = () => {
  const { id } = useParams();
  const [OneData, setOneData] = useState({});

  useEffect(() => {
    const FetchData = async () => {
      const DetailsCourseData = await axios.get(
        `http://localhost:3000/updateData/${id}`
      );
      setOneData(DetailsCourseData.data);
    };
    FetchData();
  }, [id]);
  console.log(OneData);
  console.log(OneData.title);

  const [title, setTitle] = useState(OneData.title || "");
  const [image, setImage] = useState(OneData.image || "");
  const [price, setPrice] = useState(OneData.price || "");
  const [duration, setDuration] = useState(OneData.duration || "");
  const [category, setCategory] = useState(OneData.category || "");
  const [description, setDescription] = useState(OneData.description || "");
  const [Error, setError] = useState("");
  console.log(title, image, price, duration, category, description);
  //   const updatedInfo = { title, image, price, duration, category, description };
  const updatedInfo = {
    title,
    image,
    price,
    duration,
    category,
    description,
  };

  const handleUpdateData = async (e) => {
    e.preventDefault();

    try {
      const updateDoc = await axios.patch(
        `http://localhost:3000/updateData/${id}`,
        updatedInfo
      );
      console.log(updateDoc.data);
    } catch (error) {
      setError(error);
      toast(`${Error}`);
    }
  };

  console.log(id);
  return (
    <div>
      <div className=" w-full mt-20 opacity-70 flex items-center justify-center p-2 md:p-6">
        <form
          className="bg-neutral-50  shadow-2xl rounded-2xl p-8 w-full space-y-6"
          onSubmit={handleUpdateData}
        >
          <h2 className="text-3xl font-bold text-center text-gray-800">
            Update Your Course Data
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
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter course title"
                defaultValue={OneData?.title}
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
                onChange={(e) => setImage(e.target.value)}
                placeholder="Paste image URL"
                defaultValue={OneData?.image}
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
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter price"
                defaultValue={OneData?.price}
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
                onChange={(e) => setDuration(e.target.value)}
                defaultValue={OneData?.duration}
                placeholder="e.g. 6 weeks"
                className="w-full border bg-neutral-100 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
                required
              />
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={OneData?.category}
              placeholder="e.g. Web Development"
              className="w-full bg-neutral-100 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={OneData?.description}
              onChange={(e) => setDescription(e.target.value)}
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
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateData;
