import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

const Login = () => {
  const { SignIn, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

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
          theme: "light",
        });
        navigate(location.state || "/");
      })
      .catch((error) => {
        toast(`${error.message}`, {
          position: "top-right",
          autoClose: 5000,
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
    <div className="w-full min-h-screen bg-[#070814] text-white flex items-center justify-center p-6 md:p-12 font-sans selection:bg-purple-500">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Marketing Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161933] border border-[#23295c]">
            <span className="w-2 h-2 rounded-full bg-[#4d64e8] animate-pulse"></span>
            <span className="text-xs text-[#7e87c4] font-medium">Welcome Back</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Master the skills demanded by{" "}
            <span className="text-[#6366f1] bg-clip-text">today's industry.</span>
          </h1>

          <p className="text-[#72779b] text-base md:text-lg max-w-xl leading-relaxed">
            Gain immediate access to interactive masterclasses, peer code reviews, step-by-step
            tracks, and a global community of learners and mentors.
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md bg-[#0d0f22] p-4 rounded-xl border border-[#161933]">
            <div className="text-center border-r border-[#161933]">
              <div className="text-xl md:text-2xl font-bold">140+</div>
              <div className="text-xs text-[#525885]">Expert-led tracks</div>
            </div>
            <div className="text-center border-r border-[#161933]">
              <div className="text-xl md:text-2xl font-bold">24/7</div>
              <div className="text-xs text-[#525885]">Mentor assistance</div>
            </div>
            <div className="text-center">
              <div className="text-xl md:text-2xl font-bold">84k+</div>
              <div className="text-xs text-[#525885]">Active alumni</div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="lg:col-span-5 bg-[#0a0c1b] border border-[#141833] rounded-2xl p-8 shadow-2xl w-full max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-1">Sign in to profile</h2>
            <p className="text-xs text-[#525885]">Welcome back! Log in to keep tracking your learning milestones.</p>
          </div>

          {/* Google Login Button */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-[#11142b] border border-[#1d2247] hover:bg-[#161a38] text-white font-medium text-sm py-3 px-4 rounded-xl transition duration-200 cursor-pointer"
          >
            <svg aria-label="Google logo" width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
            Sign up with Google
          </button>

          {/* Divider */}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-[#131730]"></div>
            <span className="flex-shrink mx-4 text-[10px] uppercase font-bold tracking-widest text-[#3b4168]">Or use email</span>
            <div className="flex-grow border-t border-[#131730]"></div>
          </div>

          {/* Form Credentials */}
          <form onSubmit={handleOnSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#525885] mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full bg-[#070814] border border-[#141833] rounded-xl px-4 py-3 text-sm text-white placeholder-[#2b3052] focus:outline-none focus:border-[#4d64e8] transition"
                placeholder="volunteer@demo.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#525885] mb-2">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full bg-[#070814] border border-[#141833] rounded-xl px-4 py-3 text-sm text-white placeholder-[#2b3052] focus:outline-none focus:border-[#4d64e8] transition"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-[#6366f1] hover:bg-[#5053dd] text-white font-semibold text-sm py-3 px-4 rounded-xl shadow-lg shadow-indigo-600/20 transition duration-200 cursor-pointer"
            >
              Sign In & Explore
            </button>
          </form>

          {/* Toggle Link to Register Page */}
          <div className="text-center mt-6 pt-4 border-t border-[#131730]">
            <p className="text-xs text-[#525885]">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-[#6366f1] hover:text-[#5053dd] font-semibold transition duration-150 ml-1"
              >
                Create an account
              </Link>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;