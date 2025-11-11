import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    image: '/project1.jpg',
    github: 'https://github.com/yourusername/ecommerce-platform',
    demo: 'https://ecommerce-demo.example.com',
    category: 'fullstack'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team collaboration features.',
    tags: ['React', 'Firebase', 'Redux', 'Tailwind CSS'],
    image: '/project2.jpg',
    github: 'https://github.com/yourusername/task-manager',
    demo: 'https://taskmanager-demo.example.com',
    category: 'frontend'
  },
  {
    id: 3,
    title: 'RESTful API Service',
    description: 'A scalable RESTful API service with JWT authentication and role-based access control.',
    tags: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    image: '/project3.jpg',
    github: 'https://github.com/yourusername/rest-api',
    demo: 'https://api-docs.example.com',
    category: 'backend'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A modern, responsive portfolio website built with React and Framer Motion.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    image: '/project4.jpg',
    github: 'https://github.com/yourusername/portfolio',
    demo: 'https://yourportfolio.example.com',
    category: 'frontend'
  },
  {
    id: 5,
    title: 'Data Visualization Dashboard',
    description: 'Interactive data visualization dashboard with real-time data updates and filtering capabilities.',
    tags: ['D3.js', 'React', 'Express', 'MongoDB'],
    image: '/project5.jpg',
    github: 'https://github.com/yourusername/dashboard',
    demo: 'https://dashboard-demo.example.com',
    category: 'fullstack'
  },
  {
    id: 6,
    title: 'Mobile App',
    description: 'Cross-platform mobile application built with React Native.',
    tags: ['React Native', 'Redux', 'Firebase'],
    image: '/project6.jpg',
    github: 'https://github.com/yourusername/mobile-app',
    demo: 'https://appstore.com/your-app',
    category: 'mobile'
  },
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);
  const [isLoading, setIsLoading] = useState(true);

  // Filter projects based on selected category
  useEffect(() => {
    setIsLoading(true);
    
    const timer = setTimeout(() => {
      if (selectedCategory === 'all') {
        setFilteredProjects(projectsData);
      } else {
        setFilteredProjects(
          projectsData.filter(project => project.category === selectedCategory)
        );
      }
      setIsLoading(false);
    }, 300); // Simulate loading

    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <section id="projects" className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My <span className="text-blue-600 dark:text-cyan-400">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-blue-600 dark:bg-cyan-400 mx-auto mb-8" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project was built with a focus on user experience, performance, and clean code.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {['all', 'frontend', 'backend', 'fullstack', 'mobile'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white dark:bg-cyan-400 dark:text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 dark:border-cyan-400"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex space-x-3">
                          {project.github && (
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center bg-white/90 text-gray-900 rounded-full hover:bg-white transition-colors"
                              aria-label="View on GitHub"
                            >
                              <FiGithub className="w-5 h-5" />
                            </a>
                          )}
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-gray-900 transition-colors"
                              aria-label="View Live Demo"
                            >
                              <FiExternalLink className="w-5 h-5" />
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-xs font-medium rounded-full text-gray-700 dark:text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  className="col-span-full text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-gray-600 dark:text-gray-400">
                    No projects found in this category. Check back soon for updates!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
