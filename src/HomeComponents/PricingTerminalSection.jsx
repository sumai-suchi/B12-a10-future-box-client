import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";

const PricingTerminalSection = () => {
  const { config } = useAnimation();

  return (
    <section className="w-full bg-[#0B0C10] text-white py-24 px-6 lg:px-16 border-t border-slate-900/60 overflow-hidden antialiased">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Typography Title Section Header alignment */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#B266FF] font-mono uppercase">
            Access Tokens
          </span>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
            Choose Your Authorization Level
          </h2>
        </div>

        {/* Pricing Table Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* Base Tier 1 Pass Card */}
          <motion.div 
            className="bg-[#12141C] border border-slate-900 rounded-2xl p-8 flex flex-col justify-between"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: config?.reducedMotion ? 0.1 : 0.4 }}
          >
            <div className="space-y-5">
              <div className="text-[10px] font-mono font-bold text-slate-500 tracking-wider uppercase">
                SINGLE_TRACK_PASS
              </div>
              <div className="text-3xl font-bold tracking-tight text-white">
                $49<span className="text-xs text-slate-500 font-mono font-normal"> / course</span>
              </div>
              <div className="h-[1px] bg-slate-950 w-full" />
              <ul className="space-y-3 text-xs text-slate-400 font-mono">
                <li className="flex items-center gap-2">+ Lifetime dynamic curriculum access</li>
                <li className="flex items-center gap-2">+ Standard browser container runtime</li>
                <li className="flex items-center gap-2">+ Automated core terminal testing</li>
              </ul>
            </div>
            
            <motion.button 
              className="mt-8 w-full py-3 bg-transparent border border-slate-800 hover:border-slate-700 text-white rounded-lg text-[11px] font-bold uppercase tracking-widest font-mono transition-colors duration-200"
              whileTap={config?.reducedMotion ? {} : { scale: 0.98 }}
            >
              Initialize Pass
            </motion.button>
          </motion.div>

          {/* Premium Tier 2 All-Access Token Matrix Card */}
          <motion.div 
            className="bg-[#12141C] border border-cyan-500/30 rounded-2xl p-8 flex flex-col justify-between relative shadow-[0_0_50px_rgba(0,240,255,0.01)]"
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: config?.reducedMotion ? 0.1 : 0.4 }}
          >
            {/* Visual Callout Pill Component tag asset overlay */}
            <div className="absolute -top-3 right-6 bg-[#00F0FF] text-[#0B0C10] font-mono font-black text-[9px] px-2.5 py-0.5 rounded uppercase tracking-wider">
              Recommended
            </div>
            
            <div className="space-y-5">
              <div className="text-[10px] font-mono font-bold text-[#00F0FF] tracking-wider uppercase">
                ALL_ACCESS_MATRIX
              </div>
              <div className="text-3xl font-bold tracking-tight text-white">
                $29<span className="text-xs text-slate-500 font-mono font-normal"> / month</span>
              </div>
              <div className="h-[1px] bg-slate-950 w-full" />
              <ul className="space-y-3 text-xs text-slate-300 font-mono">
                <li className="text-[#00F0FF] flex items-center gap-2">+ Unlock all current & future courses</li>
                <li className="flex items-center gap-2">+ Premium continuous sandbox runs</li>
                <li className="flex items-center gap-2">+ Personal AI Mentor systems integrated</li>
                <li className="flex items-center gap-2">+ Priority beta sandbox features</li>
              </ul>
            </div>
            
            <motion.button 
              className="mt-8 w-full py-3 bg-[#00F0FF] hover:bg-cyan-300 text-[#0B0C10] rounded-lg text-[11px] font-black uppercase tracking-widest font-sans transition-colors duration-200"
              whileTap={config?.reducedMotion ? {} : { scale: 0.98 }}
            >
              Gain Full Access
            </motion.button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default PricingTerminalSection;