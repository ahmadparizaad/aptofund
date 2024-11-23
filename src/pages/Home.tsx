import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Rocket, TrendingUp, Shield, Users, Terminal, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: false, margin: "-50px" }
};

const fadeInDown = {
  initial: { opacity: 0, y: -30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
  viewport: { once: false, margin: "-50px" }
};

const stagger = {
  container: {
    initial: { opacity: 0 },
    whileInView: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.1,
        ease: "easeOut"
      }
    },
    viewport: { once: false, margin: "-50px" }
  },
  item: {
    initial: { opacity: 0, y: 30 },
    whileInView: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }
};

export const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 1], [0.95, 0.95]);

  return (
    <div className="relative min-h-screen">
      <motion.div 
        className="fixed inset-0 bg-gradient-to-r from-gray-900 to-gray-800 dark:from-black dark:to-gray-900"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center"
            variants={fadeInDown}
            initial="initial"
            whileInView="whileInView"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full mb-6 text-purple-400 border border-purple-500/20"
            >
              <Terminal className="w-4 h-4" />
              <code className="text-sm">npm install future</code>
            </motion.div>
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
            >
              Fund the Future of <span className="gradient-text">Innovation</span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl mb-8 text-gray-300 font-light"
            >
              Discover and support groundbreaking startups through blockchain-powered micro-funding
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/startups"
                className="group px-8 py-3 bg-white dark:bg-purple-600 text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-purple-500 hover:text-white dark:hover:bg-purple-700 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Code2 className="w-5 h-5" />
                  Explore Projects
                </span>
              </Link>
              <Link
                to="/start"
                className="group px-8 py-3 bg-transparent border border-white/20 text-white rounded-lg font-semibold hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  <Terminal className="w-5 h-5" />
                  Start a Project
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={stagger.container}
            initial="initial"
            whileInView="whileInView"
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div variants={stagger.item} className="gradient-border p-6 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-purple-900/50 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Secure by Design</h3>
              <p className="para font-light">
                <code className="text-purple-600 dark:text-purple-400">blockchain.verify()</code><br />
                Smart contracts ensure transparent and secure transactions
              </p>
            </motion.div>
            <motion.div variants={stagger.item} className="gradient-border p-6 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-pink-900/50 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="para w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Real-time Analytics</h3>
              <p className="para font-light">
                <code className="text-pink-600 dark:text-pink-400">data.stream()</code><br />
                Monitor investments and milestones in real-time
              </p>
            </motion.div>
            <motion.div variants={stagger.item} className="gradient-border p-6 bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-black dark:text-white">Community Driven</h3>
              <p className="para font-light">
                <code className="text-blue-600 dark:text-blue-400">community.build()</code><br />
                Join a network of developers and innovators
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full mb-6">
              <Rocket className="w-4 h-4 text-purple-400" />
              <code className="text-sm text-purple-400">git push origin future</code>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Deploy Your Vision?
            </h2>
            <p className="para text-xl mb-8 max-w-2xl mx-auto font-light">
              Join hundreds of successful startups who found their early adopters through our platform
            </p>
            <Link
              to="/start"
              className="inline-flex items-center gap-2 px-8 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300"
            >
              <Terminal className="w-5 h-5" />
              Initialize Project
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bottom-0 w-[100%] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Rocket className="h-8 w-8 text-purple-400" />
                <span className="font-bold text-xl text-white">LaunchPad</span>
              </div>
              <p className="para text-gray-400 text-sm">
                Empowering innovators to build the future through decentralized funding.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/startups" className="text-gray-400 hover:text-purple-400">
                    Explore Projects
                  </Link>
                </li>
                <li>
                  <Link to="/start" className="text-gray-400 hover:text-purple-400">
                    Start a Project
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-purple-400">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-white mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-purple-400">
                    Smart Contracts
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="font-semibold text-white mb-4">Connect</h3>
              <div className="flex space-x-4">
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-purple-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-purple-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-gray-400 hover:text-purple-400"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="whileInView"
            className="mt-8 pt-8 border-t border-gray-800"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="para text-gray-400 text-sm">
                © {new Date().getFullYear()} LaunchPad. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Heart className="w-4 h-4 text-red-500" />
                Built with love on Aptos
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}