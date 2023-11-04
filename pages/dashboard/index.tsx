import styles from "@/styles/Home.module.css";
import GoogleButton from "react-google-button";
export default function Dashboard() {
  //   const [session, loading] = useSession();
  //   const { data: userData } = useSession();

  //   useEffect(() => {
  //     console.log("userData", userData);
  //   }, [userData]);

  return (
    <div className={styles.dashboard}>
      <div className={styles.topSection}>
        <div className={styles.dailyGoals}>
          <h2>Objetivo Diario</h2>
          <p>Steps: 10,000</p>
        </div>
        <div className={styles.lastAchievement}>
          <h2>Última Conquista</h2>
          {/* <img src="" alt="NFT" /> */}
          {/* Replace 'nft-image.jpg' with your NFT image */}
          <p>Your progress is notorious, keep going!</p>
        </div>
      </div>
      <div className={styles.ctaSection}>
        <h2>Ready to show your work? Submit your health data</h2>
        <GoogleButton></GoogleButton>
      </div>
    </div>
  );
}
