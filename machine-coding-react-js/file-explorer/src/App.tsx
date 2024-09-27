import { useState } from "react";
import { DATA } from "./data";
import FileExplorer from "./FileExplorer";

const App = () => {
  const [explorer, setExplorer] = useState(DATA);
  return <FileExplorer explorer={explorer} />;
};

export default App;
