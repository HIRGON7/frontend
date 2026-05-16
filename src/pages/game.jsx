import { useState } from "react";
import "../styles/game.css"


function Game() {
   const [zoom, setZoom] = useState(1);

  return (
    <div className="game-page">
      <h1 className="title-game">Immune System Game</h1>

      <div className="zoom-controls">
        <button onClick={() => setZoom(zoom - 0.1)}>Zoom Out</button>
        <button onClick={() => setZoom(1)}>Reset</button>
        <button onClick={() => setZoom(zoom + 0.1)}>Zoom In</button>
      </div>

      <div className="game-frame-wrapper">
        <iframe
          className="game-frame"
          src="https://itch.io/embed-upload/4853836?color=333333"
          allowFullScreen
          style={{
            transform: `scale(${zoom})`
          }}
        ></iframe>
      </div>
    </div>
  );
}

export default Game;