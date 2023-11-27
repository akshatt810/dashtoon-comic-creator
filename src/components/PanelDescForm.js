import { useState } from "react";
import "./styles/PanelDescForm.css";

const PanelDescForm = ({ getImages, loading }) => {
  const [formVis, setFormVis] = useState(true);
  const [panelDescs, setPanelDescs] = useState({
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

  const panelDescChangeHandler = (e, panelNumber) => {
    setFormVis(false);
    setPanelDescs((panelDescs) => ({
      ...panelDescs,
      [panelNumber]: e.target.value,
    }));
  };

  return (
    <div className="form-container">
      <h1>Please Provide Desired Description For The Panels</h1>
      <form
        onSubmit={(e) => getImages(e, panelDescs)}
        className="panel-desc-form"
      > { !formVis ? (
            <></>
          ) : 
          (
            <>
              {panelNumbers.map((panelNumber) => {
                return (
                  <div>
                    <label className="panel-desc-label">Enter Panel {panelNumber} Description</label>
                    <input
                      className="panel-desc-input"
                      type="text"
                      onChange={(e) =>
                        panelDescChangeHandler(e, `panel${panelNumber}`)
                      }
                    />
                  </div>
                );
              })}
            </>
          )
        }
        <button type="submit" className="btn-btn-submit" disabled={loading}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PanelDescForm;
