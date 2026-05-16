import React, { useEffect, useState } from "react";
import "../styles/start.css";
import { useNavigate } from "react-router-dom";


function Symptoms() {
  
 const head = [
  "abnormal_appearing_tongue",
  "abnormal_movement_of_eyelid",
  "abnormal_size_or_shape_of_ear",
  "bleeding_from_ear",
  "bleeding_from_eye",
  "bleeding_gums",
  "bleeding_in_mouth",
  "blindness",
  "cloudy_eye",
  "coryza",
  "cross_eyed",
  "difficulty_in_swallowing",
  "difficulty_speaking",
  "diminished_hearing",
  "diminished_vision",
  "disturbance_of_smell_or_taste",
  "dizziness",
  "double_vision",
  "drainage_in_throat",
  "dry_lips",
  "dry_or_flaky_scalp",
  "ear_pain",
  "eye_burns_or_stings",
  "eye_deviation",
  "eye_moves_abnormally",
  "eye_redness",
  "eye_strain",
  "eyelid_lesion_or_rash",
  "eyelid_retracted",
  "eyelid_swelling",
  "facial_pain",
  "fluid_in_ear",
  "foreign_body_sensation_in_eye",
  "frontal_headache",
  "gum_pain",
  "headache",
  "hoarse_voice",
  "irregular_appearing_scalp",
  "itchiness_of_eye",
  "itchy_ear_s_",
  "itchy_eyelid",
  "itchy_scalp",
  "jaw_pain",
  "jaw_swelling",
  "lacrimation",
  "lip_sore",
  "lip_swelling",
  "lump_in_throat",
  "lump_over_jaw",
  "mass_on_ear",
  "mass_on_eyelid",
  "mouth_dryness",
  "mouth_pain",
  "mouth_ulcer",
  "nasal_congestion",
  "neck_cramps_or_spasms",
  "neck_mass",
  "neck_pain",
  "neck_stiffness_or_tightness",
  "neck_swelling",
  "neck_weakness",
  "nose_deformity",
  "nosebleed",
  "pain_in_eye",
  "pain_in_gums",
  "painful_sinuses",
  "plugged_feeling_in_ear",
  "pulling_at_ears",
  "pupils_unequal",
  "pus_draining_from_ear",
  "redness_in_ear",
  "redness_in_or_around_nose",
  "ringing_in_ear",
  "sinus_congestion",
  "skin_on_head_or_neck_looks_infected",
  "sneezing",
  "sore_in_nose",
  "sore_throat",
  "spots_or_clouds_in_vision",
  "stuttering_or_stammering",
  "swollen_eye",
  "swollen_or_red_tonsils",
  "swollen_tongue",
  "symptoms_of_eye",
  "symptoms_of_the_face",
  "throat_feels_tight",
  "throat_irritation",
  "throat_redness",
  "throat_swelling",
  "tongue_bleeding",
  "tongue_lesions",
  "tongue_pain",
  "toothache",
  "white_discharge_from_eye",
];

const chest = [
  "abnormal_breathing_sounds",
  "apnea",
  "breathing_fast",
  "burning_chest_pain",
  "chest_tightness",
  "congestion_in_chest",
  "cough",
  "coughing_up_sputum",
  "decreased_heart_rate",
  "difficulty_breathing",
  "hemoptysis",
  "hurts_to_breath",
  "increased_heart_rate",
  "irregular_heartbeat",
  "palpitations",
  "pus_in_sputum",
  "rib_pain",
  "sharp_chest_pain",
  "shortness_of_breath",
  "wheezing",
];

const stomach = [
  "abdominal_distention",
  "absence_of_menstruation",
  "bedwetting",
  "bladder_mass",
  "bleeding_or_discharge_from_nipple",
  "blood_clots_during_menstrual_periods",
  "blood_in_stool",
  "blood_in_urine",
  "bumps_on_penis",
  "burning_abdominal_pain",
  "changes_in_stool_appearance",
  "constipation",
  "diarrhea",
  "discharge_in_stools",
  "early_or_late_onset_of_menopause",
  "excessive_urination_at_night",
  "flatulence",
  "frequent_menstruation",
  "frequent_urination",
  "groin_mass",
  "groin_pain",
  "heartburn",
  "heavy_menstrual_flow",
  "hesitancy",
  "impotence",
  "incontinence_of_stool",
  "infrequent_menstruation",
  "infertility",
  "intermenstrual_bleeding",
  "irregular_belly_button",
  "itching_of_scrotum",
  "itching_of_the_anus",
  "jaundice",
  "kidney_mass",
  "long_menstrual_periods",
  "loss_of_sex_drive",
  "low_urine_output",
  "lower_abdominal_pain",
  "lump_or_mass_of_breast",
  "mass_in_scrotum",
  "mass_on_vulva",
  "mass_or_swelling_around_the_anus",
  "melena",
  "nausea",
  "pain_during_intercourse",
  "pain_during_pregnancy",
  "pain_in_testicles",
  "pain_of_the_anus",
  "pain_or_soreness_of_breast",
  "painful_menstruation",
  "painful_urination",
  "pelvic_pain",
  "pelvic_pressure",
  "penile_discharge",
  "penis_pain",
  "penis_redness",
  "polyuria",
  "postpartum_problems_of_the_breast",
  "premature_ejaculation",
  "premenstrual_tension_or_irritability",
  "problems_during_pregnancy",
  "problems_with_orgasm",
  "problems_with_shape_or_size_of_breast",
  "pus_in_urine",
  "recent_pregnancy",
  "rectal_bleeding",
  "regurgitation",
  "retention_of_urine",
  "scanty_menstrual_flow",
  "sharp_abdominal_pain",
  "spotting_or_bleeding_during_pregnancy",
  "stomach_bloating",
  "suprapubic_pain",
  "swelling_of_scrotum",
  "swollen_abdomen",
  "symptoms_of_bladder",
  "symptoms_of_prostate",
  "symptoms_of_the_kidneys",
  "symptoms_of_the_scrotum_and_testes",
  "unpredictable_menstruation",
  "unusual_color_or_odor_to_urine",
  "upper_abdominal_pain",
  "uterine_contractions",
  "vaginal_bleeding_after_menopause",
  "vaginal_discharge",
  "vaginal_dryness",
  "vaginal_itching",
  "vaginal_pain",
  "vaginal_redness",
  "vomiting",
  "vomiting_blood",
  "vulvar_irritation",
  "vulvar_sore",
];

const skin = [
  "abnormal_appearing_skin",
  "acne_or_pimples",
  "change_in_skin_mole_size_or_color",
  "diaper_rash",
  "flushing",
  "irregular_appearing_nails",
  "itching_of_skin",
  "nailbiting",
  "pallor",
  "skin_dryness_peeling_scaliness_or_roughness",
  "skin_growth",
  "skin_irritation",
  "skin_lesion",
  "skin_moles",
  "skin_oiliness",
  "skin_on_arm_or_hand_looks_infected",
  "skin_pain",
  "skin_rash",
  "skin_swelling",
  "sweating",
  "too_little_hair",
  "unwanted_hair",
  "warts",
  "wrinkles_on_skin",
];

const general = [
  "abnormal_involuntary_movements",
  "abusing_alcohol",
  "ache_all_over",
  "allergic_reaction",
  "antisocial_behavior",
  "anxiety_and_nervousness",
  "arm_cramps_or_spasms",
  "arm_lump_or_mass",
  "arm_pain",
  "arm_stiffness_or_tightness",
  "arm_swelling",
  "arm_weakness",
  "back_cramps_or_spasms",
  "back_mass_or_lump",
  "back_pain",
  "back_stiffness_or_tightness",
  "back_swelling",
  "back_weakness",
  "bones_are_painful",
  "chills",
  "cramps_and_spasms",
  "decreased_appetite",
  "delusions_or_hallucinations",
  "depression",
  "depressive_or_psychotic_symptoms",
  "difficulty_eating",
  "disturbance_of_memory",
  "drug_abuse",
  "elbow_cramps_or_spasms",
  "elbow_lump_or_mass",
  "elbow_pain",
  "elbow_stiffness_or_tightness",
  "elbow_swelling",
  "elbow_weakness",
  "emotional_symptoms",
  "excessive_anger",
  "excessive_appetite",
  "excessive_growth",
  "fainting",
  "fatigue",
  "fears_and_phobias",
  "feeling_cold",
  "feeling_hot",
  "feeling_hot_and_cold",
  "feeling_ill",
  "fever",
  "flu_like_syndrome",
  "fluid_retention",
  "focal_weakness",
  "hand_or_finger_cramps_or_spasms",
  "hand_or_finger_lump_or_mass",
  "hand_or_finger_pain",
  "hand_or_finger_stiffness_or_tightness",
  "hand_or_finger_swelling",
  "hand_or_finger_weakness",
  "hostile_behavior",
  "hot_flashes",
  "hysterical_behavior",
  "infant_feeding_problem",
  "infant_spitting_up",
  "insomnia",
  "irritable_infant",
  "joint_pain",
  "joint_stiffness_or_tightness",
  "joint_swelling",
  "lack_of_growth",
  "loss_of_sensation",
  "low_back_cramps_or_spasms",
  "low_back_pain",
  "low_back_stiffness_or_tightness",
  "low_back_swelling",
  "low_back_weakness",
  "low_self_esteem",
  "lymphedema",
  "muscle_cramps_contractures_or_spasms",
  "muscle_pain",
  "muscle_stiffness_or_tightness",
  "muscle_swelling",
  "muscle_weakness",
  "nightmares",
  "obsessions_and_compulsions",
  "paresthesia",
  "peripheral_edema",
  "poor_circulation",
  "posture_problems",
  "problems_with_movement",
  "recent_weight_loss",
  "restlessness",
  "seizures",
  "shoulder_cramps_or_spasms",
  "shoulder_lump_or_mass",
  "shoulder_pain",
  "shoulder_stiffness_or_tightness",
  "shoulder_swelling",
  "shoulder_weakness",
  "side_pain",
  "sleepiness",
  "sleepwalking",
  "slurring_words",
  "smoking_problems",
  "stiffness_all_over",
  "swollen_lymph_nodes",
  "symptoms_of_infants",
  "temper_problems",
  "thirst",
  "underweight",
  "weakness",
  "weight_gain",
  "wrist_lump_or_mass",
  "wrist_pain",
  "wrist_stiffness_or_tightness",
  "wrist_swelling",
  "wrist_weakness",
];

const legs = [
  "ankle_pain",
  "ankle_stiffness_or_tightness",
  "ankle_swelling",
  "ankle_weakness",
  "bowlegged_or_knock_kneed",
  "feet_turned_in",
  "foot_or_toe_cramps_or_spasms",
  "foot_or_toe_lump_or_mass",
  "foot_or_toe_pain",
  "foot_or_toe_stiffness_or_tightness",
  "foot_or_toe_swelling",
  "foot_or_toe_weakness",
  "hip_lump_or_mass",
  "hip_pain",
  "hip_stiffness_or_tightness",
  "hip_swelling",
  "hip_weakness",
  "knee_cramps_or_spasms",
  "knee_lump_or_mass",
  "knee_pain",
  "knee_stiffness_or_tightness",
  "knee_swelling",
  "knee_weakness",
  "leg_cramps_or_spasms",
  "leg_lump_or_mass",
  "leg_pain",
  "leg_stiffness_or_tightness",
  "leg_swelling",
  "leg_weakness",
  "lower_body_pain",
  "skin_on_leg_or_foot_looks_infected",
];
  const backupSymptomCategories = {
  head,
  chest,
  stomach,
  skin,
  general,
  legs,
};

const [activeCategory, setActiveCategory] = useState("head");
const [selected, setSelected] = useState([]);
const [searchText, setSearchText] = useState("");
const [searchOpen, setSearchOpen] = useState(false);
const [symptomCategories, setSymptomCategories] = useState(backupSymptomCategories);
const [isLoading, setIsLoading] = useState(true);
const [errorMessage, setErrorMessage] = useState("");
const navigate = useNavigate();
useEffect(() => {
  async function loadSymptomsFromDatabase() {
    try {
      const response = await fetch("/php/get_symptoms.php");

      const data = await response.json();

      let symptomsFromDatabase = [];

      if (Array.isArray(data)) {
        symptomsFromDatabase = data;
      } else if (Array.isArray(data.symptoms)) {
        symptomsFromDatabase = data.symptoms;
      } else {
        throw new Error("The symptoms response is not in the expected format.");
      }

      const groupedSymptoms = {
        head: [],
        chest: [],
        stomach: [],
        skin: [],
        general: [],
        legs: [],
      };

      symptomsFromDatabase.forEach((row) => {
        const symptomName =
          row.symptom_name ||
          row.name ||
          row.symptom ||
          row;

        const categoryName =
          row.category ||
          row.category_name ||
          "general";

        const categoryKey = getCategoryKey(categoryName);

        groupedSymptoms[categoryKey].push(symptomName);
      });

      setSymptomCategories(groupedSymptoms);
      setErrorMessage("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Could not load symptoms from the database. Showing backup symptoms.");
      setSymptomCategories(backupSymptomCategories);
    } finally {
      setIsLoading(false);
    }
  }

  loadSymptomsFromDatabase();
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

  localStorage.setItem(
    "medguide_selected_symptoms",
    JSON.stringify(selected)
  );

    navigate("/our-Ai's");
}


const currentSymptoms = symptomCategories[activeCategory] || [];
  const allSymptoms = Object.values(symptomCategories).flat();
  const query = searchText.trim().replaceAll("_", " ").toLowerCase();
  
 let searchResults = [];

     if (query === "") {
      searchResults = [];
      } else {
       searchResults = allSymptoms.filter((symptom) => {
        const readableSymptom = symptom.replaceAll("_", " ").toLowerCase();
    return readableSymptom.includes(query);
  });
}


 function saveSymptom(symptom) {
  setSelected((oldSelected) => {
    if (oldSelected.includes(symptom)) {
      return oldSelected;
    }

    return [...oldSelected, symptom];
  });
}

function removeSymptom(symptomToRemove) {
  setSelected((oldSelected) =>
    oldSelected.filter((symptom) => symptom !== symptomToRemove)
  );
}
  return (
  <>
  <div className="whole-page">


  <div className="title-lol">
  <h1>Select Your Symptoms</h1>

  {isLoading && <p>Loading symptoms from database...</p>}

  {errorMessage !== "" && <p>{errorMessage}</p>}
</div>


 <div className="search-box">
  <h3 className="search-lol">
    Search or Browse Symptoms by Selecting a Category
  </h3>

  <input
    className="search-bar"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    onFocus={() => setSearchOpen(true)}
    onBlur={() => setSearchOpen(false)}
    type="text"
    placeholder="🔍Search symptoms...  (e.g. headache, nausea, shortness of breath)"
  />

  {searchOpen && searchResults.length > 0 && (
    <div className="search-dropdown">
      {searchResults.map((symptom) => (
        <button
          className="search-itemss"
          onMouseDown={() => saveSymptom(symptom)}
          key={symptom}
        >
          {symptom.replaceAll("_", " ")}
        </button>
      ))}
    </div>
  )}
</div>


    <div className="tabs">
    <ul className="tabs-list">
      <li><button onClick={() => setActiveCategory("head")}>Head</button></li>
      <li><button onClick={() => setActiveCategory("chest")}>Chest</button></li>
      <li><button onClick={() => setActiveCategory("stomach")}>Stomach</button></li>
      <li><button onClick={() => setActiveCategory("skin")}>Skin</button></li>
      <li><button onClick={() => setActiveCategory("general")}>General</button></li>
      <li><button onClick={() => setActiveCategory("legs")}>Legs</button></li>
    </ul>
</div>



    <div className="output">


    <div className="symp">

    <h2 className="title-symp">{activeCategory} </h2>
      <div className="whole-symp">
      <div className="symptoms-list">
      {currentSymptoms.map((symptom) => (
        <button onClick={() => saveSymptom(symptom)} className="symptom-item" key={symptom}>
          {symptom.replaceAll("_"," ")}
        </button>
      ))}
    </div>
    </div>
    </div>
    


    <div className="selected-symp">
      
    <h2 className="title-S-symp">Selected Symptoms</h2>
    
    <div className="selected-list">
  {selected.map((symptom) => (
    <button onClick={() => removeSymptom(symptom)} className="selected-items" key={symptom}>
      {symptom.replaceAll("_", " ")}
    </button>
  ))}
</div>
    
    <div className="Analyze">

     <button onClick={handleAnalyzeSymptoms} className="btn-submit"> Analyze Symptoms</button>
    </div>


    </div>


    </div>



    <div className="footer-others">

    </div>



  </div>
  </>
  )
}

export default Symptoms;
