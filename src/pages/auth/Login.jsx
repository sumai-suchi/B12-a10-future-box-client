import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
  const { SignIn } = useContext(AuthContext);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    SignIn(email, password)
      .then((user) => {
        console.log(user);
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
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                placeholder="Email"
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
        </div>
      </div>
    </div>
  );
};

export default Login;
