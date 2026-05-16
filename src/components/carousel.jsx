import React, { useState,useEffect } from "react";
import slide1 from "../images/slide1.png";
import slide2 from "../images/slide2.png";
import slide3 from "../images/slide3.png";
import slide4 from "../images/slide4.png";
import slide5 from "../images/slide5.png";
import slide6 from "../images/slide6.png";
import slide7 from "../images/slide7.png";
import "../styles/carousel1.css";

function Carousel1() {
  const slides = [
    { image: slide1, title: "Al-Razi", category: "Medical History" },
    { image: slide2, title: "Hippocrates", category: "Ancient Medicine" },
    { image: slide5, title: "Ibn Sina", category: "Islamic Medicine" },
    { image: slide4, title: "Andreas Vesalius", category: "Anatomy" },
    { image: slide6, title: "Galen", category: "Greek Medicine" },
    { image: slide3, title: "Al-Nafis", category: "Circulatory Medicine" },
    { image: slide7, title: "Louis Pasteur", category: "Pioneer of Microbiology" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  }, 10000);

  return () => clearInterval(interval);
}, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="news-carousel-wrapper">
      <div className="news-carousel-header">
        <div className="header-left">
          <span className="news-tag">History</span>
        </div>

        <div className="header-center">
          <h2>Famous Medical Figures</h2>
        </div>
      </div>

      <div className="carousel">
        <button className="carousel-btn prev" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="news-slide">
          <img
            src={slides[currentIndex].image}
            alt={slides[currentIndex].title}
          />

          <div className="news-overlay">
            <p className="news-category">{slides[currentIndex].category}</p>
            <h3>{slides[currentIndex].title}</h3>
          </div>
        </div>

        <button className="carousel-btn next" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
}

export default Carousel1;