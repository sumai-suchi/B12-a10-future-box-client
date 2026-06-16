import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router"; 
import useAxios from "../../hook/useAxios";

const Register = () => {
  const { SignUpWithEmailPassword, UpdateUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;
    const name = e.target.name.value;

    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
      setLoading(false);
      return;
    }

    const userInfo = { email, password, photoURL, name };

    try {
      await SignUpWithEmailPassword(email, password, photoURL, name);
      await UpdateUser({
        displayName: name,
        photoURL: photoURL,
      });

      const res = await axiosInstance.post('/users', userInfo);
      console.log("Student enrolled successfully:", res.data);

      e.target.reset();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "An unexpected error occurred during account creation.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-in encountered an issue.");
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060913] text-slate-300 font-sans antialiased flex flex-col justify-between overflow-hidden selection:bg-indigo-500/30 selection:text-white">
      
      {/* Soft Academic Ambient Glow Rings */}
      <div className="absolute top-0 right-0 w-[55vw] h-[55vw] rounded-full bg-gradient-to-bl from-indigo-600/10 via-violet-500/5 to-transparent blur-[130px] pointer-events-none transform translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full bg-gradient-to-tr from-cyan-500/5 via-indigo-600/5 to-transparent blur-[110px] pointer-events-none transform -translate-x-1/4 translate-y-1/4" />
      
      {/* Top Navigation Row */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-sm font-bold tracking-tight text-white">EduSphere</span>
        </div>
        <p className="text-xs text-slate-500">
          Already studying with us?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors font-semibold underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </header>

      {/* Hero Split Space */}
      <main className="relative z-10 my-auto w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-8">
        
        {/* Left Aspect: Value Propositions for Students */}
        <div className="hidden lg:block lg:col-span-6 space-y-6 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            ✨ Next cohort starts tomorrow
          </span>
          <h2 className="text-4xl xl:text-5xl font-bold tracking-tight text-white leading-[1.15]">
            Master the skills demanded by today's industry.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed">
            Gain immediate access to interactive masterclasses, peer code reviews, step-by-step tracks, and a global community of global learners and mentors.
          </p>
          
          <div className="pt-6 grid grid-cols-3 gap-6 text-xs border-t border-slate-900">
            <div>
              <span className="text-white block text-xl font-bold mb-0.5">140+</span> 
              <span className="text-slate-500 font-medium">Expert-led tracks</span>
            </div>
            <div>
              <span className="text-white block text-xl font-bold mb-0.5">24/7</span> 
              <span className="text-slate-500 font-medium">Mentor assistance</span>
            </div>
            <div>
              <span className="text-white block text-xl font-bold mb-0.5">84k+</span> 
              <span className="text-slate-500 font-medium">Active alumni</span>
            </div>
          </div>
        </div>

        {/* Right Aspect: Clean Registration Surface */}
        <div className="col-span-1 lg:col-span-6 flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] bg-gradient-to-b from-[#111625] to-[#0A0D16] border border-slate-800/70 rounded-2xl p-8 shadow-2xl shadow-black/60 relative group">
            
            <div className="mb-6">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
                Create student profile
              </h1>
              <p className="text-xs text-slate-400">
                Register your account to begin tracking your learning milestones.
              </p>
            </div>

            {/* Social Oauth Container */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-[#171E31] hover:bg-[#1E273F] border border-slate-800/80 hover:border-slate-700 text-slate-200 font-medium text-sm rounded-xl py-3 px-4 active:scale-[0.99] transition-all cursor-pointer shadow-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            {/* Split Line Context Divider */}
            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-800/60"></div>
              </div>
              <span className="relative bg-[#111625] px-4 text-[10px] font-bold tracking-wider uppercase text-slate-500">
                Or use email credentials
              </span>
            </div>

            {/* Interactive Form Context */}
            <form onSubmit={handleOnSubmit} className="space-y-4.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 pl-0.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/5"
                    placeholder="Alex Mercer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 pl-0.5">
                    Profile Picture URL
                  </label>
                  <input
                    type="url"
                    name="photoURL"
                    className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/5"
                    placeholder="https://images..."
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 pl-0.5">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/5"
                  placeholder="alex@example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 pl-0.5">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="w-full bg-[#080B14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-600 outline-none transition-all focus:border-indigo-500/60 focus:ring-4 focus:ring-indigo-500/5"
                  placeholder="••••••••"
                />
              </div>

              {/* Dynamic Form Warnings */}
              {error && (
                <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-3.5 text-xs text-rose-400 font-medium leading-relaxed">
                  {error}
                </div>
              )}

              {/* Primary Form Call to Action */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm rounded-xl py-3 px-4 shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:pointer-events-none mt-2"
              >
                {loading ? "Creating your workspace..." : "Create Account & Explore"}
              </button>
            </form>

            {/* Mobile Form Breakpoints Footer */}
            <p className="text-center text-xs text-slate-500 mt-6 lg:hidden">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 font-semibold hover:underline">
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </main>

      {/* Global Meta Footer Links */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-600 gap-2">
        <p>&copy; 2026 EduSphere Academy. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
          <a href="#terms" className="hover:text-slate-400 transition-colors">Terms of Enrollment</a>
        </div>
      </footer>
    </div>
  );
};

export default Register;