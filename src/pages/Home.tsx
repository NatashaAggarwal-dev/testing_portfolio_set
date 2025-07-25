import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Download, ExternalLink, X, Sun, Moon, ArrowRight } from 'lucide-react';
import ParticleBackground from '../components/ParticleBackground';
import DnaWave from '../components/DnaWave';

const Home: React.FC = () => {
  const [showResume, setShowResume] = useState(false);
  const [darkMode, setDarkMode] = useState(true); // default to dark mode
  const swipeTrackRef = useRef<HTMLDivElement>(null);
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeActive, setSwipeActive] = useState(false);
  const [resetting, setResetting] = useState(false);

  const SWIPE_MAX = 180;
  const SWIPE_THRESHOLD = 0.7; // 70% of track

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  function handleSwipeEnd(event: MouseEvent, info: { point: { x: number; y: number }; offset: { x: number; y: number } }) {
    if (swipeTrackRef.current) {
      const trackWidth = swipeTrackRef.current.offsetWidth;
      if (swipeProgress > trackWidth * SWIPE_THRESHOLD) {
        // Trigger download
        window.location.href = '/Resume/my_resume.pdf';
        setResetting(true);
        setTimeout(() => {
          setSwipeProgress(0);
          setResetting(false);
          setSwipeActive(false);
        }, 400);
        return;
      }
    }
    setResetting(true);
    setTimeout(() => {
      setSwipeProgress(0);
      setResetting(false);
      setSwipeActive(false);
    }, 400);
  }

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
    <div className="relative min-h-screen flex items-center justify-center pt-20">
      {/* Dark/Light Mode Toggle Button */}
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className="fixed bottom-6 right-6 z-50 bg-gray-900 dark:bg-white/90 text-yellow-400 dark:text-purple-700 p-3 rounded-full shadow-lg border border-gray-700 dark:border-purple-300 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun size={22} /> : <Moon size={22} />}
      </button>
      <ParticleBackground />
      
      {/* Download Icon and Social Buttons - Fixed Bottom Left */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 items-center" style={{ pointerEvents: 'auto' }}>
        {/* Download Icon triggers swipe track */}
        <div
          onMouseEnter={() => setSwipeActive(true)}
          onMouseLeave={() => { if (!resetting) { setSwipeActive(false); setSwipeProgress(0); } }}
          tabIndex={0}
          onFocus={() => setSwipeActive(true)}
          onBlur={() => { if (!resetting) { setSwipeActive(false); setSwipeProgress(0); } }}
          style={{ outline: 'none', position: 'relative' }}
          className="mb-2"
        >
          <button
            className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white w-10 h-10 p-2 md:w-16 md:h-16 md:p-4 rounded-full shadow transition-colors focus:outline-none"
            aria-label="Download Resume"
            tabIndex={-1}
            style={{ pointerEvents: 'auto' }}
          >
            <Download className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          {/* Swipe Track */}
          <motion.div
            ref={swipeTrackRef}
            initial={{ width: 0, opacity: 0 }}
            animate={swipeActive ? { width: 240, opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute left-14 top-1/2 -translate-y-1/2 h-14 bg-white dark:bg-gray-900 rounded-r-xl shadow-2xl flex items-center overflow-hidden border-l-4 border-purple-500 px-4"
            style={{ zIndex: 100, pointerEvents: 'auto' }}
          >
            <span className="absolute top-1 left-1/2 -translate-x-1/2 text-xs text-purple-700 dark:text-purple-300 font-semibold select-none pointer-events-none">
              Swipe to download resume
            </span>
            {/* Animated Arrow */}
            <motion.div
              className="absolute left-10 top-1/2 -translate-y-1/2 flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={swipeActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ArrowRight className="w-7 h-7 text-purple-400 animate-pulse" />
            </motion.div>
            {/* Drag Handle */}
            <motion.div
              className="relative z-10"
              drag="x"
              dragConstraints={{ left: 0, right: SWIPE_MAX }}
              dragElastic={0.05}
              dragMomentum={false}
              style={{ x: swipeProgress, touchAction: 'none' }}
              onDrag={(event, info) => {
                // Only allow dragging right
                setSwipeProgress(Math.max(0, Math.min(info.point.x - info.offset.x, SWIPE_MAX)));
              }}
              onDragEnd={handleSwipeEnd}
              whileTap={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
                <Download size={20} />
              </div>
            </motion.div>
          </motion.div>
        </div>
        {/* Social Icons */}
        <a
          href="https://www.linkedin.com/in/natashaaggarwal03/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 p-2 md:w-16 md:h-16 md:p-4 rounded-full shadow transition-colors"
        >
          <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
        </a>
        <a
          href="https://github.com/NatashaAggarwal-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white w-10 h-10 p-2 md:w-16 md:h-16 md:p-4 rounded-full shadow transition-colors"
        >
          <Github className="w-5 h-5 md:w-6 md:h-6" />
        </a>
      </div>

      {/* DNA Wave Animation on right side */}
      <DnaWave />

      {/* Main Hero Section (centered) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 relative z-10"
      >
        {/* Hero Section: Text on left, large image on right */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0 mt-8 md:mt-0 pb-8 min-h-[350px]">
          {/* Main Text (left) */}
          <div className="flex-1 flex flex-col items-start justify-center text-left w-full md:w-auto">
            <motion.h1
              variants={itemVariants}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-7xl font-bold mb-6 md:mb-10 text-gradient leading-[1.15] text-left w-full"
            >
              Natasha Aggarwal
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-300 mb-2 md:mb-4 w-full"
            >
              DevOps & Cloud Engineer
            </motion.p>
            <motion.p
              variants={itemVariants}
              className="text-sm xs:text-base sm:text-lg md:text-lg text-gray-400 mb-4 md:mb-8 max-w-2xl w-full"
            >
              Passionate about building secure, scalable systems and exploring the infinite possibilities of cloud technology
            </motion.p>
            {/* Info Boxes below text, limited to left side */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-2xl w-full mb-2 md:mb-4"
            >
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-effect p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-400">BCA Student</h3>
                <p className="text-gray-400">Cyber Security & IT</p>
                <p className="text-sm text-gray-500 mt-2">CGPA: 9+</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-effect p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-400">DevOps Engineer</h3>
                <p className="text-gray-400">Docker, AWS, CI/CD</p>
                <p className="text-sm text-gray-500 mt-2">Cloud & Infrastructure</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-effect p-6 rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-purple-400">Chess Enthusiast</h3>
                <p className="text-gray-400">Strategic Thinking</p>
                <p className="text-sm text-gray-500 mt-2">Sharpens Problem Solving</p>
              </motion.div>
            </motion.div>
          </div>
          {/* Large Portfolio Image (right) */}
          <div className="flex-1 flex items-end justify-center pb-2 w-full md:w-auto mt-8 md:mt-0">
            <motion.img
              src="/All_logo_and_pictures-main/cloud/IMG_3928.png"
              alt="Natasha Aggarwal"
              className="w-48 xs:w-60 sm:w-72 md:w-[520px] lg:w-[700px] h-[260px] xs:h-[320px] sm:h-[400px] md:h-[700px] lg:h-[900px] object-cover mt-4 md:mt-12 rounded-xl shadow-lg"
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              draggable="false"
              style={{ background: 'none', boxShadow: 'none', maxWidth: '100vw' }}
            />
          </div>
        </div>

        {/* Resume Modal */}
        <AnimatePresence>
          {showResume && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setShowResume(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-lg relative"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                  <h2 className="text-xl font-bold text-white">My Resume</h2>
                  <button
                    onClick={() => setShowResume(false)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-4 flex flex-col gap-4">
                  <img
                    src="/Resume/my_resume.png"
                    alt="Resume"
                    className="w-full h-auto max-h-[60vh] rounded-lg border border-gray-700 object-contain"
                  />
                  <a
                    href="/Resume/my_resume.pdf"
                    download
                    className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                  >
                    <Download size={18} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <Link to="/about">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect glow-purple px-8 py-4 rounded-full font-semibold flex items-center space-x-2 mx-auto hover:bg-purple-500/20 transition-all"
            >
              <span>Explore My Journey</span>
              <ExternalLink size={20} />
            </motion.button>
          </Link>
        </motion.div>

        {/* Quick Reviews Preview */}
        <motion.div
          variants={itemVariants}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-purple-400 text-center">What People Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60"
                  alt="Sarah Johnson"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">Sarah Johnson</h3>
                  <p className="text-sm text-gray-400">Senior DevOps Engineer</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                "Natasha is an exceptional DevOps engineer with deep knowledge of containerization and cloud infrastructure..."
              </p>
              <div className="flex items-center mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400">⭐</div>
                ))}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="glass-effect p-6 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60"
                  alt="Michael Chen"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-semibold text-white">Michael Chen</h3>
                  <p className="text-sm text-gray-400">Cloud Architect</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm">
                "Working with Natasha on cloud security implementations was a pleasure. Her understanding of cryptography..."
              </p>
              <div className="flex items-center mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <div key={star} className="w-4 h-4 text-yellow-400 fill-yellow-400">⭐</div>
                ))}
              </div>
            </motion.div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/reviews">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect px-6 py-3 rounded-full font-semibold hover:bg-purple-500/20 transition-all"
              >
                View All Reviews
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;