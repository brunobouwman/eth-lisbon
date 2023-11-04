import styles from "@/styles/Home.module.css";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";
import GoogleButton from "react-google-button";
import { useAccount } from "wagmi";

export default function Home() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const { address, isConnecting, isDisconnected } = useAccount();

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
      <Head>
        <title>Well Well Well</title>
        <meta name="description" content="Generated by create-wc-dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <div
          className={styles.backdrop}
          style={{
            opacity: isConnectHighlighted || isNetworkSwitchHighlighted ? 1 : 0,
          }}
        />
        <div className={styles.header}>
          <div className={styles.logo}>
            <span>WELL WELL WELL</span>
          </div>
          <div className={styles.buttons}>
            <div
              onClick={closeAll}
              className={`${styles.highlight} ${
                isNetworkSwitchHighlighted ? styles.highlightSelected : ``
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
      <main className={styles.main}>
        {address ? (
          <GoogleButton
            onClick={() =>
              signIn("google", {
                redirect: true,
                callbackUrl: "/dashboard",
              })
            }
          />
        ) : (
          <h1>Connect your wallet</h1>
        )}
      </main>
    </>
  );
}