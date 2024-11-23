import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Search, Filter } from 'lucide-react';
import { StartupCard } from '../components/StartupCard';
import type { Startup } from '../types/startup';

export const Startups: React.FC = () => {
  const [search, setSearch] = React.useState('');
  const [category, setCategory] = React.useState('');

  // Mock data - replace with actual API call
  const startups: Startup[] = [
    {
      id: '1',
      name: 'EcoTech Solutions',
      description: 'Building sustainable technology solutions for a greener future. Our innovative approach combines renewable energy with AI to optimize resource usage.',
      fundingGoal: 100000,
      fundsRaised: 65000,
      owner: '0x123...',
      imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      category: 'CleanTech',
      createdAt: '2024-02-01',
      endDate: '2024-04-01'
    },
    {
      id: '2',
      name: 'DeFi Protocol',
      description: 'Next-generation decentralized finance protocol enabling seamless cross-chain transactions and automated market making.',
      fundingGoal: 150000,
      fundsRaised: 89000,
      owner: '0x456...',
      imageUrl: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      category: 'FinTech',
      createdAt: '2024-02-15',
      endDate: '2024-05-15'
    },
    {
      id: '3',
      name: 'HealthAI',
      description: 'AI-powered healthcare diagnostics platform that helps doctors make more accurate diagnoses through machine learning.',
      fundingGoal: 200000,
      fundsRaised: 45000,
      owner: '0x789...',
      imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
      category: 'HealthTech',
      createdAt: '2024-03-01',
      endDate: '2024-06-01'
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(search.toLowerCase()) ||
                         startup.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || startup.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen code-pattern py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <code>cd ..</code>
        </Link>

        <div className="gradient-border bg-white mb-8">
          <div className="terminal-bg p-4 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <code className="text-sm ml-2">projects.list()</code>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <label className="block text-sm font-medium method text-gray-700 mb-1">
                  <code>search.query</code>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  <Search className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                </div>
              </div>

              <div className="md:w-64">
                <label className="method block text-sm font-medium text-gray-700 mb-1">
                  <code>filter.category</code>
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                  >
                    <option value="">All Categories</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Blockchain">Blockchain</option>
                  </select>
                  <Filter className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStartups.map(startup => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>

            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <Terminal className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No projects found</h3>
                <p className="text-gray-500">
                  <code>results.length === 0</code>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};