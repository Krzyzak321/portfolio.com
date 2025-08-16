import React from "react";
import { RoundedTile } from "./RoundedTile";

const dummyTiles = [
  {
    title: "Projekt 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at.",
  },
  {
    title: "Projekt 2",
    content:
      "Suspendisse ac quam id ligula dictum tincidunt. Etiam facilisis.",
  },
  
];

export const RoundedTiles = () => {
  return (
    <div className="tiles-grid">
      {dummyTiles.map((tile, idx) => (
        <RoundedTile key={idx} title={tile.title} content={tile.content} />
      ))}
    </div>
  );
};