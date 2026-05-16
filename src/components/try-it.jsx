import React, { useMemo } from "react";
import "../styles/NetflixButton.css";

function NetflixButton() {
  const spans = useMemo(() => {
    return Array.from({ length: 120 }, (_, i) => ({
      left: `${i * 2}px`,
      delay: `${Math.random()}s`,
    }));
  }, []);

  return (
    <div className="netflix-button-wrapper">
      <a href="/symptoms" className="netflix-btn">
        START
        {spans.map((span, index) => (
          <span
            key={index}
            style={{
              left: span.left,
              transitionDelay: span.delay,
            }}
          ></span>
        ))}
      </a>
    </div>
  );
}

export default NetflixButton;