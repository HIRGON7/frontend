import React, { useEffect, useState } from "react";
import "../styles/start.css";
import { useNavigate } from "react-router-dom";

function Symptoms() {

  
  function getEmptySymptomCategories() {
  return {
    head: [],
    chest: [],
    stomach: [],
    skin: [],
    general: [],
    legs: [],
  };
}

  
  const [activeCategory, setActiveCategory] = useState("head");
  const [selected, setSelected] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [symptomCategories, setSymptomCategories] = useState(getEmptySymptomCategories);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  async function loadSymptomsFromDatabase() {
    const response = await fetch("/php/get_symptoms.php", {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    const text = await response.text();

    console.log("Raw symptoms response:", text);

    if (!response.ok) {
      throw new Error("Symptoms request failed with status " + response.status);
    }

    if (text.trim().startsWith("<")) {
      throw new Error("PHP returned HTML instead of JSON. Check AwardSpace or vercel.json.");
    }

    const json = JSON.parse(text);

    return json;
  }

  useEffect(() => {
    async function loadSymptoms() {
      setIsLoading(true);
      setErrorMessage("");

      try {
        const json = await loadSymptomsFromDatabase();

        console.log("Symptoms response:", json);

        if (!json.success) {
          throw new Error(json.message || "Database did not return success.");
        }

        const symptomsFromDatabase = json.data;

        const groupedSymptoms = {
          head: [],
          chest: [],
          stomach: [],
          skin: [],
          general: [],
          legs: [],
        };

        for (const [dbCategory, symptomNames] of Object.entries(symptomsFromDatabase)) {
          const key = getCategoryKey(dbCategory);

          if (Array.isArray(symptomNames)) {
            groupedSymptoms[key] = groupedSymptoms[key].concat(symptomNames);
          }
        }

        const hasSymptoms = Object.values(groupedSymptoms).some(function (categorySymptoms) {
          return categorySymptoms.length > 0;
        });

        if (!hasSymptoms) {
          throw new Error("No symptoms were returned from the database.");
        }

        setSymptomCategories(groupedSymptoms);
        setErrorMessage("");
        } catch (error) {
          console.log("Database load failed:", error);
          setErrorMessage(error.message);
          setSymptomCategories(getEmptySymptomCategories());
        } finally {
        setIsLoading(false);
      }
    }

    loadSymptoms();
  }, []);

  function getCategoryKey(categoryName) {
    const text = String(categoryName).toLowerCase();

    if (text.includes("head") || text.includes("neck")) {
      return "head";
    }

    if (text.includes("chest") || text.includes("breathing")) {
      return "chest";
    }

    if (
      text.includes("stomach") ||
      text.includes("abdomen") ||
      text.includes("abdominal")
    ) {
      return "stomach";
    }

    if (text.includes("skin")) {
      return "skin";
    }

    if (text.includes("leg") || text.includes("feet") || text.includes("foot")) {
      return "legs";
    }

    return "general";
  }

  function handleAnalyzeSymptoms() {
    if (selected.length === 0) {
      alert("Please select at least one symptom first.");
      return;
    }

    const formattedForAI = selected.map(function (symptom) {
      return symptom.toLowerCase().replaceAll(" ", "_");
    });

    localStorage.setItem("medguide_selected_symptoms", JSON.stringify(formattedForAI));

    navigate("/our-Ai's");
  }

  const currentSymptoms = symptomCategories[activeCategory] || [];
  const allSymptoms = Object.values(symptomCategories).flat();
  const query = searchText.trim().replaceAll("_", " ").toLowerCase();

  let searchResults = [];

  if (query !== "") {
    searchResults = allSymptoms.filter(function (symptom) {
      const readableSymptom = symptom.replaceAll("_", " ").toLowerCase();
      return readableSymptom.includes(query);
    });
  }

  function saveSymptom(symptom) {
    setSelected(function (oldSelected) {
      if (oldSelected.includes(symptom)) {
        return oldSelected;
      }

      return oldSelected.concat(symptom);
    });
  }

  function removeSymptom(symptomToRemove) {
    setSelected(function (oldSelected) {
      return oldSelected.filter(function (symptom) {
        return symptom !== symptomToRemove;
      });
    });
  }

  return (
    <>
      <div className="whole-page">
        <div className="title-lol">
          <h1>Select Your Symptoms</h1>

          {isLoading && <p>Loading symptoms from database...</p>}

          {errorMessage !== "" && (
            <p>
              Could not load symptoms from the database. Please try again later.
               Error: {errorMessage}
            </p>
          )}
        </div>

        <div className="search-box">
          <h3 className="search-lol">
            Search or Browse Symptoms by Selecting a Category
          </h3>

          <input
            className="search-bar"
            value={searchText}
            onChange={function (e) {
              setSearchText(e.target.value);
            }}
            onFocus={function () {
              setSearchOpen(true);
            }}
            onBlur={function () {
              setSearchOpen(false);
            }}
            type="text"
            placeholder="🔍Search symptoms...  (e.g. headache, nausea, shortness of breath)"
          />

          {searchOpen && searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map(function (symptom) {
                return (
                  <button
                    className="search-itemss"
                    onMouseDown={function () {
                      saveSymptom(symptom);
                    }}
                    key={symptom}
                  >
                    {symptom.replaceAll("_", " ")}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="tabs">
          <ul className="tabs-list">
            <li>
              <button
                onClick={function () {
                  setActiveCategory("head");
                }}
              >
                Head
              </button>
            </li>

            <li>
              <button
                onClick={function () {
                  setActiveCategory("chest");
                }}
              >
                Chest
              </button>
            </li>

            <li>
              <button
                onClick={function () {
                  setActiveCategory("stomach");
                }}
              >
                Stomach
              </button>
            </li>

            <li>
              <button
                onClick={function () {
                  setActiveCategory("skin");
                }}
              >
                Skin
              </button>
            </li>

            <li>
              <button
                onClick={function () {
                  setActiveCategory("general");
                }}
              >
                General
              </button>
            </li>

            <li>
              <button
                onClick={function () {
                  setActiveCategory("legs");
                }}
              >
                Legs
              </button>
            </li>
          </ul>
        </div>

        <div className="output">
          <div className="symp">
            <h2 className="title-symp">{activeCategory}</h2>

            <div className="whole-symp">
              <div className="symptoms-list">
                {currentSymptoms.map(function (symptom) {
                  return (
                    <button
                      onClick={function () {
                        saveSymptom(symptom);
                      }}
                      className="symptom-item"
                      key={symptom}
                    >
                      {symptom.replaceAll("_", " ")}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="selected-symp">
            <h2 className="title-S-symp">Selected Symptoms</h2>

            <div className="selected-list">
              {selected.map(function (symptom) {
                return (
                  <button
                    onClick={function () {
                      removeSymptom(symptom);
                    }}
                    className="selected-items"
                    key={symptom}
                  >
                    {symptom.replaceAll("_", " ")}
                  </button>
                );
              })}
            </div>

            <div className="Analyze">
              <button onClick={handleAnalyzeSymptoms} className="btn-submit">
                Analyze Symptoms
              </button>
            </div>
          </div>
        </div>

        <div className="footer-others"></div>
      </div>
    </>
  );
}

export default Symptoms;
