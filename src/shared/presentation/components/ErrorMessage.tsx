import React, { useEffect } from "react";
import "../styles/error-message.sass";

export const ErrorMessage: React.FC<{
  message: string;
  onClose?: () => void;
}> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) onClose();
    }, 3000); // 3 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!message) return null;

  return <div className="error-message-box">{message}</div>;
};
