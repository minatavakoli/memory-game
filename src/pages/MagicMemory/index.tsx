import { Box, Button, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Card from "./components/Card";
import { CardData } from "./components/Card/types";
import { MagicMemoryProps } from "./types";

const cardImages = [
  { src: "/img/helmet-1.png", matched: false, id: uuidv4() },
  { src: "/img/helmet-1.png", matched: false, id: uuidv4() },
  { src: "/img/potion-1.png", matched: false, id: uuidv4() },
  { src: "/img/potion-1.png", matched: false, id: uuidv4() },
  { src: "/img/ring-1.png", matched: false, id: uuidv4() },
  { src: "/img/ring-1.png", matched: false, id: uuidv4() },
  { src: "/img/scroll-1.png", matched: false, id: uuidv4() },
  { src: "/img/scroll-1.png", matched: false, id: uuidv4() },
  { src: "/img/shield-1.png", matched: false, id: uuidv4() },
  { src: "/img/shield-1.png", matched: false, id: uuidv4() },
  { src: "/img/sword-1.png", matched: false, id: uuidv4() },
  { src: "/img/sword-1.png", matched: false, id: uuidv4() },
];

const shuffledArray = (array) => {
  return array.sort((a, b) => 0.5 - Math.random());
};

const MagicMemory = () => {
  const [cards, setCards] = useState<MagicMemoryProps[]>([]);
  const [choiceOne, setChoiceOne] = useState<MagicMemoryProps | undefined>();
  const [choiceTwo, setChoiceTwo] = useState<MagicMemoryProps | undefined>();
  const [turn, setTurn] = useState(0);
  const [disabled, setDisabled] = useState(false);

  function startGame(){
    setCards(shuffledArray(cardImages));
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTurn(0);
    setDisabled(false);
  }

  useEffect(() => {
    startGame()
  }, []);

  function handleClick(data: CardData) {
    if (choiceOne) {
      setChoiceTwo(data);
    } else {
      setChoiceOne(data);
    }
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        const newCards = cards.map((item) => {
          if (item.src === choiceOne.src) {
            return { ...item, matched: true };
          } else {
            return item;
          }
        });
        setCards(newCards);
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  function resetTurn() {
    setChoiceOne(undefined);
    setChoiceTwo(undefined);
    setTurn((prevValue) => prevValue + 1);
    setDisabled(false);
  }

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" mt="20px">
        <Text fontSize="5xl" color="#fff" fontWeight="bold">
          Magic Match
        </Text>
      </Flex>
      <Flex justifyContent="center" alignItems="center" mt="20px">
        <Button onClick={startGame}>New Game</Button>
      </Flex>

      <SimpleGrid
        columns={4}
        spacing={10}
        mt="2rem"
        maxWidth="1000px"
        mx="auto"
      >
        {cards.map((item) => {
          return (
            <Card
              key={item.id}
              data={item}
              handleClick={handleClick}
              flipped={item === choiceOne || item === choiceTwo || item.matched}
              disabled={disabled}
            />
          );
        })}
      </SimpleGrid>
      <Flex justifyContent="center" alignItems="center" my="2rem">
        <Text fontSize={"3xl"} color="white">
          turn: {turn}
        </Text>
      </Flex>
    </Box>
  );
};

export default MagicMemory;
