export interface CardData {
  src: string; matched: boolean; id: string 
}

export interface CardProps {
  data: CardData;
  handleClick: (value: CardData) => void;
  flipped: boolean
  disabled: boolean
}
