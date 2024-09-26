import { FC, useState } from "react";

interface IAccordionItem {
  id: number;
  title: string;
  description: string;
}

interface IAccordion {
  data: IAccordionItem[];
}

const Accordion: FC<IAccordion> = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  return (
    <div className="accordion-container">
      {data.map((item, index) => (
        // <AccordionItem item={item} />
        <div key={item.id} className="accordion">
          <div className="accordion-header">
            <h2 className="accordion-title">{item.title}</h2>
            <button
              className="toggle-icon"
              onClick={() =>
                setCurrentIndex((prev) => (prev === index ? null : index))
              }
            >
              x
            </button>
          </div>
          <div
            className={`accordion-body ${
              currentIndex === index ? "active" : ""
            }`}
          >
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;

const AccordionItem = ({ item }: { item: IAccordionItem }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <div key={item.id} className="accordion">
      <div className="accordion-header">
        <h2 className="accordion-title">{item.title}</h2>
        <button className="toggle-icon" onClick={() => setToggle(!toggle)}>
          x
        </button>
      </div>
      <div className={`accordion-body ${toggle ? "active" : ""}`}>
        <p>{item.description}</p>
      </div>
    </div>
  );
};
