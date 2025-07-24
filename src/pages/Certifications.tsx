import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';

const Certifications: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certifications = [
    {
      title: 'AWS Academy Graduate',
      issuer: 'Amazon Web Services',
      date: '2024',
      category: 'Cloud',
      description: 'Comprehensive cloud computing certification covering AWS core services',
      badge: '☁️',
      image: '/src/All_logo_and_pictures-main/cloud/amazon.svg',
      certificateUrl: '/src/untitled folder/aws_graduate.png' // Add your actual certificate image URL
    },
    {
      title: 'Red Hat OpenStack',
      issuer: 'Red Hat',
      date: '2024',
      category: 'Infrastructure',
      description: 'OpenStack cloud platform administration and deployment',
      badge: '🔴',
      image: '/src/All_logo_and_pictures-main/cloud/redhat.svg',
      certificateUrl: '/src/untitled folder/redhat_oopenstack.png'
    },
    {
      title: 'Java EE Certification',
      issuer: 'Oracle',
      date: '2023',
      category: 'Development',
      description: 'Enterprise Java development and application architecture',
      badge: '☕',
      image: '/src/All_logo_and_pictures-main/programming languages/java.svg',
      certificateUrl: '/src/untitled folder/java ee.png'
    },
    {
      title: 'EXIN Cloud Computing',
      issuer: 'EXIN',
      date: '2023',
      category: 'Cloud',
      description: 'Cloud computing fundamentals and service models',
      badge: '🌥️',
      image: '/src/All_logo_and_pictures-main/cloud/cloud.svg',
      certificateUrl: '/src/untitled folder/exin.png'
    },
    {
      title: 'IBM Networking & Storage',
      issuer: 'IBM',
      date: '2023',
      category: 'Infrastructure',
      description: 'Network infrastructure and storage solutions',
      badge: '🔗',
      image: '/src/All_logo_and_pictures-main/cloud/ibm.svg',
      certificateUrl: '/src/untitled folder/ibm.png'
    },
    {
      title: 'AI & Business Strategy',
      issuer: 'Coursera',
      date: '2024',
      category: 'AI',
      description: 'Strategic implementation of AI in business environments',
      badge: '🤖',
      image: '/src/All_logo_and_pictures-main/frameworks/ai.svg',
      certificateUrl: '/src/untitled folder/AI AND BS.png'
    },
    {
      title: 'HTML/CSS/JavaScript',
      issuer: 'FreeCodeCamp',
      date: '2023',
      category: 'Web Development',
      description: 'Modern web development with responsive design',
      badge: '🌐',
      image: '/src/All_logo_and_pictures-main/programming languages/javascript.svg',
      certificateUrl: '/Users/parveensingh/Desktop/project/src/untitled folder/HTML,CSS.png'
    },
    {
      title: 'System Thinking',
      issuer: 'Pinnacle Internship',
      date: '2023',
      category: 'Professional',
      description: 'Systems analysis and design thinking methodology',
      badge: '🧠',
      image: '/src/All_logo_and_pictures-main/others/brain.svg',
      certificateUrl: '/src/untitled folder/System Thinking.png'
    },
    {
      title: 'Hackathon Participation',
      issuer: 'Tech Events',
      date: '2024',
      category: 'Competition',
      description: 'Multiple hackathon participations and innovative solutions',
      badge: '🏆',
      image: '/src/All_logo_and_pictures-main/others/trophy.svg',
      certificateUrl: '/src/untitled folder/IMG_4121.jpg'
    },
    {
      title: 'Pinnacle Internship',
      category: 'Internship',
      description: 'Completed internship at Pinnacle with outstanding achievement.',
      badge: '🏅',
      image: '/src/All_logo_and_pictures-main/others/award.svg',
      certificateUrl: '/src/untitled folder/e56164e2-bdbf-4032-9c8c-53d41625bafe.JPG'
    },
    {
      title: 'National Level Exhibition',
      category: 'Exhibition',
      description: 'Certificate for participation in a National Level Exhibition.',
      badge: '🎫',
      image: '/src/All_logo_and_pictures-main/others/award.svg',
      certificateUrl: '/src/untitled folder/IMG_4122.jpg'
    }
  ];

  const openModal = (cert: any) => {
    setSelectedCert(cert);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCert(null);
  };

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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut" as const
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.2,
        ease: "easeIn" as const
      }
    }
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Certifications</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Professional certifications and achievements in technology and development
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 hover:glow-purple transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{cert.badge}</div>
                <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                  {cert.category}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 text-white">{cert.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{cert.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">{cert.date}</span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openModal(cert)}
                  className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <Award size={16} />
                  <span className="text-sm">Verify</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">9+</div>
            <div className="text-gray-400">Certifications</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">2</div>
            <div className="text-gray-400">Years Learning</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">100%</div>
            <div className="text-gray-400">Completion Rate</div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="glass-effect rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedCert.title}</h2>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Certificate Image */}
                  <div className="flex-1">
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                      <img
                        src={selectedCert.certificateUrl}
                        alt={`${selectedCert.title} Certificate`}
                        className="w-full h-auto rounded-lg shadow-lg"
                        onError={(e) => {
                          e.currentTarget.src = '/src/All_logo_and_pictures-main/others/certificate-placeholder.svg';
                          e.currentTarget.alt = 'Certificate placeholder';
                        }}
                      />
                    </div>
                  </div>

                  {/* Certificate Details */}
                  <div className="flex-1">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Certificate Details</h3>
                        <div className="space-y-2 text-gray-300">
                          <p><span className="text-purple-400">Category:</span> {selectedCert.category}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                        <p className="text-gray-300">{selectedCert.description}</p>
                      </div>

                      <div className="flex space-x-4">
                        <motion.a
                          href={selectedCert.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                          <ExternalLink size={16} />
                          <span>View Full Size</span>
                        </motion.a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Certifications;