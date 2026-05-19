import React, { useEffect, useState } from "react";
import "../styles/Ai.css";

function Ai() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [predictedDisease, setPredictedDisease] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [detailsError, setDetailsError] = useState("");
  const [severity, setSeverity] = useState("—");
  const [recommendation, setRecommendation] = useState("—");
  const [consultDoctor, setConsultDoctor] = useState("—");

  useEffect(() => {
    document.body.classList.add("our-ai-body");

    const savedSymptoms = localStorage.getItem("medguide_selected_symptoms");

    if (savedSymptoms) {
      try {
        const symptoms = JSON.parse(savedSymptoms);

        setSelectedSymptoms(symptoms);

        if (symptoms.length > 0) {
          predictDisease(symptoms);
        }
      } catch (error) {
        console.log("Could not read saved symptoms:", error);
        setError("Could not read selected symptoms.");
      }
    }

    return () => {
      document.body.classList.remove("our-ai-body");
    };
  }, []);

  async function predictDisease(symptoms) {
    setLoading(true);
    setError("");
    setDetailsError("");
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
          Accept: "application/json",
        },
        body: JSON.stringify({
          symptoms: symptoms,
        }),
      });

      const text = await response.text();

      console.log("Raw FastAPI response:", text);

      if (!response.ok) {
        throw new Error("FastAPI request failed with status " + response.status);
      }

      if (text.trim().startsWith("<")) {
        throw new Error("FastAPI returned HTML instead of JSON.");
      }

      const data = JSON.parse(text);

      console.log("FastAPI prediction response:", data);

      if (!data.predicted_disease) {
        throw new Error("FastAPI did not return predicted_disease.");
      }

      const diseaseName = data.predicted_disease;

      setPredictedDisease(diseaseName);

      if (data.confidence !== undefined && data.confidence !== null) {
        setConfidence(data.confidence);
      }

      try {
        const diseaseDetails = await getDiseaseDetailsFromDatabase(diseaseName);

        setSeverity(diseaseDetails.severity_level || "—");
        setRecommendation(diseaseDetails.recommendation || "—");
        setConsultDoctor(diseaseDetails.consult_doctor || "—");
        setDetailsError("");
      } catch (detailsError) {
        console.log("Disease details error:", detailsError);

        setSeverity("Not found");
        setRecommendation("Not found");
        setConsultDoctor("Not found");
        setDetailsError(detailsError.message || "Disease details were not found.");
      }
    } catch (error) {
      console.log("AI page error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function cleanDiseaseNameForDatabase(diseaseName) {
    let cleanedName = String(diseaseName);

    cleanedName = cleanedName.replaceAll("_", " ");
    cleanedName = cleanedName.replace(/\s+/g, " ");
    cleanedName = cleanedName.trim();

    return cleanedName;
  }

  async function getDiseaseDetailsFromDatabase(diseaseName) {
    const cleanedDiseaseName = cleanDiseaseNameForDatabase(diseaseName);

    console.log("Disease from FastAPI:", diseaseName);
    console.log("Disease sent to database:", cleanedDiseaseName);

    const response = await fetch("/php/get_disease_details.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        disease: cleanedDiseaseName,
      }),
    });

    const text = await response.text();

    console.log("Raw disease details response:", text);

    if (!response.ok) {
      throw new Error("Disease details request failed with status " + response.status);
    }

    if (text.trim().startsWith("<")) {
      throw new Error("PHP returned HTML instead of JSON.");
    }

    const json = JSON.parse(text);

    console.log("Disease details response:", json);

    if (!json.success) {
      throw new Error(json.message || "Disease details not found in database.");
    }

    return json.disease;
  }

  function formatConfidence(value) {
    if (value === null || value === undefined) {
      return {
        title: "—",
        width: "0%",
      };
    }

    let numberValue = Number(value);

    if (Number.isNaN(numberValue)) {
      return {
        title: "—",
        width: "0%",
      };
    }

    if (numberValue <= 1) {
      numberValue = numberValue * 100;
    }

    if (numberValue > 100) {
      numberValue = 100;
    }

    if (numberValue < 0) {
      numberValue = 0;
    }

    return {
      title: numberValue.toFixed(2) + "% Confidence",
      width: numberValue + "%",
    };
  }

  let diseaseText = "No result yet";
  let subText = "Waiting for AI prediction";
  let confidenceInfo = formatConfidence(confidence);
  let confidenceTitle = confidenceInfo.title;
  let confidenceWidth = confidenceInfo.width;
  let backendStatus = "Online";

  if (loading === true) {
    diseaseText = "Analyzing...";
    subText = "Please wait";
    confidenceTitle = "Loading...";
    confidenceWidth = "0%";
    backendStatus = "Loading";
  }

  if (error !== "") {
    diseaseText = "Prediction failed";
    subText = "Could not get prediction";
    confidenceTitle = "—";
    confidenceWidth = "0%";
    backendStatus = "Offline";
  }

  if (predictedDisease !== "" && loading === false && error === "") {
    diseaseText = predictedDisease.replaceAll("_", " ");
    subText = "Most likely condition";
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
  <div className="orb-stage">
    <div className="orb-ring orb-ring-back orb-ring-one"></div>
    <div className="orb-ring orb-ring-back orb-ring-two"></div>
    <div className="orb-ring orb-ring-back orb-ring-three"></div>

    <div className="ai-orb-shadow"></div>
    <div className="ai-orb"></div>

    <div className="orb-ring orb-ring-front orb-ring-one"></div>
    <div className="orb-ring orb-ring-front orb-ring-two"></div>
    <div className="orb-ring orb-ring-front orb-ring-three"></div>
  </div>
</div>assName="ai-orb"></div>
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

          {detailsError !== "" && error === "" && (
            <p className="ai-error">{detailsError}</p>
          )}

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
