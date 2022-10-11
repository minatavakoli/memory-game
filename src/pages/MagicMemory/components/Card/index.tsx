import { CardContainer } from "./styles";
import { CardProps } from "./types";

const Card = ({ data, handleClick, flipped, disabled }: CardProps) => {
  return (
    <CardContainer
      className={flipped ? "" : "flipped"}
      onClick={() => {
        if (!disabled) {
          handleClick(data);
        }
      }}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={data.src}
            alt="Avatar"
            style={{ width: "230px", height: "220px" }}
          />
        </div>
        <div className="flip-card-back">
          <img
            src={"/img/cover.png"}
            alt="Avatar"
            style={{ width: "230px", height: "220px" }}
          />
        </div>
      </div>
    </CardContainer>
  );
};

export default Card;
