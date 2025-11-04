import React from "react";
import { AccordionProps } from "../../types/components/details/AccordionProps";
import "../../styles/details/accordion.sass";

export const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  onToggle,
  items,
  columns,
  onFetch,
}) => {
  const handleToggle = () => {
    if (!isOpen && onFetch) {
      onFetch();
    }
    onToggle();
  };

  return (
    <div className="accordion">
      <button className="accordion__toggle" onClick={handleToggle}>
        {isOpen ? `Hide ${title}` : `Show ${title}`}
      </button>
      {isOpen && (
        <div className="accordion__content">
          <table>
            <thead>
              <tr>
                {columns.map((col, idx) => (
                  <th key={idx}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items &&
                items.length > 0 &&
                items.map((itemArr, idx) => (
                  <tr key={idx}>
                    {itemArr.map((str, i) => (
                      <td key={i}>{str}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
