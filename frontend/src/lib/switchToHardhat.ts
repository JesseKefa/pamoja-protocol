export async function switchToHardhat() {
  if (!window.ethereum) {
    alert("MetaMask is not installed.");
    return;
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x7A69" }],
    });
  } catch (error: any) {
    if (error.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x7A69",
            chainName: "Hardhat Local",
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: ["http://127.0.0.1:8545"],
          },
        ],
      });
    } else {
      console.error(error);
    }
  }
}