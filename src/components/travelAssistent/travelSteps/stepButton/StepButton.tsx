import styles from "./StepButton.module.scss";
import clsx from "clsx";

interface StepButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const StepButton = ({ icon, label, onClick, selected = false }: StepButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        styles["step-button"],
        selected ? styles.selected : styles.unselected
      )}
    >
      <div className={styles.icon}>{icon}</div>
      <span className={styles.label}>{label}</span>
    </button>
  );
};

export default StepButton;
