import React, { useState } from "react";
import "./RoundedTile.css";

export const RoundedTile = ({ title, content }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`rounded-tile${hovered ? " hovered" : ""}`}
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      role="button"
      aria-label={title}
    >
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
};