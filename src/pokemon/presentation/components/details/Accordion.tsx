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
                {columns.map((column, i) => (
                  <th key={i}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items &&
                items.map((values, i) => (
                  <tr key={i}>
                    {values.map((value, j) => (
                      <td key={j}>{value}</td>
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
