import React from "react";
import LoadingAnimation from "../assets/pokemon-loading.mp4";
import "../styles/loading.sass";

export const Loading: React.FC = () => (
  <div className="loading-overlay">
    <div className="loading-content">
      <video
        src={LoadingAnimation}
        autoPlay
        loop
        muted
        className="loading-animation"
      />
    </div>
  </div>
);
