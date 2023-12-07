import { IMAGE_6k, PROFILE_IMAGE } from "@/index";
import styles from "@/styles/Home.module.css";
import Image from "next/image";

function Collection() {
  return (
    <section className={styles.sectionFullScreen}>
      <div className={styles["main-container"]}>
        <div
          className={`${styles["upper-section"]} ${styles["upper-section-dark"]}`}
        >
          <Image
            alt="NFT Image"
            className={styles["profile-image"]}
            src={PROFILE_IMAGE}
          />
          <div className={styles["score-text"]}>Overall Score: 900</div>
          <div
            className={`${styles["minted-nfts-text"]} ${styles["minted-nfts-text-dark"]}`}
          >
            Minted NFTs: 20
          </div>
        </div>
        <div
          className={`${styles["lower-section"]} ${styles["lower-section-dark"]}`}
        >
          <div className={styles["card-container"]}>
            <div
              className={`${styles["card-style"]} ${styles["card-style-dark"]}`}
            >
              <Image
                alt="NFT 1"
                className={styles["card-image"]}
                src={IMAGE_6k}
              />
              <div className={styles["card-title"]}>NFT 1</div>
              <div className={styles["button-container"]}></div>
            </div>
          </div>
          <div className={styles["card-container"]}>
            <div
              className={`${styles["card-style"]} ${styles["card-style-dark"]}`}
            >
              <Image
                alt="NFT 2"
                className={styles["card-image"]}
                src={IMAGE_6k}
              />
              <div className={styles["card-title"]}>NFT 3</div>
              <div className={styles["button-container"]}></div>
            </div>
          </div>
          <div className={styles["card-container"]}>
            <div
              className={`${styles["card-style"]} ${styles["card-style-dark"]}`}
            >
              <Image
                alt="NFT 2"
                className={styles["card-image"]}
                src={IMAGE_6k}
              />
              <div className={styles["card-title"]}>NFT 3</div>
              <div className={styles["button-container"]}></div>
            </div>
          </div>
          <div className={styles["card-container"]}>
            <div
              className={`${styles["card-style"]} ${styles["card-style-dark"]}`}
            >
              <Image
                alt="NFT 2"
                className={styles["card-image"]}
                src={IMAGE_6k}
              />
              <div className={styles["card-title"]}>NFT 3</div>
              <div className={styles["button-container"]}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Collection;
