import { WalletName, useWallet } from '@aptos-labs/wallet-adapter-react';
 
const WalletConnect = () => {
  const { connect, disconnect, account, connected } = useWallet();
 
  const handleConnect = async () => {
    try {
      // Change below to the desired wallet name instead of "Petra"
      await connect("Martian" as WalletName<"Martian">); 
      if(account){
      console.log('Connected to wallet:', account);
      }
    } catch (error) {
      console.error('Failed to connect to wallet:', error);
    }
  };
 
  const handleDisconnect = async () => {
    try {
      await disconnect();
      console.log('Disconnected from wallet');
    } catch (error) {
      console.error('Failed to disconnect from wallet:', error);
    }
  };
 
  return (
    <div>
        {connected ? (
          <>
          <div className='flex ml-2 mr-4'>
            <button className='group px-4 py-2 bg-white dark:bg-purple-500 text-gray-900 dark:text-white rounded-3xl font-semibold hover:bg-purple-500 hover:text-white dark:hover:bg-purple-700 transition-all duration-300' onClick={handleDisconnect}>
            {account?.address ? `${account?.address.substring(0, 4)}...${account?.address.substring(account?.address.length - 3)}` : ''}
            </button>
          </div>
          </>
        ) : (
          <button className='group px-4 py-2 bg-white dark:bg-purple-500 text-gray-900 dark:text-white rounded-3xl font-semibold hover:bg-purple-500 hover:text-white dark:hover:bg-purple-700 transition-all duration-300' onClick={handleConnect}>Connect Wallet</button>
        )}
    </div>
  );
};
 
export default WalletConnect;