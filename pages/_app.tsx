import styles from "@/styles/Home.module.css";
import "@/styles/globals.css";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WagmiConfig } from "wagmi";
import {
  arbitrum,
  avalanche,
  bsc,
  fantom,
  gnosis,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { DataProvider } from "../src/context";

const chains = [
  mainnet,
  polygon,
  avalanche,
  arbitrum,
  bsc,
  optimism,
  gnosis,
  fantom,
  sepolia,
];

// 1. Get projectID at https://cloud.walletconnect.com

const projectId = "b81878c6489fb464ef61dc28ce066442";

const metadata = {
  name: "Next Starter Template",
  description: "A Next.js starter template with Web3Modal v3 + Wagmi",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({ wagmiConfig, projectId, chains });

export default function App({ Component, pageProps }: AppProps) {
  const [ready, setReady] = useState(false);
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const router = useRouter();

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <SessionProvider>
            <DataProvider>
              <header>
                <div
                  className={styles.backdrop}
                  style={{
                    opacity:
                      isConnectHighlighted || isNetworkSwitchHighlighted
                        ? 1
                        : 0,
                  }}
                />
                <div className={styles.header}>
                  <div className={styles.routesContainer}>
                    <div
                      className={styles.logo}
                      onClick={() => router.push("/")}
                    >
                      <h1>{"D'WELL"}</h1>
                    </div>
                    <div
                      className={styles.route}
                      onClick={() => router.push("/collection")}
                    >
                      <h1>My Collection</h1>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <div
                      onClick={closeAll}
                      className={`${styles.highlight} ${
                        isNetworkSwitchHighlighted
                          ? styles.highlightSelected
                          : ``
                      }`}
                    >
                      <w3m-network-button />
                    </div>
                    <div
                      onClick={closeAll}
                      className={`${styles.highlight} ${
                        isConnectHighlighted ? styles.highlightSelected : ``
                      }`}
                    >
                      <w3m-button />
                    </div>
                  </div>
                </div>
              </header>
              <Component {...pageProps} />
            </DataProvider>
          </SessionProvider>
        </WagmiConfig>
      ) : null}
    </>
  );
}
