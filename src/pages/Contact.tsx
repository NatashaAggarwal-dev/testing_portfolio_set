import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Github, Linkedin, Send, Download } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact: React.FC = () => {
  const handleFormspreeResponse = (e: React.FormEvent<HTMLFormElement>) => {
    // Let the form submit, but show the toast after a short delay
    setTimeout(() => {
      toast.success('Message has successfully been sent to Natasha Aggarwal.');
    }, 500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Get In Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Let's collaborate on your next project or discuss exciting opportunities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass-effect p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Contact Information</h2>
              
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 glass-effect rounded-lg"
                >
                  <Mail className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Email</p>
                    <p className="text-gray-400">aggarwalnatasha8595@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 glass-effect rounded-lg"
                >
                  <Phone className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Phone</p>
                    <p className="text-gray-400">+91 876445XXXX</p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-4 p-4 glass-effect rounded-lg"
                >
                  <MapPin className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="font-semibold text-white">Location</p>
                    <p className="text-gray-400">Jaipur, Rajasthan, India</p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect p-8 rounded-2xl">
              <h3 className="text-xl font-bold mb-6 text-purple-400">Connect With Me</h3>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/NatashaAggarwal-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-effect p-4 rounded-lg hover:glow-purple transition-all"
                >
                  <Github className="w-6 h-6 text-white" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/natashaaggarwal03/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-effect p-4 rounded-lg hover:glow-purple transition-all"
                >
                  <Linkedin className="w-6 h-6 text-white" />
                </motion.a>
              </div>
            </div>

            {/* Resume Download */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-effect p-8 rounded-2xl text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-purple-400">Download Resume</h3>
              <motion.a
                href="/Resume/my_resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-2 glass-effect glow-purple px-6 py-3 rounded-full font-semibold hover:bg-purple-500/20 transition-all"
              >
                <Download size={20} />
                <span>Download PDF</span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-purple-400">Send Message</h2>
              
              <form 
                action="https://formspree.io/f/mvgqknrq" 
                method="POST" 
                className="space-y-6"
                onSubmit={handleFormspreeResponse}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      id="linkedin"
                      name="linkedin"
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub
                    </label>
                    <input
                      type="url"
                      id="github"
                      name="github"
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                    placeholder="+91 9876543XX"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                    placeholder="Tell me about your project or what you'd like to discuss..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass-effect glow-purple py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-all"
                >
                  <Send size={20} />
                  <span>Send Message</span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* GitHub Activity Section */}
        <motion.div variants={itemVariants} className="mt-16">
          <div className="glass-effect p-8 rounded-2xl text-center">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">GitHub Activity</h2>
            <p className="text-gray-400 mb-6">My coding journey and open-source contributions</p>
            <motion.a
              href="https://github.com/NatashaAggarwal-dev"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center space-x-2 glass-effect glow-purple px-6 py-3 rounded-full font-semibold hover:bg-purple-500/20 transition-all"
            >
              <Github size={20} />
              <span>View GitHub Profile</span>
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;