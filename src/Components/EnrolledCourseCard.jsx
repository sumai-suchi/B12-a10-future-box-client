const EnrolledCourseCard = ({ data }) => {
  console.log(data);
  const {
    category,
    description,

    email,
    image,
    instructor,

    price,
    title,
  } = data;

  return (
    <div className="w-10/12 mx-auto opacity-80 p-2 md:p-9  bg-fuchsia-200 rounded-2xl flex flex-col md:flex-row  justify-between">
      <div className="flex-1">
        <h1 className=" my-2 text-lg md:text-2xl font-semibold">{category}</h1>
        <img src={image} className="w-96 h-48" alt="" />
        <p className="w-full text-xs md:text-sm md:w-96 text-gray-600">
          {description.slice(0, 130) + "..."}
        </p>
      </div>
      <div className="flex flex-1 flex-col flex-left justify-center">
        <h1 className="text-lg md:text-xl font-semibold">Title:{title}</h1>
        <h1 className="text-sm md:text-lg ">Instructor:{instructor}</h1>
        <h1 className="text-sm md:text-lg ">Price:{price}</h1>
        <h1 className="text-sm md:text-lg ">email:{email}</h1>
        <button className="bg-fuchsia-700  text-white my-3 py-2 rounded-2xl">
          Start
        </button>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;
