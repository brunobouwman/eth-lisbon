import { useDataProvider } from "@/context";
import styles from "@/styles/Home.module.css";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CheckButton from "../../src/components/CheckButton";

export default function Dashboard() {
  const { data: session } = useSession();
  const { getIsFirstAccess, setIsFirstAccess, setLastReading } =
    useDataProvider();
  const isFirstAccess = getIsFirstAccess();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem("isChecked");

    if (!storedData) return;

    const parsedData: boolean = JSON.parse(storedData);

    setChecked(parsedData);
  }, []);

  const toggleNotifications = (state: boolean) => {
    localStorage.setItem("isChecked", String(state));
    setChecked(state);
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
          console.log("parsed", parsedData);

          if (parsedData.length !== 0) {
            const reading = parsedData.reduce((prev: any, current: any) => {
              return prev.value > current.value ? prev : current;
            });

            setLastReading(reading.value);
          }
        }
      })();
    }
  }, [session]);

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
        <CheckButton
          onClick={() => toggleNotifications(!checked)}
          checked={checked}
        />
      </div>
    </div>
  );
}
