import { useState } from "react";
import PanelDescForm from "./components/PanelDescForm";
import Strip from "./components/Strip";
import axios from "axios";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(false);
  const [available, setAvailable] = useState(false);
  const [imgSrcs, setImgSrcs] = useState({
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


const getImages = async (e, panelDescs) => {
  e.preventDefault();
  setLoading(true);
  const promises = [];
  const newImgSrc = {};

  for (let i = 1; i <= 10; i++) {
    promises.push(axios.post('https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud', {
      inputs: panelDescs[`panel${i}`],
    }, {
      headers: {
        Accept: 'image/png',
        Authorization: 'Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM',
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    }));
  }

  try {
    const results = await Promise.all(promises);

    results.forEach((x, idx) => {
      const url = URL.createObjectURL(x.data);
      newImgSrc[`panel${idx + 1}`] = url;
    });

    setImgSrcs(newImgSrc);
    setLoading(false);
    setAvailable(true);
  } catch (error) {
    console.error('Error:', error);
    // Handle error if necessary
    setLoading(false);
  }
};

  return (
    <div className="App">
      {
        !form ? (
          <div className="home-container">
            <div className="home-text"> Welcome to the world of Comic Creators!</div>
            <div className="home-text"> Design your own custom comic panels here!</div>
            <button className="home-btn"
              onClick={()=> setForm(true)}>Get Started</button>
          </div>
      ) : (
        <>
          <PanelDescForm
            setImgSrcs={setImgSrcs}
            getImages={getImages}
            loading={loading}
          />
          <Strip imgSrcs={imgSrcs} loading={loading} available={available} />
        </>
      )
    }
    </div>
  );
}

export default App;
