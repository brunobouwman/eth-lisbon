import { useDataProvider } from "@/context";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import Web3MailContext from "../web3mail";
// import CheckButton from "../../src/components/CheckButton";

export default function Dashboard() {
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

  return (
    <div className={styles.dashboard}>
      <div className={styles.topSection}>
        <div className={styles.dailyGoal}>
          <div className={styles.mainCTA}>
            <h1>Objetivo Diario</h1>
            <h2>Steps: 10,000</h2>
          </div>
        </div>
        <div className={styles.lastAchievement}>
          <h2>Última Conquista</h2>
          {/* <img src="" alt="NFT" /> */}
          {/* Replace 'nft-image.jpg' with your NFT image */}
          {/* <p>Your progress is notorious, keep going!</p> */}
        </div>
      </div>

      {isFirstAccess ? (
        <div className={styles.mainCTA}>
          <h1>First time here?</h1>
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

      <div className={styles.mainCTA}>
        <h1>Want to be notified ?</h1>
        <button onClick={() => toggleNotifications(!grantAccess)}>
          TOGGLE
        </button>
        {/* <CheckButton
          onClick={() => toggleNotifications(!grantAccess)}
          checked={grantAccess}
        /> */}
      </div>
    </div>
  );
}
