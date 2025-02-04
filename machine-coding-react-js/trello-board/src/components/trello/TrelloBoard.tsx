import { FaPlus } from "react-icons/fa";
import TrelloCardsList from "./TrelloCardsList";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addList } from "../../store/trelloSlices";
import { RootState } from "../../store/store";
import FormWrapper from "../dynamicForm/FormWrapper";

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
        <>
          <FormWrapper
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            inputValue={listTitle}
            handleCancel={reset}
            submitButtonTitle="Add List"
            cancelButtonTitle="Cancel"
          />
        </>
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
