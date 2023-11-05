import { useDataProvider } from "@/context";
import { IMAGE_5k, IMAGE_6k, IMAGE_WELCOME } from "@/index";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Web3MailContext from "../web3mail";
// import CheckButton from "../../src/components/CheckButton";

export default function Dashboard() {
  const [isNetworkSwitchHighlighted, setIsNetworkSwitchHighlighted] =
    useState(false);
  const [isConnectHighlighted, setIsConnectHighlighted] = useState(false);
  const { data: session } = useSession();
  const {
    getIsFirstAccess,
    setIsFirstAccess,
    setLastReading,
    getLastReading,
    getGrantAccess,
    setGrantAccess,
  } = useDataProvider();
  const isFirstAccess = getIsFirstAccess();
  const { protectEmailAndGrantAccess } = useContext(Web3MailContext);
  const lastReading = getLastReading();

  const grantAccess = getGrantAccess();

  useEffect(() => {
    const storedData = localStorage.getItem("isChecked");

    if (!storedData) return;

    const parsedData: boolean = JSON.parse(storedData);

    setGrantAccess(parsedData);
  }, []);

  const toggleNotifications = (state: boolean) => {
    localStorage.setItem("isChecked", String(state));

    if (state && lastReading) {
      (async () => {
        await protectEmailAndGrantAccess(lastReading.email);
      })();
    }

    setGrantAccess(state);
  };

  useEffect(() => {
    const storedInfo = localStorage.getItem("firstAccess");

    if (!storedInfo) return;

    const parsedInfo: boolean = JSON.parse(storedInfo);

    setIsFirstAccess(parsedInfo);
  }, [setIsFirstAccess]);

  useEffect(() => {
    if (session) {
      (async () => {
        const res = await fetch(
          `/api/historical?refreshToken=${(session as any).refreshToken}`
        );

        if (res) {
          const { data: parsedData } = await res.json();

          if (!parsedData) return;

          if (parsedData.length !== 0) {
            const lastData = parsedData.reduce((prev: any, current: any) => {
              return prev.value > current.value ? prev : current;
            });

            setLastReading({ email: lastData.email, steps: lastData.value });
          }
        }
      })();
    }
  }, [session, setLastReading]);

  const closeAll = () => {
    setIsNetworkSwitchHighlighted(false);
    setIsConnectHighlighted(false);
  };

  return (
    <>
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
      <main className={styles.dashboardMain}>
        <div className={styles.dashboard}>
          <div className={styles.topSection}>
            <div className={styles.dailyGoal}>
              <div className={styles.mainCTA}>
                <h1>Daily Objective</h1>
                <Image
                  src={IMAGE_6k}
                  height={200}
                  width={200}
                  alt="Objective"
                />
              </div>
            </div>
            <div className={styles.lastAchievement}>
              <div className={styles.mainCTA}>
                <h1>Last Accomplishment</h1>
                <Image
                  src={IMAGE_5k}
                  height={200}
                  width={200}
                  alt="last-Accomplishment"
                />
                <button className={styles.startedButton}>
                  See your collection
                </button>
              </div>
            </div>
          </div>

          {isFirstAccess ? (
            <div className={styles.mainCTA}>
              <h1>First time here?</h1>
              <Image
                src={IMAGE_WELCOME}
                height={200}
                width={200}
                alt="Objective"
              />
              <button
                className={styles.startedButton}
                onClick={() => setIsFirstAccess(false)}
              >
                Mint your first NFT
              </button>
            </div>
          ) : (
            <div className={styles.mainCTA}>
              <h1>Ready to show your work?</h1>
              <button className={styles.startedButton}>Claim todays NFT</button>
            </div>
          )}

          {/* <div className={styles.mainCTA}>
        <h1>Want to be notified ?</h1>
        <button onClick={() => toggleNotifications(!grantAccess)}>
        TOGGLE
        </button>
        <CheckButton
        onClick={() => toggleNotifications(!grantAccess)}
        checked={grantAccess}
        />
      </div> */}
        </div>
      </main>
    </>
  );
}
