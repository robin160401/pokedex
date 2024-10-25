import { types } from "../data/types";
import { useSearch } from "./SearchContextProvider";

interface PopupTypesProps {
  isOpen: boolean;
  onClose: () => void;
}

const PopupTypes: React.FC<PopupTypesProps> = ({ isOpen, onClose }) => {
  const { setSearchType } = useSearch();
  const { setSearchFor } = useSearch();

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
            <button
              className="typesBtn"
              key={type}
              onClick={() => {
                setSearchType(type);
                setSearchFor("");
                console.log(type);
                onClose();
              }}
            >
              <img src={types[type as keyof typeof types]} alt={type} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupTypes;
