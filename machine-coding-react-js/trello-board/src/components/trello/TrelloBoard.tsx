import { useState } from "react";
import { TrelloCardsType } from "./type";
import { FaPlus } from "react-icons/fa";
import TrelloCardsList from "./TrelloCardsList";

const trelloData: TrelloCardsType[] = [
  {
    id: 1,
    title: "trello card 1",
    cards: [
      { id: 1, title: "card1", isEditing: false },
      { id: 2, title: "card2", isEditing: false },
    ],
  },
  {
    id: 2,
    title: "trello card 2",
    cards: [],
  },
];

const TrelloBoard = () => {
  const [trelloCards, setTrelloCards] = useState<TrelloCardsType[]>(trelloData);

  return (
    <div className="trello__container p-4 flex items-start gap-4">
      {trelloCards.map((cards) => (
        <TrelloCardsList
          key={cards.id}
          cards={cards}
          setTrelloCards={setTrelloCards}
        />
      ))}
      <div className="add__trello__btn">
        <button
          title="Add new list"
          className="size-10 bg-indigo-500 flex items-center justify-center rounded-full hover:bg-indigo-400"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default TrelloBoard;
