import React, { useEffect, useState } from "react";
import "../styles/start.css";
import { useNavigate } from "react-router-dom";

// Fallback in case DB is unreachable
const backupSymptomCategories = {
  "Head & Neck": ["Headache", "Dizziness", "Sore Throat", "Ear Pain", "Nosebleed"],
  "Chest / Breathing": ["Cough", "Shortness of Breath", "Chest Tightness", "Wheezing"],
  "Stomach / Abdomen": ["Nausea", "Vomiting", "Diarrhea", "Constipation", "Heartburn"],
  "Skin": ["Skin Rash", "Itching of Skin", "Acne or Pimples", "Skin Lesion"],
  "General / Whole Body": ["Fever", "Fatigue", "Chills", "Weight Gain", "Weakness"],
  "Legs & Feet": ["Leg Pain", "Knee Pain", "Ankle Swelling", "Hip Pain"],
};

// Maps DB category names → your UI tab labels
const CATEGORY_MAP = {
  "Head & Neck": "Head",
  "Chest / Breathing": "Chest",
  "Stomach / Abdomen": "Stomach",
  "Skin": "Skin",
  "General / Whole Body": "General",
  "Legs & Feet": "Legs",
};

const loadSymptomsWithJsonp = () => {
  return new Promise((resolve, reject) => {
    const callbackName = "medguide_cb_" + Date.now();
    const script = document.createElement("script");

    const timeout = setTimeout(() => {
      cleanup();
      reject(new Error("Request timed out"));
    }, 6000);

    const cleanup = () => {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    };

    window[callbackName] = (data) => {
      cleanup();
      // Remap DB category names to UI names
      const remapped = {};
      for (const [dbCat, symptoms] of Object.entries(data)) {
        const uiLabel = CATEGORY_MAP[dbCat] || dbCat;
        remapped[uiLabel] = symptoms;
      }
      resolve(remapped);
    };

    script.onerror = () => {
      cleanup();
      reject(new Error("Script load failed"));
    };

    script.src = `https://medguidex.rf.gd/get_symptoms.php?callback=${callbackName}&t=${Date.now()}`;
    document.head.appendChild(script);
  });
};

export default function Start() {
  const navigate = useNavigate();
  const [symptomCategories, setSymptomCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    loadSymptomsWithJsonp()
      .then((data) => {
        setSymptomCategories(data);
        setSelectedCategory(Object.keys(data)[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.warn("DB load failed, using backup:", err);
        setSymptomCategories(backupSymptomCategories);
        setSelectedCategory(Object.keys(backupSymptomCategories)[0]);
        setUsingFallback(true);
        setLoading(false);
      });
  }, []);

  const toggleSymptom = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const handleContinue = () => {
    localStorage.setItem("medguide_selected_symptoms", JSON.stringify(selectedSymptoms));
    navigate("/our-Ai's");
  };

  if (loading) return <div className="loading">Loading symptoms...</div>;

  const categories = Object.keys(symptomCategories);
  const currentSymptoms = selectedCategory ? symptomCategories[selectedCategory] : [];

  return (
    <div className="start-container">
      <h1>Select Your Symptoms</h1>
      {usingFallback && (
        <p className="fallback-notice">Showing offline symptom list</p>
      )}

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`tab-btn ${selectedCategory === cat ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="symptoms-grid">
        {currentSymptoms.map((symptom) => (
          <button
            key={symptom}
            className={`symptom-btn ${selectedSymptoms.includes(symptom) ? "selected" : ""}`}
            onClick={() => toggleSymptom(symptom)}
          >
            {symptom}
          </button>
        ))}
      </div>

      {selectedSymptoms.length > 0 && (
        <button className="continue-btn" onClick={handleContinue}>
          Continue ({selectedSymptoms.length} selected)
        </button>
      )}
    </div>
  );
}
