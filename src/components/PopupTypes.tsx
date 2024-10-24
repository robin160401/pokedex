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
        <div className="popup-heading">
          <h2>Type</h2>
          <button className="closeBtn" onClick={onClose}>
            ❌
          </button>
        </div>
        <div className="types-container">
          {Object.keys(types).map((type) => (
            <button className="typesBtn" key={type}>
              <img src={types[type as keyof typeof types]} alt={type} />
            </button>
          ))}
        </div>
        <button className="searchBtn">Search</button>
      </div>
    </div>
  );
};

export default PopupTypes;
