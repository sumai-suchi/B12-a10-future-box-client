import { CheckCircle } from "lucide-react";
import Title from "./Title";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const WhyUsSection = () => {
  const instructorFeatures = [
    "Vetted industry veterans with 5+ years coding experience.",
    "Interactive code-along sessions during every class.",
    "1-on-1 personalized project debugging reviews.",
    "Direct communication channels through priority workspace channels."
  ];

  const courseFeatures = [
    "Syllabi built dynamically from current tech stacks.",
    "Comprehensive source-code libraries provided per module.",
    "Capstones modeled after real enterprise technical challenges.",
    "Access to exclusive beta workshops on emerging frame updates."
  ];

  const flexibleFeatures = [
    "Lifetime dashboard access to self-paced stream recording assets.",
    "Flexible modular tracks designed around professional schedules.",
    "Cross-device terminal platforms for sandbox code testing anywhere.",
    "Pause, resume, or switch active cohort schedules seamlessly."
  ];

  const certifiedFeatures = [
    "Cryptographically verifiable graduation credentials.",
    "Direct automated routing profiles straight to partnering teams.",
    "Sharable dynamic portfolio project pages with live source proof.",
    "Exclusive alumni network authorization keys upon module validation."
  ];

  useEffect(() => {
    Aos.init({
      duration: 800,
      easing: "ease-out",
      once: true,
    });
  }, []);

  return (
    <div className="w-full bg-[#0B0C10] text-white py-24 border-t border-slate-900/60 relative overflow-hidden antialiased">
      {/* Background Ambience Layer - Clean Unified Cyan Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#00F0FF]/3 blur-[130px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16">
        <div className="mb-16">
          <Title title={"Why Us!!"} />
        </div>
        
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          
          {/* Card 1: Professional Instructors */}
          <div
            className="bg-[#12141C] rounded-2xl border border-slate-900/80 p-8 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)] transition-all duration-300 relative group"
            data-aos="fade-up"
            data-aos-delay="50"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-slate-500 font-bold tracking-wider">// SYSTEM_FACULTY</span>
              <span className="text-[9px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/10 px-2 py-0.5 rounded">SYS_01</span>
            </div>
            
            <h2 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-[#00F0FF] transition-colors duration-200">
              PROFESSIONAL INSTRUCTORS
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
              Learn from professional instructors with years of experience who
              guide you step-by-step through real-world lessons designed to help
              you grow your skills confidently.
            </p>

            <ul className="space-y-3.5 border-t border-slate-950 pt-5">
              {instructorFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 font-sans text-xs font-medium leading-relaxed">
                  <span className="font-mono text-[#00F0FF] text-[11px] font-bold mt-0.5 select-none">[//]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Complete & Special Courses */}
          <div
            className="bg-[#12141C] rounded-2xl border border-slate-900/80 p-8 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)] transition-all duration-300 relative group"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-slate-500 font-bold tracking-wider">// CORE_CURRICULUM</span>
              <span className="text-[9px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/10 px-2 py-0.5 rounded">SYS_02</span>
            </div>

            <h2 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-[#00F0FF] transition-colors duration-200">
              COMPLETE & SPECIAL COURSES
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
              Our special courses are designed for all levels — from beginners
              to advanced learners. Each course is structured to make learning
              fun, interactive, and goal-oriented.
            </p>

            <ul className="space-y-3.5 border-t border-slate-950 pt-5">
              {courseFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 font-sans text-xs font-medium leading-relaxed">
                  <span className="font-mono text-[#00F0FF] text-[11px] font-bold mt-0.5 select-none">[//]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 3: Flexible Learning */}
          <div
            className="bg-[#12141C] rounded-2xl border border-slate-900/80 p-8 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)] transition-all duration-300 relative group"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-slate-500 font-bold tracking-wider">// CHRONO_SCHEDULING</span>
              <span className="text-[9px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/10 px-2 py-0.5 rounded">SYS_03</span>
            </div>

            <h2 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-[#00F0FF] transition-colors duration-200">
              FLEXIBLE LEARNING
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
              Learn at your own pace with flexible schedules and resources that
              allow you to balance learning with daily life without dropping production targets.
            </p>
            
            <ul className="space-y-3.5 border-t border-slate-950 pt-5">
              {flexibleFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 font-sans text-xs font-medium leading-relaxed">
                  <span className="font-mono text-[#00F0FF] text-[11px] font-bold mt-0.5 select-none">[//]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 4: Certified Courses */}
          <div
            className="bg-[#12141C] rounded-2xl border border-slate-900/80 p-8 hover:border-[#00F0FF]/30 hover:shadow-[0_0_30px_rgba(0,240,255,0.03)] transition-all duration-300 relative group"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-[9px] text-slate-500 font-bold tracking-wider">// VERIFIED_CREDENTIAL</span>
              <span className="text-[9px] font-mono font-bold text-[#00F0FF] bg-[#00F0FF]/5 border border-[#00F0FF]/10 px-2 py-0.5 rounded">SYS_04</span>
            </div>

            <h2 className="text-lg font-bold text-white mb-3 tracking-wide group-hover:text-[#00F0FF] transition-colors duration-200">
              CERTIFIED COURSES
            </h2>
            <p className="text-slate-400 text-xs leading-relaxed mb-6 font-sans font-medium">
              Earn certificates to showcase your skills and achievements,
              helping you grow professionally and transparently verify engineering capacities.
            </p>
            
            <ul className="space-y-3.5 border-t border-slate-950 pt-5">
              {certifiedFeatures.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-slate-300 font-sans text-xs font-medium leading-relaxed">
                  <span className="font-mono text-[#00F0FF] text-[11px] font-bold mt-0.5 select-none">[//]</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </section>
      </div>
    </div>
  );
};

export default WhyUsSection;