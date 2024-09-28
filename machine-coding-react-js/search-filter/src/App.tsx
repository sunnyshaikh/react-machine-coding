import { useState, useMemo } from "react";
import { IUser } from "./type";
import useFetch from "./hooks/useFetch";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  // fetching user data with custom hook
  const { data, isLoading, error } = useFetch<IUser[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  // user input to search user
  const [input, setInput] = useState("");

  // debounce the user input
  const { debouncedValue } = useDebounce(input, 300);

  // filter user data based on debounced input
  const filteredData = useMemo(
    () =>
      debouncedValue
        ? data?.filter(({ name, username }) =>
            [name, username].some((user) =>
              user.toLowerCase().includes(debouncedValue.toLowerCase())
            )
          )
        : data,
    [debouncedValue, data]
  );

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {error && <p>Failed to fetch: {error}</p>}
      {!isLoading ? (
        <div className="users">
          <ol>
            {filteredData?.map((user) => (
              <li key={user.id}>
                {user.name} - ({user.username})
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
