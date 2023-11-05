import styles from "@/styles/Home.module.css";
import React from "react";

interface CheckButtonProps {
  onClick: () => void;
  checked?: boolean;
}

const CheckButton: React.FC<CheckButtonProps> = ({ onClick, checked }) => {
  return (
    <div className={styles.toggleButton}>
      <input
        type="checkbox"
        name="checkBtn"
        className={styles.toggleInput}
        onClick={onClick}
        id="check-button"
        checked={checked}
        onChange={() => null}
      />
    </div>
  );
};

export default CheckButton;
