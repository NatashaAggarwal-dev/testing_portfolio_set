import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Shield, Cloud, Brain, Download, Linkedin, BookOpen, Award, Users } from 'lucide-react';
import { useRef } from 'react';

const tabData = [
  {
    label: 'My Story',
    icon: <BookOpen className="w-6 h-6 text-purple-400" />,
    content: (
      <div>
              <h2 className="text-2xl font-bold mb-4 text-purple-400">My Story</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                I'm Natasha Aggarwal, a passionate DevOps enthusiast and BCA student at Vivekananda Global University. 
                I specialize in Cyber Security & IT and work with tools like Docker, Git, Python, AWS, and Streamlit.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                I enjoy building secure, scalable systems, and love playing chess — which sharpens my strategy. 
                My journey in technology started with a curiosity about how systems work and evolved into a passion 
                for creating robust, secure infrastructure.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Currently pursuing my BCA with a focus on Cyber Security and Information Technology, 
                I maintain a CGPA of 9+ while gaining hands-on experience through internships and projects.
              </p>
            </div>
    ),
  },
  {
    label: 'Philosophy',
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Philosophy</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              "Technology is best when it brings people together. My goal is to build secure, 
              scalable systems that not only solve complex problems but also create positive 
              impact in people's lives. Every line of code, every infrastructure decision, 
              and every security measure is an opportunity to make the digital world better."
            </p>
          </div>
    ),
  },
  {
    label: 'Education',
    icon: <Award className="w-6 h-6 text-purple-400" />,
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-purple-400">Education</h2>
        <p className="text-gray-300 leading-relaxed mb-2">BCA Student at Vivekananda Global University</p>
        <p className="text-gray-300 leading-relaxed mb-2">Specialization: Cyber Security & IT</p>
        <p className="text-gray-300 leading-relaxed">CGPA: 9+</p>
      </div>
    ),
  },
];

const interestIcons = [
  { icon: <span className="text-3xl">♟️</span>, label: 'Chess' },
  { icon: <Cloud className="w-8 h-8 text-blue-400" />, label: 'Cloud' },
  { icon: <Shield className="w-8 h-8 text-pink-400" />, label: 'Security' },
  { icon: <Code className="w-8 h-8 text-yellow-400" />, label: 'Coding' },
  { icon: <Users className="w-8 h-8 text-green-400" />, label: 'Teamwork' },
];

const funFacts = [
  { fact: '9+ CGPA', icon: <Award className="w-6 h-6 text-purple-400" /> },
  { fact: '10+ Projects', icon: <Code className="w-6 h-6 text-yellow-400" /> },
  { fact: 'Chess Enthusiast', icon: <span className="text-2xl">♟️</span> },
];

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center">
      {/* About Me Video and Tabbed Info Side by Side on Desktop */}
      <div className="w-full max-w-5xl mx-auto mb-12 flex flex-col md:flex-row gap-12 items-center">
        {/* About Me Video (9:16 aspect, flip card) */}
        <div className="w-full md:w-[200px] lg:w-[260px] aspect-[9/16] rounded-2xl shadow-lg relative flex-shrink-0 overflow-hidden">
          <video
            ref={videoRef}
            src="/about_video/about_me.mp4"
            poster="/about_video/Screenshot 2025-07-24 at 2.05.34 PM.png"
            className="w-full h-full object-cover rounded-2xl"
            controls
          />
        </div>
        {/* Tabbed Info Section */}
        <div className="flex-1 flex flex-col">
          <div className="flex gap-4 mb-6">
            {tabData.map((tab, idx) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors border-b-2 ${activeTab === idx ? 'border-purple-400 text-purple-400 bg-white/10' : 'border-transparent text-gray-400 hover:text-purple-300'}`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait">
          <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="absolute w-full"
              >
                {tabData[activeTab].content}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      {/* Fun Facts Carousel - at the bottom, well separated */}
      <div className="w-full max-w-3xl mx-auto mt-32">
        <div className="flex gap-6 overflow-x-auto py-4 scrollbar-thin scrollbar-thumb-purple-400/40 scrollbar-track-transparent">
          {funFacts.map((fact, idx) => (
            <motion.div
              key={fact.fact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.1 }}
              className="min-w-[180px] bg-gradient-to-br from-purple-700/60 to-purple-400/30 rounded-xl p-6 flex flex-col items-center shadow-lg"
            >
              {fact.icon}
              <span className="mt-3 text-lg font-bold text-white">{fact.fact}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;