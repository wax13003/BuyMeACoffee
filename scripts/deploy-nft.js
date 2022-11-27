async function main() {
    // Grab the contract factory 
    const CoffeeNFT = await ethers.getContractFactory("CoffeeNFT");
 
    // Start deployment, returning a promise that resolves to a contract object
    const coffeeNFT = await CoffeeNFT.deploy(); // Instance of the contract 
    console.log("Contract deployed to address:", coffeeNFT.address);
 }
 
 main()
   .then(() => process.exit(0))
   .catch(error => {
     console.error(error);
     process.exit(1);
   });