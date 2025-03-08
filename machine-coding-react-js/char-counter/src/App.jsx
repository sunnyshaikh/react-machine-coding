import CharCounterMain from "./components/CharCounterMain";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="h-screen w-screen bg-slate-900 text-white">
      <Navbar />
      <CharCounterMain />
    </main>
  );
};

export default App;
