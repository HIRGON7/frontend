import React from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Nav from "./components/nav.jsx"
import QuoteCarousel from "./components/text-carousel.jsx"
import Carousel1 from "./components/carousel.jsx"
import About from "./pages/about-us.jsx"
import Ai from "./pages/our-Ai's.jsx"
import Game from "./pages/game.jsx"
import NetflixButton from "./components/try-it.jsx"
import Symptoms from "../src/pages/Start.jsx"


function App() {
  return (
    <BrowserRouter>

      <div className='nav'>
        <Nav />
      </div>

      <Routes>
  <Route
    path="/"
    element={
      <div className="wraps">
        <div className="quote">
          <QuoteCarousel />
        </div>

        <div className="image">
          <Carousel1 />
        </div>

        <div className="try-btn">
          <NetflixButton />
        </div>

        <div className="faqs">
  <footer className="footer">
    <p>© {new Date().getFullYear()} All Rights Reserved</p>
    <p>Built with passion in Beirut, Lebanon 🇱🇧</p>
    <p className="creators">
      Created by{" "}
      <span className="shine-text">Hadi Jawhari</span>
      {" "} & {" "}
      <span className="wave-text">
        <span>K</span>
        <span>h</span>
        <span>o</span>
        <span>d</span>
        <span>o</span>
        <span>r</span>
        <span>&nbsp;</span>
        <span>R</span>
        <span>i</span>
        <span>f</span>
        <span>a</span>
        <span>i</span>
        <span>i</span>
      </span>
    </p>
  </footer>
</div>
      </div>
    }
  />


        
        
        <Route path="/about-us" element={<About />} />
        <Route path="/our-Ai's" element={<Ai />} />  
        <Route path="/game" element={<Game />} />  
        <Route path="/symptoms" element={<Symptoms />} />

      </Routes>

    </BrowserRouter>
  )
}

export default App
