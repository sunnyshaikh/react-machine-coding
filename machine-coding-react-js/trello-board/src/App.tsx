import Navbar from "./components/navbar/Navbar";
import TrelloBoard from "./components/trello/TrelloBoard";

const App = () => {
  return (
    <main className="app h-screen w-screen bg-gray-900 text-gray-100">
      <Navbar />
      <TrelloBoard />
    </main>
  );
};

export default App;
