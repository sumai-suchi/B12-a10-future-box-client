import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";
import useAxios from "../../hook/useAxios";

const Register = () => {
  const { SignUpWithEmailPassword, UpdateUser, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const axiosInstance = useAxios();

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setSelectedFile(file); // store the actual File object
  setFileName(file.name);
  const reader = new FileReader();
  reader.onload = (ev) => setPhotoPreview(ev.target.result); // only for preview
  reader.readAsDataURL(file);
};

  const handleOnSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  const email = e.target.email.value;
  const password = e.target.password.value;
  const name = e.target.name.value;

  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  if (!passwordRegex.test(password)) {
    setError("Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.");
    setLoading(false);
    return;
  }

  try {
    let photoURL = "";

    // Upload image to imgbb if a file was selected
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const imgData = await imgRes.json();

      if (!imgData.success) throw new Error("Image upload failed.");
      photoURL = imgData.data.url;
    }

    await SignUpWithEmailPassword(email, password, photoURL, name);
    await UpdateUser({ displayName: name, photoURL });

    const userInfo = { email, password, photoURL, name };
    const res = await axiosInstance.post("/users", userInfo);
    console.log("Student enrolled successfully:", res.data);

    e.target.reset();
    setPhotoPreview(null);
    setFileName("");
    setSelectedFile(null);
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
    <div className="relative w-full min-h-screen bg-[#060913] text-slate-300 font-sans antialiased flex flex-col overflow-hidden selection:bg-indigo-500/30 selection:text-white">

      {/* Ambient glows */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-gradient-to-bl from-indigo-600/10 via-violet-500/5 to-transparent blur-[130px] pointer-events-none translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-cyan-500/5 via-indigo-600/5 to-transparent blur-[110px] pointer-events-none -translate-x-1/4 translate-y-1/4" />

      {/* Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-5 flex justify-between items-center border-b border-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <span className="text-sm font-bold text-white tracking-tight">EduSphere</span>
        </div>
        <p className="text-xs text-slate-500">
          Already studying with us?{" "}
          <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold border-b border-indigo-400/30 transition-colors">Sign in</Link>
        </p>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Hero */}
        <div className="hidden lg:block space-y-5 max-w-lg">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Next cohort starts tomorrow
          </span>
          <h2 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-[1.15]">
            Master the skills<br />demanded by <span className="text-indigo-400">today's industry.</span>
          </h2>
          <p className="text-slate-500 text-sm leading-relaxed">
            Gain immediate access to interactive masterclasses, peer code reviews, step-by-step tracks, and a global community of learners and mentors.
          </p>
          <div className="grid grid-cols-3 gap-px bg-white/5 rounded-xl overflow-hidden">
            {[["140+","Expert-led tracks"],["24/7","Mentor assistance"],["84k+","Active alumni"]].map(([n,l]) => (
              <div key={l} className="bg-white/[0.02] px-4 py-4 text-center">
                <span className="text-white text-xl font-extrabold block">{n}</span>
                <span className="text-slate-600 text-xs mt-1 block">{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Form */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-[460px] bg-gradient-to-b from-[#0f1423]/90 to-[#080b16]/90 border border-indigo-500/10 rounded-2xl p-7 shadow-2xl shadow-black/60 relative backdrop-blur-xl">
            <div className="absolute top-0 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            <h1 className="text-xl font-extrabold text-white mb-1">Create student profile</h1>
            <p className="text-xs text-slate-500 mb-6">Register your account to begin tracking your learning milestones.</p>

            {/* Google */}
            <button onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.08] hover:border-white/[0.14] text-slate-200 text-sm font-medium rounded-xl py-3 transition-all cursor-pointer">
              <svg width="17" height="17" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Sign up with Google
            </button>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] font-bold tracking-widest text-slate-600 uppercase">Or use email</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            <form onSubmit={handleOnSubmit} className="space-y-3.5">
              {/* Name + Email row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input type="text" name="name" required placeholder="Alex Mercer"
                    className="w-full bg-[#05080f]/80 border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/[0.08] transition-all" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" name="email" required placeholder="alex@example.com"
                    className="w-full bg-[#05080f]/80 border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/[0.08] transition-all" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
                <input type="password" name="password" required placeholder="Min 6 chars, upper + lowercase"
                  className="w-full bg-[#05080f]/80 border border-white/[0.07] rounded-xl px-3 py-2.5 text-sm text-white placeholder-slate-700 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/[0.08] transition-all" />
              </div>

              {/* Image picker */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Profile Photo</label>
                <input ref={fileInputRef} type="file" name="photoFile" accept="image/*" className="hidden" onChange={handleFileChange} />
                <button type="button" onClick={() => fileInputRef.current.click()}
                  className="w-full flex items-center gap-3 bg-indigo-500/[0.03] hover:bg-indigo-500/[0.07] border border-dashed border-indigo-500/25 hover:border-indigo-500/45 rounded-xl px-3.5 py-3 transition-all cursor-pointer text-left">
                  <div className="w-11 h-11 rounded-full border-2 border-indigo-500/20 bg-indigo-500/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {photoPreview
                      ? <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      : <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium">
                      {fileName ? <span className="text-indigo-400 truncate block">{fileName}</span> : "Choose a profile picture"}
                    </p>
                    <p className="text-[10px] text-slate-600 mt-0.5">JPG, PNG or WebP — max 5 MB</p>
                  </div>
                  <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md flex-shrink-0">Browse</span>
                </button>
              </div>

              {error && (
                <div className="bg-rose-500/5 border border-rose-500/15 rounded-xl p-3 text-xs text-rose-400 leading-relaxed">
                  {error}
                </div>
              )}

              <button type="submit" disabled={loading}
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm rounded-xl py-3 shadow-lg shadow-indigo-600/10 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none mt-1">
                {loading ? "Creating your workspace…" : "Create Account & Explore"}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-5 lg:hidden">
              Already have an account? <Link to="/login" className="text-indigo-400 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-5 flex flex-wrap justify-between items-center gap-2 border-t border-white/[0.03]">
        <p className="text-[11px] text-slate-800">&copy; 2026 EduSphere Academy. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="#privacy" className="text-[11px] text-slate-800 hover:text-slate-500 transition-colors">Privacy Policy</a>
          <a href="#terms" className="text-[11px] text-slate-800 hover:text-slate-500 transition-colors">Terms of Enrollment</a>
        </div>
      </footer>
    </div>
  );
};

export default Register;