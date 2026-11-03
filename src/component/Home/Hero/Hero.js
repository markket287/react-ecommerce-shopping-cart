import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import './Hero.css';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const floatAnimation = (delay = 0) => ({
  y: [0, -14, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-inner">
        {/* Left side: text */}
        <motion.div
          className="hero-content"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.span className="hero-badge" variants={item}>
            ✨ New Season Sale — Up to 40% OFF
          </motion.span>

          <motion.h1 className="hero-title" variants={item}>
            Discover <span>Premium</span> Products, Delivered Fast
          </motion.h1>

          <motion.p className="hero-text" variants={item}>
            Shop the latest laptops, cameras and gadgets from top brands at
            unbeatable prices, with secure payment and easy returns.
          </motion.p>

          <motion.div className="hero-buttons" variants={item}>
            <Link to="/shop" className="btn-primary">
              Shop Now →
            </Link>
            <Link to="/review" className="btn-outline" >
              Review Order
            </Link>
          </motion.div>

          <motion.div className="hero-stats" variants={item}>
            <div>
              <strong>10K+</strong>
              <span>Happy Customers</span>
            </div>
            <div>
              <strong>500+</strong>
              <span>Premium Products</span>
            </div>
            <div>
              <strong>4.9★</strong>
              <span>Average Rating</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right side: animated visual */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
        >
          <motion.div
            className="hero-ring"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />

          <div className="hero-circle">
            <motion.div className="hero-main-emoji" animate={floatAnimation(0)}>
              💻
            </motion.div>
          </div>

          <motion.div className="float-card card-top" animate={floatAnimation(0.5)}>
            <span className="float-emoji">🎧</span>
            <div>
              <b>Headphones</b>
              <small>From $49</small>
            </div>
          </motion.div>

          <motion.div className="float-card card-bottom" animate={floatAnimation(1)}>
            <span className="float-emoji">📷</span>
            <div>
              <b>Cameras</b>
              <small>From $199</small>
            </div>
          </motion.div>

          <motion.div className="float-card card-left" animate={floatAnimation(1.5)}>
            <span className="float-emoji">⌚</span>
            <div>
              <b>Smart Watch</b>
              <small>From $89</small>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;