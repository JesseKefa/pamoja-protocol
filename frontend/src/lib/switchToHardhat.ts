type EthereumError = {
  code?: number;
  message?: string;
};

type EthereumProvider = {
  request: (args: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export async function switchToFuji() {
  if (!window.ethereum) {
    alert("MetaMask is not installed.");
    return;
  }

  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xA869" }],
    });
  } catch (error: unknown) {
    const ethereumError = error as EthereumError;

    if (ethereumError.code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA869",
            chainName: "Avalanche Fuji Testnet",
            nativeCurrency: {
              name: "Avalanche",
              symbol: "AVAX",
              decimals: 18,
            },
            rpcUrls: [
              "https://api.avax-test.network/ext/bc/C/rpc",
            ],
            blockExplorerUrls: [
              "https://testnet.snowtrace.io/",
            ],
          },
        ],
      });
    } else {
      console.error(error);
    }
  }
}