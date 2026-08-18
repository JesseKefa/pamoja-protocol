type EthereumError = {
  code?: number;
  message?: string;
  data?: unknown;
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
  if (typeof window === "undefined" || !window.ethereum) {
    alert("MetaMask is not installed.");
    return false;
  }

  const ethereum = window.ethereum;

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: "0xA869",
        },
      ],
    });

    console.log("Successfully switched to Avalanche Fuji.");

    return true;
  } catch (error: unknown) {
    const ethereumError = error as EthereumError;

    console.log("Fuji switch error:", {
      code: ethereumError.code,
      message: ethereumError.message,
      data: ethereumError.data,
      error,
    });

    // Fuji is not yet added to MetaMask
    if (ethereumError.code === 4902) {
      try {
        await ethereum.request({
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

        console.log("Avalanche Fuji added successfully.");

        return true;
      } catch (addError: unknown) {
        const errorInfo = addError as EthereumError;

        console.error("Failed to add Avalanche Fuji:", {
          code: errorInfo.code,
          message: errorInfo.message,
          data: errorInfo.data,
          error: addError,
        });

        return false;
      }
    }

    // User rejected the request
    if (ethereumError.code === 4001) {
      console.log("User rejected the network switch.");
      return false;
    }

    console.error("Failed to switch to Avalanche Fuji:", {
      code: ethereumError.code,
      message: ethereumError.message,
      data: ethereumError.data,
    });

    return false;
  }
}