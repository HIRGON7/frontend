import React, { useEffect, useState } from "react";
import "../styles/Ai.css";

function Ai() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [severity, setSeverity] = useState("—");
  const [recommendation, setRecommendation] = useState("—");
  const [consultDoctor, setConsultDoctor] = useState("—");

  useEffect(() => {
    document.body.classList.add("our-ai-body");

    const savedSymptoms = localStorage.getItem("medguide_selected_symptoms");

    if (savedSymptoms) {
      const symptoms = JSON.parse(savedSymptoms);
      setSelectedSymptoms(symptoms);

      if (symptoms.length > 0) {
        predictDisease(symptoms);
      }
    }

    return () => {
      document.body.classList.remove("our-ai-body");
    };
  }, []);

  async function predictDisease(symptoms) {
    setLoading(true);
    setError("");
    setPredictedDisease("");
    setConfidence(null);
    setSeverity("—");
    setRecommendation("—");
    setConsultDoctor("—");

    try {
      const response = await fetch("https://ml-2-h1n1.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms,
        }),
      });

      if (!response.ok) {
        setError("FastAPI request failed.");
        setLoading(false);
        return;
      }

      const data = await response.json();

      if (data.predicted_disease) {
        setPredictedDisease(data.predicted_disease);
        fetchDiseaseDetails(data.predicted_disease);
      }

      if (data.confidence !== undefined && data.confidence !== null) {
        setConfidence(data.confidence);
      }

    } catch (error) {
      console.log(error);
      setError("Could not connect to FastAPI.");
    }

    setLoading(false);
  }

  async function fetchDiseaseDetails(diseaseName) {
    try {
      const response = await fetch("https://ml-2-h1n1.onrender.com/disease-details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disease: diseaseName,
        }),
      });

      const data = await response.json();

      if (data.success && data.disease) {
        setSeverity(data.disease.severity_level || "—");
        setRecommendation(data.disease.recommendation || "—");
        setConsultDoctor(data.disease.consult_doctor || "—");
      }

    } catch (error) {
      console.log("Could not load disease details:", error);
    }
  }

  let diseaseText = "No result yet";
  let subText = "Waiting for AI prediction";
  let confidenceTitle = "—";
  let confidenceWidth = "0%";
  let backendStatus = "Online";

  if (loading === true) {
    diseaseText = "Analyzing...";
    subText = "Please wait";
    confidenceTitle = "Loading...";
    backendStatus = "Loading";
  }

  if (error !== "") {
    diseaseText = "Prediction failed";
    subText = "Could not get prediction";
    confidenceTitle = "—";
    backendStatus = "Offline";
  }

  if (predictedDisease !== "" && loading === false && error === "") {
    diseaseText = predictedDisease.replaceAll("_", " ");
    subText = "Most likely condition";
  }

  if (confidence !== null && loading === false && error === "") {
    confidenceTitle = confidence.toFixed(2) + "% Confidence";
    confidenceWidth = confidence + "%";
  }

  return (
    <div className="ai-page">
      <h1 className="ai-title">GIDEON</h1>

      <div className="ai-layout">
        <div className="ai-card selected-symptoms-card">
          <div className="ai-card-header">
            <span className="ai-icon">☑</span>
            <div>
              <h2>Selected Symptoms</h2>
              <p>Your selected symptoms from the symptoms tab</p>
            </div>
          </div>

          <div className="ai-symptom-list">
            {selectedSymptoms.length > 0 ? (
              selectedSymptoms.map((symptom, index) => (
                <div className="ai-symptom-item" key={index}>
                  <span>{symptom.replaceAll("_", " ")}</span>
                </div>
              ))
            ) : (
              <p className="empty-symptoms">No symptoms selected yet.</p>
            )}
          </div>
        </div>

        <div className="ai-card ai-center-card">
          <div className="orb-container">
            <div className="orb-ring"></div>
            <div className="orb-ring2"></div>
            <div className="orb-ring3"></div>
            <div className="ai-orb"></div>
          </div>
        </div>

        <div className="ai-card result-card">
          <div className="ai-card-header">
            <span className="ai-icon">☑</span>
            <div>
              <h2>Analysis Result</h2>
              <p>AI prediction based on your symptoms</p>
            </div>
          </div>

          <div className="main-result-box">
            <h2>{diseaseText}</h2>
            <p>{subText}</p>
            <h3>{confidenceTitle}</h3>
            <div className="confidence-bar">
              <div
                className="confidence-fill"
                style={{ width: confidenceWidth }}
              ></div>
            </div>
          </div>

          {error !== "" && <p className="ai-error">{error}</p>}

          <div className="result-row">
            <span>Severity</span>
            <strong>{severity}</strong>
          </div>

          <div className="result-row">
            <span>Recommendation</span>
            <strong>{recommendation}</strong>
          </div>

          <div className="result-row">
            <span>Consult Doctor</span>
            <strong>{consultDoctor}</strong>
          </div>

          <p className="ai-warning">
            This is AI generated analysis and not a substitute for professional medical advice.
          </p>
        </div>
      </div>

      <div className="ai-bottom-cards">
        <div className="ai-small-card">
          <span>☁</span>
          <div>
            <h3>FastAPI Connected</h3>
            <p>Live backend connection</p>
          </div>
          <strong>{backendStatus}</strong>
        </div>

        <div className="ai-small-card">
          <span>AI</span>
          <div>
            <h3>AI Model</h3>
            <p>Medical prediction model</p>
          </div>
          <strong>v1.0</strong>
        </div>

        <div className="ai-small-card">
          <span>🔒</span>
          <div>
            <h3>Private & Secure</h3>
            <p>Your symptoms stay private</p>
          </div>
          <strong>Secure</strong>
        </div>
      </div>
    </div>
  );
}

export default Ai;
