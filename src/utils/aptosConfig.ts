import { Aptos, AptosConfig, Network } from "@aptos-labs/ts-sdk";
 
// Specify which network to connect to via AptosConfig
  console.log(
    "This example will create two accounts (Alice and Bob), fund them, and transfer between them.",
  );
 
  // Setup the client
  const config = new AptosConfig({ network: Network.TESTNET });
  export const aptos = new Aptos(config);

const ledgerInfo = await aptos.getLedgerInfo();
const modules = await aptos.getAccountModules({ accountAddress: "0xf61756d7f92323d850cfd907e9c2f6f17c61d10104c126616cddda3f57fb2df3" });
const tokens = await aptos.getAccountOwnedTokens({ accountAddress: "0xf61756d7f92323d850cfd907e9c2f6f17c61d10104c126616cddda3f57fb2df3" });

// console.log("Ledger info: ", ledgerInfo);
// console.log("Modules: ", modules);
// console.log("Tokens: ", tokens);

