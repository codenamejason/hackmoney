
Imp; 'ethers' from 'ethers';


// You don't need truffle artifacts, as long as you have a way to retrieve
// the address and abi of the deployed contract nicely
// const ContractWithFlashLoanArtifact = require("./build/contracts/FlashLoan.json");

const contractWithFlashLoanAddress = 0x84affFe04400457f09399B60300607Ab733371Da;
//   ContractWithFlashLoanArtifact.networks["1"].address;

const contractWithFlashLoan = new ethers.Contract(
  contractWithFlashLoanAddress,
  ContractWithFlashLoanArtifact.abi,
  wallet
);

// const main = async () => {
//   // Encoding our custom data
//   const myCustomDataEncoded = ethers.utils.defaultAbiCoder.encode(
//     ["address", "uint"],
//     ["0x0000000000000000000000000000000000000000", 42]
//   );

//   const tx = await contractWithFlashLoan.initateFlashLoan(
//     contractWithFlashLoanAddress, // The callback function is located in the same contract
//     legos.erc20.dai.address, // We would like to loan DAI
//     ethers.utils.parseEther("1"), // We would like to loan 1 DAI in 18 decimals
//     myCustomDataEncoded, // _params encoded
//     {
//       gasLimit: 4000000,
//     }
//   );
//   await tx.wait();
// };
