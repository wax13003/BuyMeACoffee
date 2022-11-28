require('dotenv').config();
const { ethers } = require("ethers");
const contract = require("../artifacts/contracts/CoffeeNFT.sol/CoffeeNFT.json");
const {
   API_URL,
   PRIVATE_KEY,
   PUBLIC_KEY,
   CONTRACT_ADDRESS,
   USER_ADDRESS
} = process.env;
const provider = new ethers.providers.JsonRpcProvider(API_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

//Grab contract ABI and create an instance
const nftContract = new ethers.Contract(
   CONTRACT_ADDRESS,
   contract.abi,
   wallet
);

// Call transferNFT function
const transferNFT = async () => {
    //Get gas price
    const gasPrice = await provider.getGasPrice();

    // const tokenId = 2;

    //Estimate gas limit
    const gasLimit = await nftContract.estimateGas["safeTransferFrom(address,address,uint256)"](PUBLIC_KEY, USER_ADDRESS, tokenId, { gasPrice });

    //Call the safetransfer method
    const transaction = await nftContract["safeTransferFrom(address,address,uint256)"](PUBLIC_KEY, USER_ADDRESS, tokenId, { gasLimit });
    
    //Wait for the transaction to complete
    await transaction.wait()
    console.log("Transaction Hash: ", transaction.hash);
}

transferNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });