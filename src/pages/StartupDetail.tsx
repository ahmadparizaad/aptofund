import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Target, Users, Calendar, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import toast from 'react-hot-toast';

export const StartupDetail: React.FC = () => {
  const { id } = useParams();
  const { connected, signAndSubmitTransaction } = useWallet();
  const [isInvesting, setIsInvesting] = React.useState(false);
  const [amount, setAmount] = React.useState('');

  // Mock data - replace with actual API call
  const startup = {
    id,
    name: 'EcoTech Solutions',
    description: 'Building sustainable technology solutions for a greener future. Our innovative approach combines renewable energy with AI to optimize resource usage and reduce carbon footprint.',
    fundingGoal: 100000,
    fundsRaised: 65000,
    owner: '0x123...',
    imageUrl: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
    category: 'CleanTech',
    createdAt: '2024-02-01',
    endDate: '2024-04-01',
  };

  const handleInvest = async () => {
    if (!connected) {
      toast.error('Please connect your wallet first');
      return;
    }

    try {
      setIsInvesting(true);
      const payload = {
        type: 'entry_function_payload',
        function: '${moduleAddress}::micro_funding::invest',
        type_arguments: [],
        arguments: [startup.id, parseFloat(amount)],
      };

      const response = await signAndSubmitTransaction(payload);
      toast.success('Investment successful!');
      console.log('Transaction successful:', response);
    } catch (error) {
      toast.error('Investment failed. Please try again.');
      console.error('Transaction failed:', error);
    } finally {
      setIsInvesting(false);
    }
  };

  const progress = (startup.fundsRaised / startup.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/startups" className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <img 
            src={startup.imageUrl}
            alt={startup.name}
            className="w-full h-96 object-cover"
          />
          
          <div className="p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                {startup.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-4">{startup.name}</h1>
            <p className="text-gray-600 mb-8">{startup.description}</p>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Funding Goal</p>
                  <p className="font-semibold">{startup.fundingGoal} APT</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Funds Raised</p>
                  <p className="font-semibold">{startup.fundsRaised} APT</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-semibold">{new Date(startup.endDate).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount in APT"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleInvest}
                  disabled={isInvesting || !amount}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isInvesting ? (
                    'Processing...'
                  ) : (
                    <>
                      <Rocket className="w-4 h-4" />
                      Invest Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};