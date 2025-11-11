import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiGithub />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <FiLinkedin />, url: 'https://linkedin.com/in/yourusername', label: 'LinkedIn' },
    { icon: <FiTwitter />, url: 'https://twitter.com/yourusername', label: 'Twitter' },
    { icon: <FiMail />, url: 'mailto:your.email@example.com', label: 'Email' },
  ];

  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      variants={footerVariants}
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent">
              Portfolio
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Building exceptional digital experiences
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-cyan-400 transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="text-xl">{social.icon}</span>
                </motion.a>
              ))}
            </div>
            
            <p className="text-sm text-gray-500 dark:text-gray-500 text-center md:text-right">
              © {currentYear} Your Name. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-gray-500 dark:text-gray-500">
            Built with React, Tailwind CSS, and Framer Motion. Deployed with Vercel.
          </p>
          <p className="text-xs text-center text-gray-500 dark:text-gray-500 mt-2">
            Made with ❤️ by You
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
