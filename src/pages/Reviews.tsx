import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, User, ThumbsUp, Send, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ftcukahagjrgzwvixfbh.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0Y3VrYWhhZ2pyZ3p3dml4ZmJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMzNDMzMjAsImV4cCI6MjA2ODkxOTMyMH0.08pktuZo_INFBD0oJlYQo46Pwg0XkrMPqbhus6p3zLE';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

interface Review {
  id: string;
  name: string;
  email: string;
  company: string;
  position?: string;
  rating: number;
  comment: string;
  created_at: string;
  likes?: number;
  avatar?: string;
}

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    rating: 0,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  // Load reviews from Supabase on component mount
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
      // If no reviews, seed with a few samples
      if (data && data.length === 0) {
        const samples = [
          { company: 'Portfolio Visitor', name: 'Amit', email: 'amit@example.com', rating: 5, comment: 'Good job Natasha!' },
          { company: 'Portfolio Visitor', name: 'Priya', email: 'priya@example.com', rating: 5, comment: 'Keep it up!' },
        ];
        for (const sample of samples) {
          await supabase.from('reviews').insert([{ ...sample, edit_token: Math.random().toString(36).slice(2) }]);
        }
        const { data: seeded } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false });
        if (seeded) setReviews(seeded);
      }
    };
    fetchReviews();
  }, []);

  // Add or edit review
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.comment || formData.rating === 0) {
      toast.error('Please fill in all required fields and provide a rating');
      return;
    }
    // Generate a simple edit token
    const edit_token = Math.random().toString(36).slice(2);
    const { error } = await supabase.from('reviews').insert([
      { ...formData, edit_token }
    ]);
    if (!error) {
      toast.success('Thank you for your review! It has been published.');
      // Refresh reviews
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        rating: 0,
        comment: ''
      });
    } else {
      toast.error('Error submitting review.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLike = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, likes: (review.likes ?? 0) + 1 }
        : review
    ));
    toast.success('Thanks for the like!');
  };

  // Mask email for display
  const maskEmail = (email: string) => {
    const [user, domain] = email.split('@');
    if (!user || !domain) return email;
    return user.slice(0, 3) + '*****' + user.slice(-1) + '@' + domain;
  };

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type={interactive ? "button" : undefined}
            whileHover={interactive ? { scale: 1.2 } : {}}
            whileTap={interactive ? { scale: 0.9 } : {}}
            onClick={interactive && onRate ? () => onRate(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
            className={interactive ? "cursor-pointer" : "cursor-default"}
            disabled={!interactive}
          >
            <Star
              size={interactive ? 24 : 16}
              className={`${
                star <= (interactive ? (hoveredRating || formData.rating) : rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-400'
              } transition-colors`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : '0.0';

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

  // Helper to check if review is within 30 minutes of creation
  const canEditOrDelete = (created_at: string) => {
    const created = new Date(created_at).getTime();
    const now = Date.now();
    return now - created < 30 * 60 * 1000; // 30 minutes in ms
  };

  // Delete review logic
  const handleDelete = async (review: any) => {
    const email = prompt('To delete this review, please enter the email you used:');
    if (!email) return;
    if (email.trim().toLowerCase() !== review.email.trim().toLowerCase()) {
      toast.error('Email does not match. Cannot delete review.');
      return;
    }
    const { error } = await supabase.from('reviews').delete().eq('id', review.id);
    if (!error) {
      toast.success('Review deleted successfully.');
      // Refresh reviews
      const { data } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setReviews(data);
    } else {
      toast.error('Error deleting review.');
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">Reviews & Testimonials</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            What colleagues and clients say about working with me
          </p>
        </motion.div>

        {/* Review Statistics */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">{reviews.length}</div>
            <div className="text-gray-400">Total Reviews</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="flex items-center justify-center mb-2">
              <span className="text-3xl font-bold text-purple-400 mr-2">{averageRating}</span>
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-gray-400">Average Rating</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect p-6 rounded-xl text-center"
          >
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {reviews.length > 0 ? Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100) : 0}%
            </div>
            <div className="text-gray-400">Satisfaction Rate</div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Review Form */}
          <motion.div variants={itemVariants}>
            <div className="glass-effect p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6 text-purple-400 flex items-center">
                <MessageCircle className="w-6 h-6 mr-2" />
                Leave a Review
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
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
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-300 mb-2">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
                      placeholder="Your Position"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {renderStars(formData.rating, true, (rating) => setFormData({...formData, rating}))}
                    <span className="text-gray-400 ml-2">
                      {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-2">
                    Review *
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full glass-effect rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all resize-none"
                    placeholder="Share your experience working with me..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full glass-effect glow-purple py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:bg-purple-500/20 transition-all"
                >
                  <Send size={20} />
                  <span>Submit Review</span>
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Reviews Display */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-bold mb-6 text-purple-400">Recent Reviews</h2>
            <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="glass-effect p-6 rounded-xl hover:glow-purple transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {review.avatar ? (
                        <img
                          src={review.avatar}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-purple-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-white">{review.name}</h3>
                          {review.company && (
                            <p className="text-sm text-gray-400">{review.company}</p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">{maskEmail(review.email)}</p>
                        </div>
                        <div className="text-right">
                          {renderStars(review.rating)}
                          <p className="text-xs text-gray-500 mt-1">{review.created_at?.slice(0, 10)}</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">{review.comment}</p>
                      
                      <div className="flex items-center justify-between">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLike(review.id)}
                          className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
                        >
                          <ThumbsUp size={16} />
                          <span className="text-sm">{review.likes ?? 0}</span>
                        </motion.button>
                        {/* Delete button, only if within 30 minutes */}
                        {canEditOrDelete(review.created_at) && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleDelete(review)}
                            className="ml-4 text-xs text-red-400 hover:text-red-600 font-semibold px-2 py-1 rounded border border-red-400 bg-red-400/10 transition-colors"
                          >
                            Delete
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Reviews;