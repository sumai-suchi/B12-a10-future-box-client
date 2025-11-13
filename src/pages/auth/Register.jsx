import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Register = () => {
  const { SignUpWithEmailPassword, UpdateUser, signInWithGoogle } =
    useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
    const name = e.target.name.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "password should have one upperCase one lowerCase and 6 in size"
      );
      return;
    }

    SignUpWithEmailPassword(email, password, photoURL, name)
      .then((user) => {
        console.log(user);
        UpdateUser({
          displayName: name,
          photoURL: photoURL,
        })
          .then(() => {
            console.log("updated");
            e.target.reset();
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => console.log(error));
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full flex flex-col bg-linear-to-r from-[#4d64e8]/80 to-[#3b4266]/20  min-h-screen justify-center items-center ">
      <h1 className="font-bold my-2 text-2xl md:text-5xl">Register Here!!!</h1>
      <div className="card  bg-black/50 opacity-85 p-0 w-2xs mx-auto md:w-96  shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <fieldset className="fieldset">
              <label className="label text-white">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <label className="label text-white">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label text-white">photoURL</label>
              <input
                type="url"
                name="photoURL"
                className="input"
                placeholder="photoURL"
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

          <p className="text-xs text-red-600 font-bold">{error ? error : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
