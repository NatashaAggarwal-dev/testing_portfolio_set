import React from 'react';
import { motion } from 'framer-motion';
import SkillCard from '../components/SkillCard';
import { useRef, useEffect } from 'react';

const Skills: React.FC = () => {
  const technicalSkills = [
    { name: 'Python', level: 90, iconPath: '/src/All_logo_and_pictures-main/programming languages/python.svg' },
    { name: 'Docker', level: 85, iconPath: '/src/All_logo_and_pictures-main/cloud/docker.svg' },
    { name: 'AWS', level: 80, iconPath: '/src/All_logo_and_pictures-main/cloud/amazon.svg' },
    { name: 'Git/GitHub', level: 90, iconPath: '/src/All_logo_and_pictures-main/cloud/github.svg' },
    { name: 'Linux', level: 85, iconPath: '/src/All_logo_and_pictures-main/social icons/linux.svg' },
    { name: 'SQL', level: 80, iconPath: '/src/All_logo_and_pictures-main/databases/mysql.svg' },
    { name: 'Streamlit', level: 85, iconPath: '/src/All_logo_and_pictures-main/Streamlit.svg' },
    { name: 'Cryptography', level: 75, iconPath: '/src/All_logo_and_pictures-main/cryptography.svg' },
    { name: 'Machine Learning', level: 70, iconPath: '/src/All_logo_and_pictures-main/machine_learning.svg' },
  ];

  const softSkills = [
    { name: 'Problem Solving', level: 95 },
    { name: 'Strategic Thinking', level: 90 },
    { name: 'Team Collaboration', level: 85 },
    { name: 'Communication', level: 80 },
    { name: 'Leadership', level: 75 },
  ];

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

  const bubbleColors = [
    'bg-gradient-to-br from-purple-500 to-pink-500',
    'bg-gradient-to-br from-blue-500 to-purple-400',
    'bg-gradient-to-br from-pink-500 to-purple-500',
    'bg-gradient-to-br from-purple-400 to-blue-400',
  ];

  return (
    <div className="min-h-screen pt-32 pb-16 flex flex-col overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-6 flex flex-col flex-1"
        style={{ flex: 1 }}
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Skills & Expertise</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            A playful bubble showcase of my technical and soft skills
          </p>
        </motion.div>
        {/* Bubbles for technical skills only */}
        <div className="flex-1 flex flex-wrap gap-8 justify-center items-center w-full" style={{ minHeight: '40vh' }}>
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.07, type: 'spring' }}
              whileHover={{ scale: 1.18, zIndex: 30 }}
              className="relative flex flex-col items-center justify-center shadow-xl cursor-pointer group transition-all duration-300"
              style={{
                width: 120 + (index % 3) * 20,
                height: 120 + (index % 3) * 20,
                borderRadius: '50%',
                boxShadow: '0 4px 32px 0 rgba(168,85,247,0.18)',
                zIndex: 10 + (index % 5),
                animation: `float-bubble ${5 + (index % 3)}s ease-in-out infinite`,
                background: 'rgba(168,85,247,0.85)',
              }}
            >
              {/* Icon */}
                      <img 
                src={String(skill.iconPath)}
                        alt={skill.name}
                className={
                  skill.name === 'SQL'
                    ? 'w-20 h-20 object-contain select-none pointer-events-none' // larger for MySQL
                    : 'w-14 h-14 object-contain select-none pointer-events-none'
                }
                draggable="false"
              />
              {/* Name on hover */}
              <span className="absolute left-1/2 top-full -translate-x-1/2 mt-2 px-4 py-1 rounded-lg bg-gray-900/90 text-white text-base font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 shadow-lg border border-purple-400 pointer-events-none">
                {skill.name}
              </span>
                </motion.div>
              ))}
            </div>
        {/* Soft skills as circular progress bubbles below bubbles */}
        <div className="mt-16 flex flex-wrap gap-8 justify-center items-center">
          {softSkills.map((skill, index) => {
            const color = `url(#soft-skill-gradient-${index})`;
            const radius = 48;
            const stroke = 8;
            const normalizedRadius = radius - stroke / 2;
            const circumference = 2 * Math.PI * normalizedRadius;
            const progress = circumference * (1 - skill.level / 100);
            return (
              <div key={skill.name} className="flex flex-col items-center">
                <svg width={radius * 2} height={radius * 2}>
                  <defs>
                    <linearGradient id={`soft-skill-gradient-${index}`} x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    stroke="#22223b"
                    strokeWidth={stroke}
                    fill="none"
                  />
                  <motion.circle
                    cx={radius}
                    cy={radius}
                    r={normalizedRadius}
                    stroke={color}
                    strokeWidth={stroke}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference}
                    animate={{ strokeDashoffset: progress }}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: 'easeInOut' }}
                    strokeLinecap="round"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy="0.35em"
                    fontSize="2rem"
                    fill="#fff"
                    fontWeight="bold"
                  >
                    {skill.level}
                  </text>
                </svg>
                <span className="mt-3 text-base font-semibold text-purple-400 text-center">{skill.name}</span>
                  </div>
            );
          })}
        </div>
        {/* Bubble floating animation keyframes */}
        <style>{`
          @keyframes float-bubble {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-24px); }
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default Skills;