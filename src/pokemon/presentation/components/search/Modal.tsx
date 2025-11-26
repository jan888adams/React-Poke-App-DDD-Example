import React from "react";
import "../../styles/search/modal.sass";

export const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <div className="modal-header">
        <button className="modal-close" onClick={onClose}>
          ×
        </button>
      </div>
      {children}
    </div>
  </div>
);
