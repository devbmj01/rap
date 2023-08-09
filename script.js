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

  import { parseEther, parseUnits, formatUnits, toHex } from "https://esm.sh/v126/viem@1.2.15/es2022/viem.bundle.mjs";
  
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

const ABI = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"setter","type":"address"},{"indexed":false,"internalType":"uint256","name":"price","type":"uint256"}],"name":"PriceForOneTokenChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"setter","type":"address"},{"indexed":false,"internalType":"address","name":"token","type":"address"}],"name":"TokenAddressSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"buyer","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"TokenBought","type":"event"},{"inputs":[],"name":"Token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"buy","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"claimProfits","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"claimTokensNotSold","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address[]","name":"_contracts","type":"address[]"}],"name":"connectToOtherContracts","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"exchangeRate","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"priceForOneToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"price","type":"uint256"}],"name":"updatePriceForOneToken","outputs":[],"stateMutability":"nonpayable","type":"function"}]
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
  console.log("Initial amount ", amount)
  amount = parseUnits(amount, 18) 
        console.log("amount", amount)
        // amount = formatUnits(amount, 9)
        // console.log("amount 2  ", amount)

  amount = amount.toString()

        try {
        let { hash } = await writeContract({
            address: "0x10182F7B3440c5F9da90f90c03d6faF6038214e1",
            abi: ABI,
            functionName:'buy',
            value: amount
          })
          console.log(hash)
        }
        catch(error){
            console.log(`Error: ${error}`)
        }
    };

    