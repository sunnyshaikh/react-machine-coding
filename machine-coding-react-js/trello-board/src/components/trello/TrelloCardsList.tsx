import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { TrelloCardsType } from "./type";
import TrelloCard from "./TrelloCard";
import { useDispatch } from "react-redux";
import { deleteList, editListTitle, addCard } from "../../store/trelloSlices";
import FormWrapper from "../dynamicForm/FormWrapper";

const TrelloCardsList = React.memo(({ cards }: { cards: TrelloCardsType }) => {
  const [openAdd, setOpenApp] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addCard({ id: cards.id, title: input }));
    setInput("");
    setOpenApp(false);
  };

  return (
    <div className="trello__card bg-slate-800 p-3 rounded shadow-md min-w-[280px]">
      <TrelloListHeader cards={cards} />
      <div className="trello__card__list space-y-1 mt-2">
        {cards.cards.map((card) => (
          <TrelloCard key={card.id} card={card} listId={cards.id} />
        ))}
        {openAdd ? (
          <>
            <FormWrapper
              handleCancel={() => setOpenApp(false)}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              inputValue={input}
              submitButtonTitle="Add Card"
            />
          </>
        ) : (
          <button
            className="flex items-center gap-3"
            onClick={() => setOpenApp(true)}
          >
            <FaPlus /> Add card
          </button>
        )}
      </div>
    </div>
  );
});

const TrelloListHeader = ({ cards }: { cards: TrelloCardsType }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(cards.title);
  const dispatch = useDispatch();
  const handleDeleteList = (id: number) => {
    dispatch(deleteList(id));
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key.toLowerCase() !== "enter") return;
    e.preventDefault();
    if (!title.trim()) {
      alert("List title required!");
      return;
    }
    dispatch(editListTitle({ id: cards.id, title }));
    setIsEditing(false);
  };

  return (
    <div className="border-b border-b-gray-600 pb-2 flex gap-3 items-center justify-between">
      {isEditing ? (
        <input
          className="w-full bg-slate-600 px-1 rounded"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleSubmit}
        />
      ) : (
        <h2
          className="cursor-pointer flex-1"
          onClick={() => setIsEditing(true)}
        >
          {cards.title}
        </h2>
      )}
      <button onClick={() => handleDeleteList(cards.id)}>
        <FaTrash color="#ff5776" />
      </button>
    </div>
  );
};

export default TrelloCardsList;
