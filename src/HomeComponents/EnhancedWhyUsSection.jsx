import { motion } from "framer-motion";
import { useAnimation } from "../context/AnimationProvider";
import EnhancedTitle from "./EnhancedTitle";
import {
  CheckCircleIcon,
  AcademicCapIcon,
  ClockIcon,
  TrophyIcon,
  UserGroupIcon,
  LightBulbIcon,
  ShieldCheckIcon,
  RocketLaunchIcon
} from "@heroicons/react/24/outline";

const EnhancedWhyUsSection = () => {
  const { config } = useAnimation();

  const features = [
    "100% engaging and practical lessons",
    "Personalized learning paths for each student",
    "Hands-on projects and real-world examples",
    "Community support and mentorship access"
  ];

  const whyUsCards = [
    {
      title: "Expert Instructors",
      description: "Learn from professional instructors with years of experience who guide you step-by-step through real-world lessons designed to help you grow your skills confidently.",
      icon: AcademicCapIcon,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50",
      darkBgGradient: "from-emerald-900/20 to-teal-900/20",
      borderColor: "border-emerald-200/50 dark:border-emerald-700/50"
    },
    {
      title: "Complete Courses",
      description: "Our special courses are designed for all levels — from beginners to advanced learners. Each course is structured to make learning fun, interactive, and goal-oriented.",
      icon: TrophyIcon,
      gradient: "from-violet-500 to-purple-600",
      bgGradient: "from-violet-50 to-purple-50",
      darkBgGradient: "from-violet-900/20 to-purple-900/20",
      borderColor: "border-violet-200/50 dark:border-violet-700/50"
    },
    {
      title: "Flexible Learning",
      description: "Learn at your own pace with flexible schedules and resources that allow you to balance learning with daily life while achieving your goals.",
      icon: ClockIcon,
      gradient: "from-rose-500 to-pink-600",
      bgGradient: "from-rose-50 to-pink-50",
      darkBgGradient: "from-rose-900/20 to-pink-900/20",
      borderColor: "border-rose-200/50 dark:border-rose-700/50"
    },
    {
      title: "Certified Courses",
      description: "Earn certificates to showcase your skills and achievements, helping you grow professionally and stand out in your career journey.",
      icon: ShieldCheckIcon,
      gradient: "from-amber-500 to-orange-600",
      bgGradient: "from-amber-50 to-orange-50",
      darkBgGradient: "from-amber-900/20 to-orange-900/20",
      borderColor: "border-amber-200/50 dark:border-amber-700/50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: config.reducedMotion ? 0 : 0.1,
        delayChildren: config.reducedMotion ? 0 : 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: config.reducedMotion ? 0.1 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const iconVariants = {
    hover: {
      scale: config.reducedMotion ? 1 : 1.1,
      rotate: config.reducedMotion ? 0 : 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-blue-900/30 dark:to-indigo-900/50 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-cyan-200/20 to-blue-300/20 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-indigo-200/20 to-purple-300/20 rounded-full blur-2xl"
          animate={{
            x: [0, -25, 0],
            y: [0, 15, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: config.reducedMotion ? 0 : 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Enhanced Title */}
        <EnhancedTitle
          title="Why Choose Us?"
          subtitle="Discover what makes our learning platform the perfect choice for your educational journey"
          badge="🌟 Student Favorite"
        />

        {/* Cards Grid */}
        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {whyUsCards.map((card, index) => (
            <motion.div
              key={card.title}
              className={`group relative bg-gradient-to-br ${card.bgGradient} dark:${card.darkBgGradient} backdrop-blur-xl rounded-3xl shadow-xl border ${card.borderColor} p-8 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
              variants={cardVariants}
              whileHover={config.reducedMotion ? {} : { y: -8, scale: 1.02 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              </div>

              {/* Icon */}
              <motion.div
                className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${card.gradient} rounded-2xl shadow-lg mb-6 relative z-10`}
              >
                <card.icon className="w-8 h-8 text-white" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.h3
                  className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-4 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  {card.title}
                </motion.h3>

                <motion.p
                  className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                >
                  {card.description}
                </motion.p>

                {/* Features List */}
                <motion.ul
                  className="space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.5 }}
                >
                  {features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-start space-x-3 text-slate-700 dark:text-slate-300"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.6 + featureIndex * 0.1 }}
                    >
                      <motion.div
                        whileHover={config.reducedMotion ? {} : { scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CheckCircleIcon className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      </motion.div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-br from-white/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: config.reducedMotion ? 0 : 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Section */}
        <motion.div
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: config.reducedMotion ? 0.1 : 0.8, delay: 0.5 }}
        >
          {[
            { icon: UserGroupIcon, number: "50K+", label: "Happy Students", color: "from-emerald-400 to-teal-500" },
            { icon: AcademicCapIcon, number: "1000+", label: "Courses Available", color: "from-blue-400 to-cyan-500" },
            { icon: TrophyIcon, number: "95%", label: "Success Rate", color: "from-amber-400 to-orange-500" },
            { icon: RocketLaunchIcon, number: "24/7", label: "Support Available", color: "from-violet-400 to-purple-500" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-slate-700/20 shadow-lg group"
              whileHover={config.reducedMotion ? {} : { y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 shadow-lg`}
              >
                <stat.icon className="w-6 h-6 text-white" />
              </motion.div>
              <motion.div
                className="text-2xl font-black text-slate-800 dark:text-slate-200 mb-1"
              >
                {stat.number}
              </motion.div>
              <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedWhyUsSection;