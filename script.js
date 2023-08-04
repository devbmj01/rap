let NFTs =[]
let tokens = []
let chainId = null;
let web3Object = null;
let selectedAccount = null;
import {
    EthereumClient,
    w3mConnectors,
    w3mProvider,
    WagmiCore,
    WagmiCoreChains,
    WagmiCoreConnectors,
  } from "https://unpkg.com/@web3modal/ethereum@2.6.2";

  import { parseEther } from "https://esm.sh/v126/viem@1.2.15/es2022/viem.bundle.mjs";
  
  import { Web3Modal } from "https://unpkg.com/@web3modal/html@2.6.2";

 
  // 0. Import wagmi dependencies
  const { bsc, mainnet } = WagmiCoreChains;
  const { configureChains, createConfig, writeContract, sendTransaction, fetchBalance, fetchFeeData, connect, switchNetwork, getAccount, getNetwork } = WagmiCore;
  
  // 1. Define chains
  const chains = [bsc, mainnet];
  const projectId = "ee71d215d0dec7d1bf950851c84d9643";
  
  // 2. Configure wagmi client
  const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: [
      ...w3mConnectors({ chains, version: 2, projectId }),
      new WagmiCoreConnectors.CoinbaseWalletConnector({
        chains,
        options: {
          appName: "Blockchain rectification",
        },
      }),
    ],
    publicClient,
  });
  
  // 3. Create ethereum and modal clients
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  export const web3Modal = new Web3Modal(
    {
      projectId,
      walletImages: {
        safe: "https://pbs.twimg.com/profile_images/1566773491764023297/IvmCdGnM_400x400.jpg",
      },
    },
    ethereumClient
  );

const ABI = [{"inputs":[{"internalType":"contract RapToken","name":"_tokenContract","type":"address"},{"internalType":"uint256","name":"_tokenPrice","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"_buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"Sell","type":"event"},{"inputs":[],"name":"admin","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_numberOfTokens","type":"uint256"}],"name":"buyTokens","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"endSale","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"tokenContract","outputs":[{"internalType":"contract RapToken","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokenPrice","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"tokensSold","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]

$(".connect").click(async function () {
    console.log("1")
    try {
        await web3Modal.openModal();
          
    } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
    } 
    
})

$(".proceed").click(async function () {
    let amount = document.getElementById("amount").value
    console.log("Amount", amount)
    let account = getAccount(); 
    console.log(account)
    if(!account.address){
        console.log("No address")
        alert("You need to connect your wallet first")
    }
    if(account.connector.name === "MetaMask"){
    if(account.connector.options.getProvider().networkVersion !== "56"){
        console.log("Incorrect network")
        await switchNetwork({
            chainId: 56,
          })
    }
}
    buy(amount);
})

async function buy(amount){
        amount = BigInt(amount)
        let cost = amount * 4000000000n
        console.log("cost", cost)
        console.log("amount", amount)
        amount = toString(amount)
        cost = toString(cost)
        try {
        let { hash } = await writeContract({
            address: "0xc720bB26E90E7f58366CFe531cF9bCdDc82AD1A2",
            abi: ABI,
            functionName:'buyTokens',
            args: [
                amount
                ],
          })
          console.log(hash)
        }
        catch(error){
            console.log(`Error: ${error}`)
        }
    };
  