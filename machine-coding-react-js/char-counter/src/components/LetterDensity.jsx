import React, { useEffect, useMemo, useRef, useState } from "react";

const LetterDensity = ({ text }) => {
  const [expand, setExpand] = useState(false);
  const splitText = useMemo(
    () => text.split("").filter((t) => /[a-zA-Z0-9]/.test(t)),
    [text]
  );
  const [map, setMap] = useState([]);

  useEffect(() => {
    if (text.trim() === "") {
      setMap([]);
      return;
    }
    const newMap = new Map();

    splitText.forEach((t) => {
      newMap.set(t, (newMap.get(t) || 0) + 1);
    });
    setMap(
      Array.from(newMap).map((item) => {
        return {
          letter: item[0],
          count: item[1],
          percent: (item[1] * 100) / text.length,
        };
      })
    );
  }, [text, splitText]);
  return (
    <div>
      <h2 className="text-2xl font-bold">Letter Density</h2>
      {text ? (
        <>
          <div className="letter-range mt-3 space-y-4">
            {map.slice(0, !expand ? 5 : map.length).map((item, index) => (
              <div
                key={`${item.letter}-${index}`}
                className="range flex items-center justify-center"
              >
                <span className="w-7">{item.letter}</span>
                <div
                  className="relative overflow-hidden percent-bar p-2 rounded-full bg-slate-800"
                  style={{
                    flex: 1,
                    position: "relative",
                  }}
                >
                  <div
                    className="absolute left-0 top-0 bottom-0 bg-purple-400 rounded-full"
                    style={{
                      width: `${item.percent}%`,
                    }}
                  ></div>
                </div>
                <span className="w-[100px] max-w-[180px] ml-auto text-right">
                  {item.count} ({item.percent.toFixed(2)}%)
                </span>
              </div>
            ))}
          </div>
          {map.length >= 5 && (
            <button
              className="mt-3 cursor-pointer"
              onClick={() => setExpand(!expand)}
            >
              {!expand ? "See more" : "See less"}
            </button>
          )}
        </>
      ) : (
        <p className="text-gray-400 mt-3">
          No characters found. Start typing to see letter density.
        </p>
      )}
    </div>
  );
};

export default LetterDensity;
