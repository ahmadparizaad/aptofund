import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { WalletProvider } from './providers/AptosWalletProvider';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { StartupDetail } from './pages/StartupDetail';
import { CreateStartup } from './pages/CreateStartup';
import { Startups } from './pages/Startups';
import { About } from './pages/About';
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";

function App() {
  return (
    <WalletProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/startup/:id" element={<StartupDetail />} />
            <Route path="/start" element={<CreateStartup />} />
            <Route path="/startups" element={<Startups />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Toaster position="bottom-right" />
        </div>
      </Router>
    </WalletProvider>
  );
}

export default App;