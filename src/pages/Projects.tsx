import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  const categories = ['All', 'Python', 'DevOps', 'ML', 'AI', 'Database', 'Cloud', 'Web'];

  const projects = [
    {
      title: "Sentiment Analysis",
      github: "https://github.com/NatashaAggarwal-dev/Sentiment-Analysis.git",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Machine Learning", "Python DataFrame", "Data Science"],
      categories: ["Python", "ML", "AI", "All"],
      description: "A sentiment analysis project using machine learning and Python data science tools."
    },
    {
      title: "gradio_app",
      github: "https://github.com/NatashaAggarwal-dev/gradio_app",
      image: "/All_logo_and_pictures-main/others/json.svg",
      technologies: ["Gradio", "Jupyter Notebook", "Python"],
      categories: ["Python", "Web", "All"],
      description: "A Gradio app built in Jupyter Notebook for interactive Python demos."
    },
    {
      title: "Finding_university",
      github: "https://github.com/NatashaAggarwal-dev/Finding_university",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Streamlit", "Speech-to-Text", "Text-to-Speech", "AI"],
      categories: ["Python", "AI", "Web", "All"],
      description: "A Streamlit app using speech-to-text and text-to-speech for university search."
    },
    {
      title: "Load_Balancing_project",
      github: "https://github.com/NatashaAggarwal-dev/Load_Balancing_project",
      image: "/All_logo_and_pictures-main/programming languages/bash.svg",
      technologies: ["AWS", "EC2", "Load Balancer", "Shell Scripting"],
      categories: ["DevOps", "Cloud", "All"],
      description: "AWS EC2 load balancing project using shell scripting."
    },
    {
      title: "Crypto-network-security",
      github: "https://github.com/NatashaAggarwal-dev/Crypto-network-security",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Cryptography", "Network Security", "Python"],
      categories: ["Python", "Security", "All"],
      description: "Cryptography and network security simulations in Python."
    },
    {
      title: "Column-level-encryption-in-sql",
      github: "https://github.com/NatashaAggarwal-dev/Column-level-encryption-in-sql",
      image: "/All_logo_and_pictures-main/databases/mysql.svg",
      technologies: ["SQL Server", "Data Encryption", "Security"],
      categories: ["Database", "Security", "All"],
      description: "Column-level encryption techniques in SQL Server."
    },
    {
      title: "python-send-whatsappmsg",
      github: "https://github.com/NatashaAggarwal-dev/python-send-whatsappmsg",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["WhatsApp Automation", "Twilio", "Python Script"],
      categories: ["Python", "Automation", "All"],
      description: "Automate WhatsApp messages using Twilio and Python."
    },
    {
      title: "python-phone-call",
      github: "https://github.com/NatashaAggarwal-dev/python-phone-call",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Voice Call Automation", "Twilio", "Python"],
      categories: ["Python", "Automation", "All"],
      description: "Automate phone calls using Twilio and Python."
    },
    {
      title: "python-send-email",
      github: "https://github.com/NatashaAggarwal-dev/python-send-email",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["SMTP", "Email Automation", "Python"],
      categories: ["Python", "Automation", "All"],
      description: "Send emails automatically using SMTP and Python."
    },
    {
      title: "python-send-sms",
      github: "https://github.com/NatashaAggarwal-dev/python-send-sms",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["SMS API", "Twilio", "Automation"],
      categories: ["Python", "Automation", "All"],
      description: "Send SMS using Twilio API and Python."
    },
    {
      title: "python-menu",
      github: "https://github.com/NatashaAggarwal-dev/python-menu",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["CLI Menu", "Python Logic"],
      categories: ["Python", "All"],
      description: "A CLI menu system built in Python."
    },
    {
      title: "insta-automation",
      github: "https://github.com/NatashaAggarwal-dev/insta-automation",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Selenium", "Automation Bot", "Instagram"],
      categories: ["Python", "Automation", "All"],
      description: "Instagram automation bot using Selenium and Python."
    },
    {
      title: "CI_CD-project",
      github: "https://github.com/NatashaAggarwal-dev/CI_CD-project",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Jenkins", "Continuous Integration", "Python"],
      categories: ["DevOps", "All"],
      description: "CI/CD project using Jenkins and Python."
    },
    {
      title: "docker-inside-docker",
      github: "https://github.com/NatashaAggarwal-dev/docker-inside-docker",
      image: "/All_logo_and_pictures-main/cloud/docker.svg",
      technologies: ["Docker Nesting", "DevOps Setup"],
      categories: ["DevOps", "All"],
      description: "Running Docker inside Docker for DevOps setups."
    },
    {
      title: "system-md-docker",
      github: "https://github.com/NatashaAggarwal-dev/system-md-docker",
      image: "/All_logo_and_pictures-main/cloud/docker.svg",
      technologies: ["Dockerfile", "System Configuration"],
      categories: ["DevOps", "All"],
      description: "System configuration using Dockerfile."
    },
    {
      title: "apache-on-Redhat-ubi8",
      github: "https://github.com/NatashaAggarwal-dev/apache-on-Redhat-ubi8",
      image: "/All_logo_and_pictures-main/others/html.svg",
      technologies: ["Apache Setup", "Redhat", "HTML Config"],
      categories: ["Web", "All"],
      description: "Apache setup on Redhat UBI8 with HTML configuration."
    },
    {
      title: "docker-python-demo",
      github: "https://github.com/NatashaAggarwal-dev/docker-python-demo",
      image: "/All_logo_and_pictures-main/cloud/docker.svg",
      technologies: ["Python Docker Setup", "Testing"],
      categories: ["DevOps", "All"],
      description: "Demo for running Python in Docker."
    },
    {
      title: "kubernetes",
      github: "https://github.com/NatashaAggarwal-dev/kubernetes",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Kubernetes Basics", "Python"],
      categories: ["DevOps", "Cloud", "All"],
      description: "Kubernetes basics with Python."
    },
    {
      title: "ai-azure-beautiful_soup",
      github: "https://github.com/NatashaAggarwal-dev/ai-azure-beautiful_soup",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Azure Cloud", "Web Scraping", "BeautifulSoup"],
      categories: ["Python", "Cloud", "All"],
      description: "Web scraping with BeautifulSoup on Azure Cloud."
    },
    {
      title: "AI-OWN_TOOL",
      github: "https://github.com/NatashaAggarwal-dev/AI-OWN_TOOL",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Custom AI Tools", "Python Scripting"],
      categories: ["Python", "AI", "All"],
      description: "Custom AI tools built with Python scripting."
    },
    {
      title: "linkedin_Shell_tool",
      github: "https://github.com/NatashaAggarwal-dev/linkedin_Shell_tool",
      image: "/All_logo_and_pictures-main/programming languages/python.svg",
      technologies: ["Shell Automation", "LinkedIn Bot"],
      categories: ["Python", "Automation", "All"],
      description: "Shell automation tool for LinkedIn using Python."
    }
  ];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(project => project.categories.includes(activeCategory));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Projects</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Showcasing innovative solutions across DevOps, AI, and security domains
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeCategory === category
                  ? 'glass-effect glow-purple text-purple-400 border border-purple-400'
                  : 'glass-effect text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Slider */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-purple-400/40 scrollbar-track-transparent">
          <div className="flex gap-8 min-w-[340px]" style={{ scrollSnapType: 'x mandatory' }}>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                className="relative flex-shrink-0 w-80 h-[420px] cursor-pointer"
                style={{ perspective: 1200, scrollSnapAlign: 'start' }}
                onMouseEnter={() => setFlippedIndex(index)}
                onMouseLeave={() => setFlippedIndex(null)}
              >
                {/* Card Inner */}
                <motion.div
                  className="absolute inset-0 w-full h-full"
                  animate={{ rotateY: flippedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.6, type: 'spring' }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Card Front */}
                  <div className="absolute inset-0 w-full h-full glass-effect rounded-2xl shadow-xl overflow-hidden flex flex-col items-center justify-center flip-front">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-32 h-32 object-contain mb-6 mt-8"
                    />
                    <h3 className="text-xl font-bold mb-2 text-white text-center px-2">{project.title}</h3>
                    <div className="flex flex-wrap gap-2 justify-center mb-4 px-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 mt-auto mb-8">
                      {project.categories.filter(cat => cat !== 'All').map((cat) => (
                        <span key={cat} className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs font-semibold">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full glass-effect rounded-2xl shadow-xl flex flex-col justify-between items-center p-6 flip-back">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white text-center">{project.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed text-center">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.08 }}
                        className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors bg-gray-800 px-4 py-2 rounded-lg font-semibold shadow"
                      >
                        <Github size={18} />
                        <span className="text-sm">Code</span>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </motion.div>
        )}
      </motion.div>
      {/* Add a style tag for backface-hidden utility */}
      <style>{`
        .backface-hidden { backface-visibility: hidden; }
        .flip-front { transform: rotateY(0deg); backface-visibility: hidden; }
        .flip-back { transform: rotateY(180deg); backface-visibility: hidden; }
      `}</style>
    </div>
  );
};

export default Projects;