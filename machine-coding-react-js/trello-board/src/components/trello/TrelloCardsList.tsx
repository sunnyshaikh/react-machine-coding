import { FaPlus, FaTrash } from "react-icons/fa";
import { TrelloCardsType } from "./type";
import TrelloCard from "./TrelloCard";

const TrelloCardsList = ({
  cards,
}: {
  cards: TrelloCardsType;
  setTrelloCards: Function;
}) => {
  return (
    <div className="trello__card bg-slate-800 p-3 rounded shadow-md min-w-[280px]">
      <div className="border-b border-b-gray-600 pb-2 flex gap-3 items-center justify-between">
        <h2 className="cursor-pointer flex-1">{cards.title}</h2>
        <button>
          <FaTrash color="#ff5776" />
        </button>
      </div>
      <div className="trello__card__list space-y-1 mt-2">
        {cards.cards.map((card) => (
          <TrelloCard key={card.id} card={card} />
        ))}
        <div className="flex items-center gap-3">
          <FaPlus /> Add card
        </div>
      </div>
    </div>
  );
};

export default TrelloCardsList;
