import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrelloCardsType } from "../components/trello/type";

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
  },
});

export const { addList, deleteList } = trelloSlice.actions;

export default trelloSlice.reducer;
