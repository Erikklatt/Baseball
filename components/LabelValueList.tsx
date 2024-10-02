import React, { useState } from "react";

type LabelValue = {
  label: string;
  value: string | number;
};

type LabelValueListProps = {
  items: LabelValue[];
};

const LabelValueList: React.FC<LabelValueListProps> = ({ items, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    onClose();
  };

  return (
    <div style={styles.container}>
      <button onClick={handleClose} style={styles.closeButton}>
        Close
      </button>
      {items.map((item, index) => (
        <div key={index} style={styles.item}>
          <LabelValue label={item.label} value={item.value} />
        </div>
      ))}
    </div>
  );
};

export const LabelValue = (props) => {
  const { label, value } = props;

  return (
    <div>
      <strong style={styles.label}>{label}:</strong>
      <span style={styles.value}>{value}</span>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "300px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  item: {
    marginBottom: "8px",
  },
  label: {
    marginRight: "8px",
  },
  value: {
    color: "#555",
  },
  closeButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default LabelValueList;
