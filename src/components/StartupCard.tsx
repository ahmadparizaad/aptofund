import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Rocket, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Startup } from '../types/startup';

interface StartupCardProps {
  startup: Startup;
}

export const StartupCard: React.FC<StartupCardProps> = ({ startup }) => {
  const progress = (startup.fundsRaised / startup.fundingGoal) * 100;
  const timeLeft = formatDistanceToNow(new Date(startup.endDate), { addSuffix: true });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800  dark:border-solid dark:border-slate-500 dark:border-[1px] rounded-xl shadow-lg overflow-hidden"
    >
      <img 
        src={startup.imageUrl} 
        alt={startup.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
            {startup.category}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">Ends {timeLeft}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 dark:text-white">{startup.name}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{startup.description}</p>

        <div className="space-y-4">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div 
              className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>
                <span className="font-semibold dark:text-white">{startup.fundsRaised} APT</span>
                <span className="text-gray-500 dark:text-gray-400"> raised</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span className="font-semibold dark:text-white">{startup.fundingGoal} APT goal</span>
            </div>
          </div>

          <Link 
            to={`/startup/${startup.id}`}
            className="inline-flex items-center justify-center w-full gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
          >
            <Rocket className="w-4 h-4" />
            View Project
          </Link>
        </div>
      </div>
    </motion.div>
  );
}