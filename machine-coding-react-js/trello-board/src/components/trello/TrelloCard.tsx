import { FaPencilAlt } from "react-icons/fa";
import { TrelloCardType } from "./type";
import React from "react";

interface TrelloCardProps {
  card: TrelloCardType;
  listId: number;
}

const TrelloCard: React.FC<TrelloCardProps> = ({ card }) => {
  return (
    <div className="group single__card__list flex items-center justify-between p-2 bg-slate-600 rounded">
      <p>{card.title}</p>
      <button className="hidden group-hover:block transition-all">
        <FaPencilAlt />
      </button>
    </div>
  );
};

export default TrelloCard;
