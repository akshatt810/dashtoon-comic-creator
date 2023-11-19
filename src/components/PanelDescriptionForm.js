import { useState } from "react";
import "./PanelDescriptionForm.css";

const PanelDescriptionForm = ({ getImages, loading }) => {
  const [panelDescriptions, setPanelDescriptions] = useState({
    panel1: "",
    panel2: "",
    panel3: "",
    panel4: "",
    panel5: "",
    panel6: "",
    panel7: "",
    panel8: "",
    panel9: "",
    panel10: "",
  });

  const panelNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const panelDescriptionChangeHandler = (e, panelNumber) => {
    setPanelDescriptions((panelDescriptions) => ({
      ...panelDescriptions,
      [panelNumber]: e.target.value,
    }));
  };

  return (
    <div className="form-container">
      <h1>Add a description for each panel below</h1>
      <form
        onSubmit={(e) => getImages(e, panelDescriptions)}
        className="panel-desc-form"
      >
        {panelNumbers.map((panelNumber) => {
          return (
            <div>
              <label className="panel-desc-label">Panel {panelNumber}</label>
              <input
                className="panel-desc-input"
                type="text"
                onChange={(e) =>
                  panelDescriptionChangeHandler(e, `panel${panelNumber}`)
                }
              />
            </div>
          );
        })}
        <button type="submit" className="btn" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PanelDescriptionForm;
