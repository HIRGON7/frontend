import React, { useRef } from "react";
import "../styles/about-us.css";
import me from "../images/me.png";
import friend from "../images/friend.png";
import logo from "../images/logo.png";
function TeamCard({ name, role, description, image, overlay }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 18;
    const rotateY = (x - centerX) / 18;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  };

  return (
    <div className="team-card-wrapper">
      <div
        className="team-card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <img src={image} alt={name} className="team-card-image" />

        <div className="team-card-overlay">
          <img src={logo} alt="MedGuide Overlay" className="overlay-logo" />
        </div>
      </div>

      <div className="team-card-text">
        <h2>{name}</h2>
        <h4>{role}</h4>
        <p>{description}</p>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <section className="about-team-section">
      <div className="Heading">
      <h1>Meet the Team</h1>
      </div>
      <div className="about-team-container">
        <TeamCard
          name="HADI JAWHARI"
          role="Co-Founder / Developer"
          description="I’m a full-stack web and AI developer experienced in building intelligent systems, from machine learning models to reinforcement learning. I’m passionate about creating impactful projects, combining creativity, CSS, and JavaScript to design modern, interactive, and visually polished digital experiences."
          image={me}
          overlay="/medguide-white.png"
        />

        <TeamCard
          name="KHODOR RIFAII"
          role="Co-Founder / Developer"
          description="Passionate developer and co-founder of MedGuide, an AI-powered healthcare platform focused on symptom analysis and intelligent medical guidance. Interested in software engineering, AI, and building technology that creates real world impact. Always learning, improving, and pushing ideas into reality."
          image={friend}
          overlay="/medguide-white.png"
        />
      </div>
    </section>
  );
}

export default AboutUs;
