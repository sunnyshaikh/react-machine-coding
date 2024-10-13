import "./App.css";
import { useToastify } from "./context/toast-context";

function App() {
  const { enqueueToast } = useToastify();

  const handleClick = (variant: any, duration = 3000) => {
    enqueueToast(`Toast ${variant}`, { variant: variant, duration });
  };
  return (
    <main className="app">
      <button onClick={() => handleClick("error", 5000)}>Error</button>
      <button onClick={() => handleClick("success")}>Success</button>
      <button onClick={() => handleClick("warning")}>Warning</button>
      <button onClick={() => handleClick("info")}>Info</button>
    </main>
  );
}

export default App;
