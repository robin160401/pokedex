interface PopupTypesProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupTypes: React.FC<PopupTypesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Nichts rendern, wenn das Popup nicht offen ist

  return (
    <div className="overlay">
      <div className="popup">
        <h2>Popup Inhalt</h2>
        <button onClick={onClose}>Schließen</button>
      </div>
    </div>
  );
};

export default PopupTypes;
