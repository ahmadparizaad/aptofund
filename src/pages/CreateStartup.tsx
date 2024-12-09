import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Code2, Upload, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { aptos } from '../utils/aptosConfig'
import { APTOS_CONFIG } from '../config/aptos'
import { useWallet } from '@aptos-labs/wallet-adapter-react'; 

interface CreateStartupForm {
  name: string;
  description: string;
  fundingGoal: number;
  category: string;
  milestones: string;
  // endDate: string;
  videoUrl: string;
}

export const CreateStartup: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CreateStartupForm>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { account, signAndSubmitTransaction } = useWallet();

  useEffect(() => {
  console.log(account);
  }, [account])
  


  const onSubmit = async (data: CreateStartupForm) => {

    if(account == null) {
      throw new Error("Unable to find account to sign transaction")
  }
    console.log(data);
    setIsSubmitting(true);

    const videoFile = data.videoUrl[0];
    console.log(videoFile);
    
    if (!videoFile) {
      toast.error('Please select a video file');
      return;
    }

    const formData = new FormData();
    formData.append('file', videoFile);
    const metadata = JSON.stringify({
      name: data.name,
      keyvalues: {
        founder: account.address,
        description: data.description,
        milestones: data.milestones,
        category: data.category,
        funding_goal: data.fundingGoal,
        total_funded: 0
      }
      
    })
    formData.append("pinataMetadata", metadata)
    formData.append('pinataOptions', JSON.stringify({
      cidVersion: 1,
    }));

    try {
      await fetch(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
        },
        body: formData,
      }
    )
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


  } catch(error:any){
      console.log("Failed to upload on IPFS", error);
  }
    try {
      const payload = {
        type: 'entry_function_payload',
        function: `${APTOS_CONFIG.moduleAddress}::StartupsMicroFunding::create_startup`,
        type_arguments: [],
        arguments: [
          account.address,
          data.fundingGoal
        ],
      };
      const response = await signAndSubmitTransaction(payload);
      console.log(response);

      try {
        await aptos.waitForTransaction({ transactionHash: response?.hash });
      } catch (error) {
        console.error(error);
      }
      toast.success('Startup created successfully!');
      navigate('/startups');
    } catch (error) {
      toast.error('Failed to create startup. Please try again.');
      console.error('Transaction failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen code-pattern py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <code>cd ..</code>
        </Link>

        <div className="gradient-border bg-white">
          <div className="terminal-bg p-4 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <code className="text-sm ml-2">new Project()</code>
            </div>
          </div>

          <div className="p-8">
            <h1 className="method text-3xl font-bold mb-8 flex items-center gap-3">
              <Terminal className="w-8 h-8 text-purple-600" />
              Initialize Your Project
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="para para block text-sm font-medium text-gray-700 mb-1">
                  <code>project.name</code>
                </label>
                <input
                  {...register('name', { required: 'Project name is required' })}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter project name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="para block text-sm font-medium text-gray-700 mb-1">
                  <code>project.description</code>
                </label>
                <textarea
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your project"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label className="para block text-sm font-medium text-gray-700 mb-1">
                  <code>project.milestones</code>
                </label>
                <textarea
                  {...register('milestones', { required: 'Milestone is required' })}
                  rows={4}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="What are your Milestones"
                />
                {errors.milestones && (
                  <p className="mt-1 text-sm text-red-600">{errors.milestones.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="para block text-sm font-medium text-gray-700 mb-1">
                    <code>project.fundingGoal</code>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      {...register('fundingGoal', { 
                        required: 'Funding goal is required',
                        min: { value: 1, message: 'Minimum funding goal is 1 APT' }
                      })}
                      className="w-full pl-4 pr-12 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="0.00"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">APT</span>
                  </div>
                  {errors.fundingGoal && (
                    <p className="mt-1 text-sm text-red-600">{errors.fundingGoal.message}</p>
                  )}
                </div>

                <div>
                  <label className="para block text-sm font-medium text-gray-700 mb-1">
                    <code>project.category</code>
                  </label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select category</option>
                    <option value="CleanTech">CleanTech</option>
                    <option value="FinTech">FinTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="EdTech">EdTech</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Blockchain">Blockchain</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* <div>
                <label className="para block text-sm font-medium text-gray-700 mb-1">
                  <code>project.endDate</code>
                </label>
                <input
                  type="date"
                  {...register('endDate', { required: 'End date is required' })}
                  className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.endDate.message}</p>
                )}
              </div> */}

              <div>
                <label className="para block text-sm font-medium text-gray-700 mb-1">
                  <code>project.video</code>
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="video/*"
                    {...register('videoUrl', { required: 'Video is required'})}
                    className="w-full px-4 py-2 bg-gray-200 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pl-10"
                  />
                  <Upload className="w-4 h-4 text-gray-500 absolute left-3 top-3" />
                </div>
                {errors.videoUrl && (
                  <p className="mt-1 text-sm text-red-600">{errors.videoUrl.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Code2 className="w-5 h-5 animate-spin" />
                    Deploying...
                  </>
                ) : (
                  <>
                    <Rocket className="w-5 h-5" />
                    Deploy Project
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};