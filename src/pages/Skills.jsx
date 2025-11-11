import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiServer, FiLayers, FiCpu, FiTool } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Skills = () => {
  const { darkMode } = useTheme();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Skills data
  const skillsCategories = [
    {
      title: 'Frontend',
      icon: <FiLayers className="w-6 h-6" />,
      skills: [
        { name: 'React', level: 95, color: 'from-blue-500 to-cyan-400' },
        { name: 'Next.js', level: 90, color: 'from-gray-800 to-gray-600' },
        { name: 'JavaScript', level: 92, color: 'from-yellow-400 to-yellow-600' },
        { name: 'TypeScript', level: 88, color: 'from-blue-600 to-blue-800' },
        { name: 'HTML5', level: 95, color: 'from-orange-500 to-red-500' },
        { name: 'CSS3/SCSS', level: 90, color: 'from-pink-500 to-purple-600' },
        { name: 'Tailwind CSS', level: 93, color: 'from-cyan-400 to-blue-500' },
        { name: 'Redux', level: 85, color: 'from-purple-500 to-pink-500' },
      ]
    },
    {
      title: 'Backend',
      icon: <FiServer className="w-6 h-6" />,
      skills: [
        { name: 'Node.js', level: 90, color: 'from-green-500 to-emerald-400' },
        { name: 'Express', level: 88, color: 'from-gray-400 to-gray-600' },
        { name: 'Python', level: 85, color: 'from-blue-400 to-indigo-600' },
        { name: 'Django', level: 82, color: 'from-green-600 to-green-800' },
        { name: 'RESTful APIs', level: 90, color: 'from-red-500 to-pink-500' },
        { name: 'GraphQL', level: 80, color: 'from-pink-500 to-purple-600' },
      ]
    },
    {
      title: 'Database',
      icon: <FiDatabase className="w-6 h-6" />,
      skills: [
        { name: 'MongoDB', level: 88, color: 'from-green-500 to-emerald-600' },
        { name: 'PostgreSQL', level: 85, color: 'from-blue-400 to-indigo-600' },
        { name: 'MySQL', level: 83, color: 'from-blue-600 to-blue-800' },
        { name: 'Firebase', level: 80, color: 'from-yellow-500 to-orange-500' },
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: <FiTool className="w-6 h-6" />,
      skills: [
        { name: 'Docker', level: 85, color: 'from-blue-400 to-cyan-500' },
        { name: 'Kubernetes', level: 75, color: 'from-blue-600 to-indigo-700' },
        { name: 'AWS', level: 80, color: 'from-yellow-500 to-orange-500' },
        { name: 'Git', level: 92, color: 'from-orange-500 to-red-600' },
        { name: 'CI/CD', level: 82, color: 'from-green-500 to-emerald-500' },
      ]
    },
    {
      title: 'UI/UX Design',
      icon: <FiLayers className="w-6 h-6" />,
      skills: [
        { name: 'Figma', level: 88, color: 'from-purple-500 to-pink-500' },
        { name: 'Adobe XD', level: 85, color: 'from-pink-500 to-purple-600' },
        { name: 'UI/UX Principles', level: 90, color: 'from-blue-400 to-cyan-500' },
        { name: 'Responsive Design', level: 93, color: 'from-green-500 to-emerald-500' },
      ]
    },
    {
      title: 'Mobile',
      icon: <FiCpu className="w-6 h-6" />,
      skills: [
        { name: 'React Native', level: 85, color: 'from-blue-400 to-cyan-500' },
        { name: 'Flutter', level: 78, color: 'from-blue-500 to-indigo-600' },
        { name: 'iOS Development', level: 70, color: 'from-gray-600 to-gray-800' },
        { name: 'Android Development', level: 72, color: 'from-green-500 to-emerald-500' },
      ]
    }
  ];

  // Active tab state
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section 
      id="skills" 
      className={`py-20 md:py-28 lg:py-36 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}
      ref={ref}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500/10 rounded-full -translate-y-1/2 translate-x-1/2 filter blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-purple-500/10 rounded-full translate-y-1/2 -translate-x-1/2 filter blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="text-center mb-16"
        >
          <motion.span 
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
              darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-800'
            }`}
            variants={item}
          >
            My Skills
          </motion.span>
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            variants={item}
          >
            My <span className="text-blue-500">Technical</span> Skills
          </motion.h2>
          <motion.p 
            className={`max-w-3xl mx-auto text-lg ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}
            variants={item}
          >
            Here's a comprehensive overview of my technical skills and expertise across various technologies and tools.
          </motion.p>
        </motion.div>

        {/* Skills Tabs */}
        <motion.div 
          className="mb-12"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {skillsCategories.map((category, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === index
                    ? darkMode
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-600 text-white'
                    : darkMode
                    ? 'text-gray-300 hover:bg-gray-800'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
                variants={item}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.title}
              </motion.button>
            ))}
          </div>

          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            key={activeTab}
          >
            {skillsCategories[activeTab].skills.map((skill, index) => (
              <motion.div 
                key={index}
                className={`p-6 rounded-xl ${
                  darkMode 
                    ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                    : 'bg-white shadow-lg border border-gray-100'
                }`}
                variants={item}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold">{skill.name}</h3>
                  <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`h-2 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-200'
                }`}>
                  <motion.div
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.1 + (index * 0.05) }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Skills */}
        <motion.div 
          className="mt-20"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.h3 
            className="text-2xl font-bold mb-8 text-center"
            variants={item}
          >
            Additional <span className="text-blue-500">Skills</span>
          </motion.h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'Problem Solving', 'Team Leadership', 'Agile/Scrum', 'Git Workflow',
              'Code Review', 'Technical Writing', 'Mentoring', 'Public Speaking',
              'UI/UX Design', 'Responsive Design', 'Cross-browser', 'Performance',
              'Testing', 'Debugging', 'Security', 'Documentation', 'CI/CD', 'Cloud'
            ].map((skill, index) => (
              <motion.div 
                key={index}
                className={`px-4 py-3 rounded-lg text-center ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700/50' 
                    : 'bg-white shadow border border-gray-100'
                }`}
                variants={item}
                whileHover={{ 
                  y: -3,
                  boxShadow: darkMode 
                    ? '0 10px 15px -3px rgba(0, 0, 0, 0.2)' 
                    : '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className={`text-sm font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {skill}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
