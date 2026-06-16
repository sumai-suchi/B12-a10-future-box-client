import { FaXTwitter, FaYoutube, FaFacebookF, FaLinkedinIn } from "react-icons/fa6";
import { SparklesIcon, EnvelopeIcon } from "@heroicons/react/24/solid";

const Footer = () => {
  return (
    <div className="w-full bg-slate-950 relative overflow-hidden border-t border-slate-900 selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Decorative Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[30rem] md:w-[45rem] h-[15rem] rounded-full bg-emerald-500/5 blur-[100px] pointer-events-none" />

      <footer className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 xl:gap-12 pb-12 border-b border-slate-900">
          
          {/* BRANDING & NEWSLETTER BLOCK */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                  <SparklesIcon className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-[0.15em] text-white uppercase font-mono leading-none">
                  EduSphere
                </span>
                <span className="text-[9px] text-slate-500 font-bold tracking-widest uppercase mt-1">
                  Future-Box Lab
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Join our advanced ecosystem. Subscribe to receive live terminal updates, newly released tracks, and sandbox framework breakthroughs.
            </p>

            {/* Premium Newsletter Box */}
            <div className="max-w-sm relative group">
              <div className="flex items-center gap-2 bg-slate-900/40 border border-slate-900 rounded-xl p-1.5 focus-within:border-emerald-500/30 transition-all duration-300 backdrop-blur-md">
                <div className="pl-2.5 text-slate-500">
                  <EnvelopeIcon className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  className="bg-transparent border-none outline-none text-xs text-white placeholder-slate-500 grow font-medium py-1"
                  placeholder="Enter developer email"
                />
                <button className="px-3.5 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[11px] font-bold transition-all active:scale-95 cursor-pointer shadow-[0_4px_12px_rgba(16,185,129,0.15)]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC NAVIGATION LINKS LINKS */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* COLUMN 1 */}
            <div className="space-y-4">
              <h6 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] font-mono">
                Ecosystem
              </h6>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Popular Tracks</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Expert Instructors</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Why EduSphere</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Live Sandbox</a></li>
              </ul>
            </div>

            {/* COLUMN 2 */}
            <div className="space-y-4">
              <h6 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] font-mono">
                Services
              </h6>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cloud Architecture</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">UI Matrix Design</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Data Engineering</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Cyber Consulting</a></li>
              </ul>
            </div>

            {/* COLUMN 3 */}
            <div className="space-y-4 col-span-2 sm:col-span-1">
              <h6 className="text-[11px] font-bold text-slate-500 uppercase tracking-[0.15em] font-mono">
                Company
              </h6>
              <ul className="space-y-2.5 text-xs font-medium">
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">About Laboratory</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact Node</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Careers</a></li>
                <li><a href="#" className="text-slate-400 hover:text-emerald-400 transition-colors">Press Kit</a></li>
              </ul>
            </div>

          </div>
        </div>

        {/* BOTTOM METRICS BAR */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] font-medium text-slate-500 order-2 sm:order-1">
            Copyright © {new Date().getFullYear()} — All rights reserved by{" "}
            <span className="text-slate-300 font-bold tracking-wide font-mono">EduSphere Labs</span>
          </p>

          {/* Social Icons Hub */}
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            <a href="#" className="p-2 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:bg-slate-900 transition-all duration-300">
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:bg-slate-900 transition-all duration-300">
              <FaYoutube className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:bg-slate-900 transition-all duration-300">
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="p-2 rounded-lg bg-slate-900/40 border border-slate-900 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/20 hover:bg-slate-900 transition-all duration-300">
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </footer>
    </div>
  );
};

export default Footer;