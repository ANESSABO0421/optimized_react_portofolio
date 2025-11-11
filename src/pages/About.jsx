import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FiAward, FiCode, FiLayers, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';

const About = () => {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('skills');
  const [expandedSkill, setExpandedSkill] = useState(null);

  // Animate when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  const stats = [
    { 
      icon: <FiAward className="w-8 h-8 text-blue-500 dark:text-cyan-400" />, 
      number: '3+', 
      label: 'Years Experience' 
    },
    { 
      icon: <FiCode className="w-8 h-8 text-blue-500 dark:text-cyan-400" />, 
      number: '50+', 
      label: 'Projects Completed' 
    },
    { 
      icon: <FiLayers className="w-8 h-8 text-blue-500 dark:text-cyan-400" />, 
      number: '30+', 
      label: 'Technologies Used' 
    },
  ];

  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'React', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'TypeScript', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Redux', level: 85 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'REST APIs', level: 85 },
      ],
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Git & GitHub', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'AWS', level: 65 },
        { name: 'Figma', level: 75 },
        { name: 'Jest', level: 75 },
      ],
    },
  ];

  const experiences = [
    {
      role: 'MERN Stack Developer',
      company: 'Sofroniics',
      period: '2023 - Present',
      description: 'Building scalable web applications using the MERN stack, implementing responsive UIs, and optimizing performance.',
      responsibilities: [
        'Developed and maintained multiple client projects using React and Node.js',
        'Implemented responsive designs with Tailwind CSS and Material-UI',
        'Optimized application performance and improved loading times',
        'Collaborated with cross-functional teams to deliver high-quality products',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Tech Solutions Inc.',
      period: '2021 - 2023',
      description: 'Worked on building user interfaces and implementing new features for various web applications.',
      responsibilities: [
        'Built reusable UI components with React',
        'Collaborated with designers to implement pixel-perfect designs',
        'Improved application performance and user experience',
        'Participated in code reviews and team meetings',
      ],
    },
  ];

  const education = [
    {
      degree: 'B.Sc Computer Science',
      institution: 'GEMS College, Ramapuram',
      period: '2018 - 2021',
      description: 'Specialized in Web Development and Software Engineering',
    },
    {
      degree: 'Higher Secondary Education',
      institution: 'GHSS, Kottakkal',
      period: '2016 - 2018',
      description: 'Computer Science with Mathematics',
    },
  ];

  const toggleSkill = (index) => {
    if (expandedSkill === index) {
      setExpandedSkill(null);
    } else {
      setExpandedSkill(index);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative py-20 px-4 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 dark:opacity-10">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.p 
            variants={itemVariants}
            className="text-blue-600 dark:text-cyan-400 font-mono text-sm md:text-base mb-4"
          >
            About Me
          </motion.p>
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4"
          >
            <span className="block font-light text-gray-600 dark:text-gray-300">Get to Know</span>
            <span className="block bg-gradient-to-b from-gray-900 via-gray-700 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 bg-clip-text text-transparent">
              About Me
            </span>
          </motion.h2>
          <motion.div 
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto mb-8 rounded-full"
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/profile.jpg"
                alt="Anees Aboobacker"
                className="w-full h-auto rounded-lg transform transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-full h-full border-4 border-blue-400 dark:border-cyan-400 rounded-xl -z-10"></div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-blue-400 dark:border-cyan-400 rounded-tl-xl"></div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-4 border-r-4 border-blue-400 dark:border-cyan-400 rounded-br-xl"></div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
            >
              I'm <span className="text-blue-600 dark:text-cyan-400">Anees Aboobacker</span>
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              A passionate <span className="font-semibold text-blue-600 dark:text-cyan-400">MERN Stack Developer</span> with a strong foundation in building modern web applications. I specialize in creating responsive, performant, and user-friendly interfaces using the latest web technologies.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              With over 3 years of experience in web development, I've had the opportunity to work on various projects, from small business websites to large-scale applications. I'm always eager to learn new technologies and improve my skills to build better solutions.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="p-4 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-center mb-2">
                    {stat.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.number}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center mb-8 border-b border-gray-200 dark:border-gray-700"
        >
          {[
            { id: 'skills', label: 'Skills' },
            { id: 'experience', label: 'Experience' },
            { id: 'education', label: 'Education' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium text-sm md:text-base transition-colors duration-300 ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-cyan-400 border-b-2 border-blue-600 dark:border-cyan-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </motion.div>

        {/* Tab Content */}
        <motion.div 
          variants={containerVariants}
          className="min-h-[400px]"
        >
          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <motion.div 
              variants={itemVariants}
              className="grid md:grid-cols-3 gap-8"
            >
              {skills.map((skillCategory, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div 
                    className="p-4 bg-gray-50 dark:bg-gray-700 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleSkill(index)}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skillCategory.category}
                    </h3>
                    {expandedSkill === index ? (
                      <FiChevronUp className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                    ) : (
                      <FiChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-300" />
                    )}
                  </div>
                  <motion.div 
                    className={`overflow-hidden ${expandedSkill === index ? 'block' : 'hidden'}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedSkill === index ? 'auto' : 0,
                      opacity: expandedSkill === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="p-4 space-y-4">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <div key={skillIndex} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-200">
                              {skill.name}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2.5 rounded-full"
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <motion.div 
              variants={itemVariants}
              className="space-y-8"
            >
              {experiences.map((exp, index) => (
                <div 
                  key={index}
                  className="relative pl-8 pb-8 border-l-2 border-blue-400 dark:border-cyan-400"
                >
                  <div className="absolute w-4 h-4 bg-blue-500 dark:bg-cyan-400 rounded-full -left-2 top-1"></div>
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {exp.role}
                      </h3>
                      <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 dark:text-cyan-400 bg-blue-100 dark:bg-cyan-900/30 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold text-blue-600 dark:text-cyan-400 mb-3">
                      {exp.company}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {exp.description}
                    </p>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-blue-500 dark:text-cyan-400 mr-2">▹</span>
                          <span className="text-gray-600 dark:text-gray-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* Education Tab */}
          {activeTab === 'education' && (
            <motion.div 
              variants={itemVariants}
              className="grid md:grid-cols-2 gap-8"
            >
              {education.map((edu, index) => (
                <div 
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-blue-600 dark:text-cyan-400 bg-blue-100 dark:bg-cyan-900/30 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold text-blue-600 dark:text-cyan-400 mb-2">
                    {edu.institution}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {edu.description}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>
      
    </section>
  );
};

export default About;
