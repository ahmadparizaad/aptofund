import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal, Code2, GitBranch, GitCommit, GitPullRequest, Shield, Cpu, Rocket } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen code-pattern py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-8">
          <ArrowLeft className="w-4 h-4" />
          <code>cd ..</code>
        </Link>

        <div className="gradient-border bg-gray-200">
          <div className="terminal-bg p-4 rounded-t-xl">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <code className="text-sm ml-2">cat README.md</code>
            </div>
          </div>

          <div className="p-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-8 h-8 text-purple-600" />
                <h1 className="method text-3xl font-bold">About LaunchPad</h1>
              </div>

              <div className="prose prose-gray max-w-none">
                <div className="code-block mb-8">
                  <code className="text-purple-400">// Revolutionizing startup funding through blockchain technology</code>
                </div>

                <h2 className="method flex items-center gap-2 text-xl font-semibold mb-4">
                  <GitBranch className="w-5 h-5 text-purple-600" />
                  Our Mission
                </h2>
                <p className="para text-gray-600 mb-8">
                  LaunchPad bridges the gap between innovative startups and early adopters through 
                  blockchain-powered micro-funding. We believe in democratizing access to startup 
                  investments while ensuring transparency and security through smart contracts.
                </p>

                <h2 className="method flex items-center gap-2 text-xl font-semibold mb-4">
                  <GitCommit className="w-5 h-5 text-purple-600" />
                  Core Features
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="gradient-border p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="w-5 h-5 text-purple-600" />
                      <h3 className="method font-semibold">Secure Transactions</h3>
                    </div>
                    <p className="para text-gray-600 text-sm">
                      Smart contracts ensure transparent and immutable transaction records on the 
                      Aptos blockchain.
                    </p>
                  </div>
                  <div className="gradient-border p-4 bg-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Cpu className="w-5 h-5 text-purple-600" />
                      <h3 className="method font-semibold">Automated Escrow</h3>
                    </div>
                    <p className="para text-gray-600 text-sm">
                      Funds are held securely in smart contracts until project milestones are achieved.
                    </p>
                  </div>
                </div>

                <h2 className="method flex items-center gap-2 text-xl font-semibold mb-4">
                  <GitPullRequest className="w-5 h-5 text-purple-600" />
                  Technology Stack
                </h2>
                <div className="code-block mb-8">
                  <code>
                    <span className="text-blue-400">const</span>{" "}
                    <span className="text-purple-400">techStack</span> = {"{"}
                    <br />
                    {"  "}blockchain: <span className="text-green-400">"Aptos"</span>,
                    <br />
                    {"  "}frontend: <span className="text-green-400">"React + Vite"</span>,
                    <br />
                    {"  "}backend: <span className="text-green-400">"Node.js + Express"</span>,
                    <br />
                    {"  "}database: <span className="text-green-400">"MongoDB"</span>
                    <br />
                    {"}"};
                  </code>
                </div>

                <div className="gradient-border p-6 bg-white mb-8">
                  <h2 className="method flex items-center gap-2 text-xl font-semibold mb-4">
                    <Code2 className="w-5 h-5 text-purple-600" />
                    Quick Start
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-purple-600">01</span>
                      </div>
                      <div>
                        <h3 className="method font-semibold mb-1">Connect Wallet</h3>
                        <p className="para text-gray-600 text-sm">
                          Link your Aptos wallet to start investing or create projects
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-purple-600">02</span>
                      </div>
                      <div>
                        <h3 className="method font-semibold mb-1">Browse Projects</h3>
                        <p className="para text-gray-600 text-sm">
                          Explore innovative startups across various technology sectors
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-purple-600">03</span>
                      </div>
                      <div>
                        <h3 className="method font-semibold mb-1">Invest or Create</h3>
                        <p className="para text-gray-600 text-sm">
                          Back promising projects or launch your own startup campaign
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Link
                    to="/startups"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    <Rocket className="w-5 h-5" />
                    Explore Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};