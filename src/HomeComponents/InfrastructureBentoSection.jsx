import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";

const LearningMethodologySection = () => {
  const { config } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: config?.reducedMotion ? 0 : 0.08 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: config?.reducedMotion ? 0.1 : 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="w-full bg-[#0B0C10] text-white py-24 px-6 lg:px-16 border-t border-slate-900 overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-900 pb-8">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00F0FF] uppercase font-mono">
              The Ecosystem
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              How You Learn on Future Box
            </h2>
          </div>
          <div className="text-[11px] font-mono text-slate-500 tracking-wider">
            // ACTIVE_METHODOLOGY_ENGINE
          </div>
        </div>

        {/* ASYMMETRICAL BENTO GRID */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          
          {/* FEATURE 01: HERO CARD (Takes up 2 columns for massive impact) */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-[#12141C] p-8 flex flex-col justify-between h-[340px] group transition-all duration-300 hover:border-cyan-400/40"
          >
            {/* Embedded Graphic Layer Simulation */}
            <div className="absolute inset-y-0 right-0 w-1/2 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none hidden md:block">
              <div className="w-full h-full bg-gradient-to-l from-[#12141C] via-transparent to-[#12141C] absolute inset-0 z-10" />
              <div className="w-full h-full font-mono text-[10px] text-[#00F0FF] p-6 overflow-hidden leading-relaxed select-none">
                {`const initializeSandbox = async () => {\n  const box = await FutureBox.createContainer();\n  await box.mountFileSystem();\n  box.startLiveDebugger();\n};`}
              </div>
            </div>

            <div className="space-y-4 max-w-md relative z-10">
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-black tracking-wider font-mono uppercase bg-cyan-950/40 text-[#00F0FF] border border-cyan-500/20">
                  01 / LIVE PLAYGROUND
                </span>
              </div>

              <h3 className="text-lg font-bold tracking-tight text-white pt-2 font-sans">
                Zero-Setup Interactive Sandboxes
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium font-sans">
                No more wasting hours setting up your local computer, installation paths, or missing tools. Click any course chapter and a fully built, containerized code environment spins up directly in your browser tab in under a second.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4 font-mono text-[10px] text-slate-500 relative z-10">
              <span>CONTAINER_STATUS: ACTIVE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </motion.div>

          {/* FEATURE 02: GUIDED AI COACH (Stays locked as side tile) */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl border border-slate-900 bg-[#12141C] p-6 flex flex-col justify-between h-[340px] group hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between font-mono text-[10px]">
                <span className="text-slate-500 font-bold">02 / MENTORSHIP</span>
                <span className="px-2 py-0.5 rounded font-black tracking-wider uppercase border border-purple-500/20 text-[#B266FF] bg-purple-950/20">
                  REALTIME SYNCHRONIZED
                </span>
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-bold tracking-wide text-white group-hover:text-[#B266FF] transition-colors font-sans">
                  Dynamic Adaptive AI Co-Pilot
                </h3>
              </div>

              <p className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                Stuck on a challenging programming loop? Our AI companion continuously matches your learning speed, giving you smart hits, structural code traces, and custom micro-challenges without handing over the direct answer.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-950/40 font-mono text-[10px] text-slate-500">
              <span>// INTEGRITY_TRACE_READY</span>
            </div>
          </motion.div>

          {/* FEATURE 03: VERIFIABLE PORFOLIO TILES (Full bottom row alignment anchor) */}
          <motion.div 
            variants={itemVariants}
            className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl border border-slate-900 bg-[#12141C] p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group hover:border-emerald-500/20 transition-all duration-300"
          >
            <div className="space-y-2 max-w-xl relative z-10">
              <span className="text-[10px] font-bold tracking-widest text-emerald-400 font-mono uppercase">
                03 / CREDENTIAL ENGINE
              </span>
              <h3 className="text-sm font-bold text-white tracking-wide font-sans group-hover:text-emerald-400 transition-colors">
                Production-Ready Portfolio Exports
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-medium font-sans">
                Every line of code you submit streams directly into real GitHub repositories. Instead of useless multi-choice test certificates, you graduate with live, web-hosted web applications to showcase directly to hiring teams.
              </p>
            </div>

            <div className="relative z-10 shrink-0 font-mono text-[11px] text-slate-400">
              <span className="text-slate-600 mr-2">GIT_PUSH //</span> COMPLETED
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default LearningMethodologySection;