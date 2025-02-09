import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrelloCardsType, TrelloCardType } from "../components/trello/type";

// sample data
// [
//   {
//     id: 1,
//     title: "trello card 1",
//     cards: [
//       { id: 1, title: "card1", isEditing: false },
//       { id: 2, title: "card2", isEditing: false },
//     ],
//   },
//   {
//     id: 2,
//     title: "trello card 2",
//     cards: [],
//   },
// ];

// Helper function to load data from localStorage
const loadFromLocalStorage = (): TrelloCardsType[] => {
  const savedData = localStorage.getItem("trelloData");
  return savedData ? JSON.parse(savedData) : [];
};

// Helper function to save data to localStorage
const saveToLocalStorage = (state: TrelloCardsType[]) => {
  localStorage.setItem("trelloData", JSON.stringify(state));
};

const initialState: TrelloCardsType[] = loadFromLocalStorage();

const trelloSlice = createSlice({
  name: "trelloSlice",
  initialState,
  reducers: {
    // list updates
    addList(state, action: PayloadAction<string>) {
      const newList: TrelloCardsType = {
        id: Date.now(),
        title: action.payload,
        cards: [],
      };
      state.push(newList);
      saveToLocalStorage(state);
    },
    deleteList(state, action: PayloadAction<number>) {
      const filteredState = state.filter((list) => list.id !== action.payload);
      saveToLocalStorage(filteredState);
      return filteredState;
    },
    editListTitle(state, action: PayloadAction<{ id: number; title: string }>) {
      const { id, title } = action.payload;
      const updatedList = state.map((lists) =>
        lists.id === id ? { ...lists, title } : lists
      );
      saveToLocalStorage(updatedList);
      return updatedList;
    },

    // cards
    addCard(state, action) {
      const newCard: TrelloCardType = {
        id: Date.now(),
        title: action.payload.title,
        isEditing: false,
      };
      const updatedList = state.map((list) =>
        list.id === action.payload.id
          ? { ...list, cards: [...list.cards, newCard] }
          : list
      );
      saveToLocalStorage(updatedList);
      return updatedList;
    },
  },
});

export const { addList, deleteList, editListTitle, addCard } =
  trelloSlice.actions;

export default trelloSlice.reducer;
