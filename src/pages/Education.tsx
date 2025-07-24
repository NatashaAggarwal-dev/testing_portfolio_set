import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin, Trophy } from 'lucide-react';

const Education: React.FC = () => {
  const education = [
    {
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Vivekananda Global University',
      location: 'Jaipur, Rajasthan',
      duration: '2023 - 2026',
      grade: 'CGPA: 9+',
      specialization: 'Cyber Security & Information Technology',
      status: 'Current',
      description: 'Specialized program focusing on cybersecurity, information technology, and modern software development practices.',
      highlights: [
        'Dean\'s List for Academic Excellence',
        'Active in Coding Clubs and Tech Events',
        'Project Lead for Security Research',
        'Consistent High Performance'
      ]
    },
    {
      degree: 'Higher Secondary (Class 12)',
      institution: 'CBSE Board',
      location: 'India',
      duration: '2021 - 2023',
      grade: '90%',
      specialization: 'Science (PCB)',
      status: 'Completed',
      description: 'Strong foundation in Physics, Chemistry, and Biology with computer science electives.',
      highlights: [
        'Science Stream Excellence',
        'Computer Science Proficiency',
        'Vocational Training',
        'Academic Distinction'
      ]
    },
    {
      degree: 'Secondary (Class 10)',
      institution: 'RBSE Board',
      location: 'Rajasthan, India',
      duration: '2020 - 2021',
      grade: '99%',
      specialization: 'All Subjects',
      status: 'Completed',
      description: 'Outstanding academic performance with highest distinction across all subjects.',
      highlights: [
        'State Board Topper Performance',
        'Perfect Scores in Multiple Subjects',
        'Academic Excellence Award',
        'All-Round Academic Achievement'
      ]
    }
  ];

  const internships = [
    {
      title: 'Summer Internship Training',
      company: 'Linux World Technologies',
      duration: '2025',
      location: 'Jaipur, Rajasthan',
      description: 'Hands-on experience with CI/CD pipelines, Docker containerization, and Linux system administration.',
      technologies: ['Docker', 'CI/CD', 'Linux', 'Git', 'Jenkins'],
      status: 'Current'
    },
    {
      title: 'Web Development Intern',
      company: 'Pinnacle',
      duration: '2023',
      location: 'Remote',
      description: 'Learned web development basics including HTML, CSS, and responsive design principles.',
      technologies: ['HTML', 'CSS', 'Responsive Design'],
      status: 'Completed'
    }
  ];

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Education</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Academic journey and professional development experiences
          </p>
        </motion.div>

        {/* Education Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-purple-400 text-center">Academic Background</h2>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row gap-8 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                <div className="lg:w-1/2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="glass-effect p-8 rounded-2xl hover:glow-purple transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <GraduationCap className="w-8 h-8 text-purple-400" />
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          edu.status === 'Current' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {edu.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-white">{edu.degree}</h3>
                    <p className="text-purple-400 font-semibold mb-2">{edu.institution}</p>
                    
                    <div className="flex items-center space-x-4 mb-4 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{edu.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-semibold">
                        {edu.grade}
                      </span>
                      <span className="text-gray-400 text-sm">{edu.specialization}</span>
                    </div>

                    <p className="text-gray-300 mb-4">{edu.description}</p>

                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-purple-400">Key Highlights:</h4>
                      {edu.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <Trophy className="w-3 h-3 text-yellow-400" />
                          <span className="text-gray-400 text-sm">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                <div className="lg:w-1/2 flex items-center justify-center">
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="w-64 h-64 glass-effect rounded-full flex items-center justify-center"
                  >
                    <div className="text-center">
                      <GraduationCap className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-purple-400">
                        {edu.degree === 'Secondary (Class 10)' ? 'Scored: 99%' : edu.degree === 'Higher Secondary (Class 12)' ? 'Scored: 90%' : edu.grade}
                      </div>
                      <div className="text-white">
                        {edu.degree === 'Secondary (Class 10)' || edu.degree === 'Higher Secondary (Class 12)' ? 'Completed' : edu.status}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Internships */}
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl font-bold mb-12 text-purple-400 text-center">Professional Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="glass-effect p-6 rounded-2xl hover:glow-purple transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{internship.title}</h3>
                    <p className="text-purple-400 font-semibold">{internship.company}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    internship.status === 'Current' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {internship.status}
                  </span>
                </div>

                <div className="flex items-center space-x-4 mb-4 text-gray-400 text-sm">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{internship.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{internship.location}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{internship.description}</p>

                <div className="flex flex-wrap gap-2">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Education;