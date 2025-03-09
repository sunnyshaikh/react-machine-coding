import { useMemo, useState } from "react";
import Card from "./Card";
import LetterDensity from "./LetterDensity";

// utility to format count
const formatCount = (count) => (count < 10 ? `0${count}` : String(count));

const CharCounterMain = () => {
  const [formData, setFormData] = useState({
    text: "",
    excludeSpace: false,
  });

  // count chars
  const charCount = useMemo(() => {
    const count = formData.text.length;
    return formatCount(count);
  }, [formData]);

  // count words
  const wordCount = useMemo(() => {
    const count = formData.text.trim().split(/\s+/).filter(Boolean).length;
    return formatCount(count);
  }, [formData]);

  // count sentences
  const sentenceCount = useMemo(() => {
    const count = formData.text.trim().split("\n").length;
    return formatCount(Boolean(formData.text) ? count : 0);
  }, [formData]);

  // higher order function to set form data
  const handleChange = (name) => (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="container py-[3rem]">
      {/* app title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center">
        Analyze your text
        <br /> in real-time.
      </h1>

      {/* form */}
      <form className="mt-[3rem]">
        <div className="input-box">
          <textarea
            type="text"
            placeholder="Start typing here... (or paste your text)"
            value={formData.text}
            onChange={handleChange("text")}
            autoFocus
            className="w-full bg-slate-800 h-[200px] p-3 resize-none border border-slate-500 rounded-lg"
          />
        </div>
        <div className="checkboxes space-x-1">
          <input
            type="checkbox"
            id="excludeSpace"
            onChange={handleChange("excludeSpace")}
          />
          <label htmlFor="excludeSpace">Exlude Space</label>
        </div>
      </form>

      {/* cards */}
      <div className="cards-container mt-10 grid md:grid-cols-3 gap-4">
        <Card
          className="bg-gradient-to-br from-purple-300 to-purple-600 text-black"
          value={charCount}
          label="Total Characters"
        />
        <Card
          className="bg-gradient-to-br from-orange-300 to-orange-600 text-black"
          value={wordCount}
          label="Word Count"
        />
        <Card
          className="bg-gradient-to-br from-red-400 to-red-600 text-black"
          value={sentenceCount}
          label="Sentence Count"
        />
      </div>

      {/* letter density */}
      <div className="letter-density-container mt-10">
        <LetterDensity text={formData.text} />
      </div>
    </div>
  );
};

export default CharCounterMain;
