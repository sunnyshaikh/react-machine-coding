import { FaPlus } from "react-icons/fa";
import TrelloCardsList from "./TrelloCardsList";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../store/trelloSlices";
import { RootState } from "../../store/store";

const TrelloBoard = () => {
  const [listTitle, setListTitle] = useState("");
  const [openAddList, setOpenAddList] = useState(false);
  const dispatch = useDispatch();

  const trelloCards = useSelector((state: RootState) => state.trello);

  const reset = useCallback(() => {
    setListTitle("");
    setOpenAddList(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListTitle(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!listTitle.trim()) {
      alert("List title required!");
      return;
    }
    dispatch(addList(listTitle.trim()));
    reset();
  };

  return (
    <div className="trello__container p-4 flex items-start gap-4 flex-wrap">
      {trelloCards.map((cards) => (
        <TrelloCardsList key={cards.id} cards={cards} />
      ))}

      {/* show add list component or add button */}
      {openAddList ? (
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-3 rounded shadow-md min-w-[280px] flex flex-col gap-3"
        >
          <div className="form-group w-full">
            <input
              type="text"
              className="w-full bg-slate-600 p-1 rounded"
              autoFocus
              value={listTitle}
              onChange={handleChange}
              required
            />
          </div>
          <div className="cta flex gap-2">
            <button className="bg-indigo-500 rounded flex items-center justify-center gap-2 p-1 flex-1">
              <FaPlus />
              Add List
            </button>
            <button
              type="button"
              className="bg-red-500 rounded flex items-center justify-center gap-2 py-1 px-2"
              onClick={() => reset()}
            >
              <FaPlus className="rotate-45" />
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="add__trello__btn">
          <button
            title="Add new list"
            className="size-10 bg-indigo-500 flex items-center justify-center rounded-full hover:bg-indigo-400"
            onClick={() => setOpenAddList(true)}
          >
            <FaPlus />
          </button>
        </div>
      )}
    </div>
  );
};

export default TrelloBoard;
