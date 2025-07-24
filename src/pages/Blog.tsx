import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';

const Blog: React.FC = () => {
  const blogPosts = [
    {
      title: 'Getting Started with Docker: A Beginners Guide to Containerization',
      excerpt: 'Docker emerged as a practical solution: package the application plus everything it needs into a standardized, immutable unit called a container image.',
      date: '2025-07-19',
      readTime: '1 min read',
      category: 'DevOps',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Docker', 'Kubernetes', 'Security', 'CI/CD'],
      link: 'https://mycode-ops-chronicles03.blogspot.com/2025/07/getting-started-with-docker-beginners.html' // Add your actual blog link here
    },
    {
      title: 'Building Secure CI/CD Pipelines with Docker and Kubernetes',
      excerpt: 'Learn how to implement security best practices in your DevOps workflow while maintaining efficiency and scalability.',
      date: '2025-07-19',
      readTime: '8 min read',
      category: 'DevOps',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Docker', 'Kubernetes', 'Security', 'CI/CD'],
      link: 'https://mycode-ops-chronicles03.blogspot.com/2025/07/building-secure-cicd-pipelines-with.html' // Add your actual blog link here
    },
    {
      title: 'The Future of Cloud Security: Trends and Challenges',
      excerpt: 'Exploring emerging trends in cloud security, from zero-trust architecture to AI-powered threat detection.',
      date: '2025-07-19',
      readTime: '6 min read',
      category: 'Security',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Cloud Security', 'AI', 'Zero Trust', 'Cybersecurity'],
      link: 'https://mycode-ops-chronicles03.blogspot.com/2025/07/the-future-of-cloud-security-trends-and.html' // Add your actual blog link here
    },
    {
      title: 'Machine Learning in DevOps: Automating Infrastructure Decisions',
      excerpt: 'How machine learning algorithms can optimize resource allocation and predict infrastructure failures before they happen.',
      date: '2025-07-19',
      readTime: '10 min read',
      category: 'AI/ML',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Machine Learning', 'DevOps', 'Automation', 'Infrastructure'],
      link: 'https://mycode-ops-chronicles03.blogspot.com/2025/07/machine-learning-in-devops-automating.html#more' // Add your actual blog link here
    },
    {
      title: 'AWS Best Practices for Startups: Cost Optimization Strategies',
      excerpt: 'Essential AWS cost optimization techniques that every startup should implement to maximize their cloud investment.',
      date: '2024-02-28',
      readTime: '7 min read',
      category: 'Cloud',
      image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['AWS', 'Cost Optimization', 'Startups', 'Cloud Computing'],
      link: 'https://your-blog-url-4.com' // Add your actual blog link here
    },
    {
      title: 'Cryptography in Modern Applications: A Practical Guide',
      excerpt: 'Understanding cryptographic protocols and their implementation in real-world applications for enhanced security.',
      date: '2024-02-20',
      readTime: '12 min read',
      category: 'Security',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Cryptography', 'Security', 'Encryption', 'Privacy'],
      link: 'https://your-blog-url-5.com' // Add your actual blog link here
    },
    {
      title: 'Python for DevOps: Essential Libraries and Tools',
      excerpt: 'A comprehensive guide to Python libraries and tools that every DevOps engineer should know for automation and monitoring.',
      date: '2024-02-15',
      readTime: '9 min read',
      category: 'Development',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=400',
      tags: ['Python', 'DevOps', 'Automation', 'Tools'],
      link: 'https://your-blog-url-6.com' // Add your actual blog link here
    }
  ];

  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Blog</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Thoughts, insights, and tutorials on DevOps, security, and modern technology
          </p>
        </motion.div>

        {/* Blog Slider with Flip Cards */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-none" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          <div className="flex gap-8 min-w-[340px]" style={{ scrollSnapType: 'x mandatory' }}>
            {blogPosts.map((post, index) => (
          <motion.div
                key={post.title}
                className="relative flex-shrink-0 w-80 h-[340px] cursor-pointer"
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
                    <h3 className="text-xl font-bold mb-2 text-white text-center px-2 line-clamp-2">{post.title}</h3>
                  </div>
                  {/* Card Back */}
                  <div className="absolute inset-0 w-full h-full glass-effect rounded-2xl shadow-xl flex flex-col justify-between items-center p-6 flip-back">
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-white text-center">{post.title}</h3>
                      <p className="text-gray-400 mb-4 text-sm leading-relaxed text-center line-clamp-4">
                  {post.excerpt}
                </p>
                </div>
                <motion.a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                      whileHover={{ scale: 1.08 }}
                      className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors bg-gray-800 px-4 py-2 rounded-lg font-semibold shadow mt-4"
                >
                  <span>Read More</span>
                      <ArrowRight size={18} />
                </motion.a>
              </div>
                </motion.div>
            </motion.div>
          ))}
          </div>
        </div>
        {/* Flip card styles */}
        <style>{`
          .flip-front { transform: rotateY(0deg); backface-visibility: hidden; }
          .flip-back { transform: rotateY(180deg); backface-visibility: hidden; }
        `}</style>

        {/* Hide scrollbars for all browsers */}
        <style>{`
          .scrollbar-none::-webkit-scrollbar { display: none; }
          .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        {/* Blog Stats */}
        <motion.div
          variants={itemVariants}
          className="mt-16 grid grid-cols-1 gap-8 max-w-4xl mx-auto"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <BookOpen className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <div className="text-2xl font-bold text-purple-400 mb-2">7+</div>
            <div className="text-gray-400">Articles Published</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Blog;