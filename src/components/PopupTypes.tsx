import { types } from "../data/types";

interface PopupTypesProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupTypes: React.FC<PopupTypesProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="overlay">
      <div className="popup">
        <h2>Types</h2>
        <div className="types-container">
          {Object.keys(types).map((type) => (
            <button className="typesBtn" key={type}>
              <img src={types[type as keyof typeof types]} alt={type} />
            </button>
          ))}
        </div>
        <button onClick={onClose}>"❌</button>
      </div>
    </div>
  );
};

export default PopupTypes;
