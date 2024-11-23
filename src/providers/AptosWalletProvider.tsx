import { AptosWalletAdapterProvider } from "@aptos-labs/wallet-adapter-react";
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { PropsWithChildren } from "react";
 
export const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallets = [
    new BitgetWallet(),
    new MartianWallet(),
    new TrustWallet(),
  ];
 
  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={true}
      // dappConfig={{ network: Network.MAINNET }}
      onError={(error) => {
      console.log("error", error);
  }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};