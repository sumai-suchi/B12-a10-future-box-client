import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";

const CurriculumBlueprintSection = () => {
  const { config } = useAnimation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: config?.reducedMotion ? 0 : 0.06 }
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

  const pillars = [
    {
      code: "STACK_01",
      title: "Core Full-Stack Architecture",
      subtitle: "Production Engines",
      desc: "Master high-performance rendering engines, state management matrices, and scalable serverless edge deployment layers.",
      tag: "FRONTEND + BACKEND",
      accent: "border-cyan-500/20 text-[#00F0FF] bg-cyan-950/20"
    },
    {
      code: "STACK_02",
      title: "Algorithmic Engineering",
      subtitle: "Logic & Data Systems",
      desc: "Deep dive into real-time complex data structures, optimized lookup matrices, and robust pipeline optimization models.",
      tag: "COMPUTATION SYSTEMS",
      accent: "border-purple-500/20 text-[#B266FF] bg-purple-950/20"
    },
    {
      code: "STACK_03",
      title: "AI Integration Engineering",
      subtitle: "Cognitive Application Layers",
      desc: "Learn to safely train, wire, and deploy custom vector contexts, LLM models, and cognitive multi-agent logic layers.",
      tag: "ARTIFICIAL INTELLIGENCE",
      accent: "border-emerald-500/20 text-emerald-400 bg-emerald-950/20"
    }
  ];

  return (
    <section className="w-full bg-[#0B0C10] text-white py-24 px-6 lg:px-16 border-t border-slate-900 overflow-hidden antialiased">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-slate-900 pb-8">
          <div className="space-y-1">
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#00F0FF] uppercase font-mono">
              Learning Blueprint
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
              Curriculum Core Specializations
            </h2>
          </div>
          <div className="text-[11px] font-mono text-slate-500 tracking-wider">
            // CURRICULUM_VERSION_4.2
          </div>
        </div>

        {/* PILLARS BENTO GRID */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.code}
              variants={itemVariants}
              className="rounded-2xl border border-slate-900 bg-[#12141C] p-6 flex flex-col justify-between h-[280px] relative group hover:border-slate-800 transition-all duration-300"
            >
              <div className="space-y-4">
                {/* Meta Row */}
                <div className="flex items-center justify-between font-mono text-[10px]">
                  <span className="text-slate-500 font-bold">{pillar.code}</span>
                  <span className={`px-2 py-0.5 rounded font-black tracking-wider uppercase border ${pillar.accent}`}>
                    {pillar.tag}
                  </span>
                </div>

                {/* Typography Wrapper */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono font-medium text-slate-400 block uppercase tracking-wide">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-base font-bold tracking-wide text-white group-hover:text-[#00F0FF] transition-colors font-sans">
                    {pillar.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-400 font-sans font-medium leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              {/* Bottom Decorative Technical Tracker */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-950 font-mono text-[10px] text-slate-500">
                <span>SYSTEM_READY</span>
                <span className="group-hover:text-white transition-colors duration-200">View Syllabus ➔</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CurriculumBlueprintSection;