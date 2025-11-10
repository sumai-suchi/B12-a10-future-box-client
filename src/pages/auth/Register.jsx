import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Register = () => {
  const { SignUpWithEmailPassword, UpdateUser } = useContext(AuthContext);
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
  return (
    <div className=" flex flex-col min-h-screen justify-center items-center ">
      <h1 className="font-bold text-5xl">Register Here!!!</h1>
      <div className="card bg-base-100 p-0 w-96  shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleOnSubmit}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Name"
              />
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
              />
              <label className="label">photoURL</label>
              <input
                type="url"
                name="photoURL"
                className="input"
                placeholder="photoURL"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </form>

          <p className="text-xs text-red-600 font-bold">{error ? error : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
