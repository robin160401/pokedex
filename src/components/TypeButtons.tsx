import { colors } from "../data/colors";

interface ButtonProps {
  type: string;
  onClick: () => void;
}

const TypeButton: React.FC<ButtonProps> = ({ type, onClick }) => {
  const buttonColor = colors[type.toLowerCase()]; // Zugriff auf die Farbe

  return (
    <button style={{ backgroundColor: buttonColor }} onClick={onClick}>
      {type}
    </button>
  );
};
