import React from 'react';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  level: number;
  Icon: React.ComponentType<{ width?: string; height?: string; className?: string }>;
  index: number;
}

const SkillCard: React.FC<SkillCardProps> = ({ name, level, Icon, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-effect p-4 rounded-lg hover:glow-purple transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-3">
          <Icon width="40" height="40" className="text-purple-400" />
          <span className="font-semibold text-white">{name}</span>
        </div>
        <span className="text-purple-400 font-bold">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;