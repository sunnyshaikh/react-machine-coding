import React, { useState } from "react";
import "./app.css";

const GIFTS = [
  "fireworks",
  "decorations",
  "sweets",
  "shoes",
  "clothes",
  "earphone",
  "perfume",
  "basketball",
  "chocolate",
  "keyboard",
];

export default function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter" || !value) return;
    const newFrnd = {
      id: Date.now(),
      name: value,
      gift: null,
    };
    setList((prev) => [...prev, newFrnd]);
    setValue("");
  };

  return (
    <div>
      <h1>Random Gifts</h1>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Enter a name"
      />
      <List list={list} setList={setList} />
    </div>
  );
}
9;
const List = ({ list, setList }) => {
  const removeFromList = (id) => {
    setList((prev) => prev.filter((item) => item.id !== id));
  };

  const randomize = () => {
    setList((prev) =>
      prev.map((item) => {
        let gift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
        while (gift === item.gift)
          gift = GIFTS[Math.floor(Math.random() * GIFTS.length)];
        return { ...item, gift };
      })
    );
  };

  const isAssigned = () => list.every((item) => item.gift);

  const assignGifts = () => {
    if (isAssigned()) {
      alert("Gifts are alreay assigned, if needed shuffle it!");
      return;
    }
    randomize();
  };

  const shuffleGifts = () => {
    if (!isAssigned()) {
      alert("Gifts are not assigned, assign it first!");
      return;
    }
    randomize();
  };

  const reset = () =>
    setList((prev) => prev.map((item) => ({ ...item, gift: null })));
  return (
    <div>
      <ul>
        {list.map((item) => (
          <li key={item.id}>
            <div className="flex">
              <span>{item.name}</span>
              <span>Gift: {item?.gift ? item.gift : "No Gift Assigned"}</span>
              <button onClick={() => removeFromList(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {list.length ? (
        <div className="flex">
          <button onClick={() => assignGifts()}>Assign gifts</button>
          <button onClick={() => shuffleGifts()}>Shuffle gifts</button>
          <button onClick={reset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
};
