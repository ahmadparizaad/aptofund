import { AptosWalletAdapterProvider, Wallet } from "@aptos-labs/wallet-adapter-react";
import { BitgetWallet } from "@bitget-wallet/aptos-wallet-adapter";
import { MartianWallet } from "@martianwallet/aptos-wallet-adapter";
import { TrustWallet } from "@trustwallet/aptos-wallet-adapter";
import { PropsWithChildren } from "react";
import { PetraWallet } from "petra-plugin-wallet-adapter"; // {{ edit_1 }}
// import { WelldoneWallet } from "welldone-plugin-wallet-adapter"; // {{ edit_2 }}
export const WalletProvider = ({ children }: PropsWithChildren) => {
  const wallets = [
    new BitgetWallet(),
    new MartianWallet(),
    new TrustWallet(),
    new PetraWallet(), // {{ edit_3 }}
    // new WelldoneWallet(), // {{ edit_4 }}
  ];
 
  return (
    <AptosWalletAdapterProvider
      plugins={wallets as readonly Wallet[]}
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