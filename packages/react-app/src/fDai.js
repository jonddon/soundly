import ethers from "ethers";

const abi = ["function balanceOf(address owner) view returns(uint256)"];

const goerli_address = "0xf2d68898557ccb2cf4c10c3ef2b034b2a69dad00";

const fDaix = new ethers.Contract(goerli_address, abi, ethers.getDefaultProvider());

export async function getBalance(address) {
  await fDaix.balanceOf(address);
}
