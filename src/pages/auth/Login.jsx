import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { SignIn, signInWithGoogle } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignIn(email, password)
      .then((user) => {
        console.log(user);
        toast("🦄 loggedIn successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        navigate(location.state || "/");
      })
      .catch((error) => {
        toast(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
        toast("User logged in with google");
        navigate(location.state || "/");
      })
      .catch((error) => toast(`${error.message}`));
  };
  return (
    <div className="w-full flex flex-col bg-linear-to-r from-[#4d64e8]/80 to-[#3b4266]/20 min-h-screen justify-center items-center ">
      <h1 className="font-bold my-3 text-3xl md:text-5xl">Login Here!!!</h1>
      <div className="card bg-black/50 opacity-85 p-0 w-8/12 mx-auto md:w-96 shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <fieldset className="fieldset">
              <label className="label text-white">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />

              <label className="label text-white">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>
          <button
            className="btn bg-white text-black border-[#e5e5e5]"
            onClick={handleGoogleLogin}
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
          <div className="flex justify-between ">
            <div></div>
            <NavLink
              to={"/auth/Register"}
              className="text-blue-500 flex  font-semibold items-center justify-center"
            >
              <FaArrowLeft /> go to Register
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
