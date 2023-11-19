import { useState } from "react";
import PanelDescriptionForm from "./components/PanelDescriptionForm";
import Strip from "./components/Strip";
import Header from "./components/Header";

function App() {
  const [loading, setLoading] = useState(false);
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

  async function query(data) {
    const response = await fetch(
      "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
      {
        headers: {
          Accept: "image/png",
          Authorization:
            "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.blob();
    return result;
  }

  const getImages = (e, panelDescriptions) => {
    e.preventDefault();
    setLoading(true);
    const promises = [];
    const newImgSrc = {};
    for (let i = 1; i <= 10; i++)
      promises.push(query({ inputs: panelDescriptions[`panel${i}`] }));
    Promise.all(promises).then((results) => {
      results.forEach((x, idx) => {
        const url = URL.createObjectURL(x);
        newImgSrc[`panel${idx + 1}`] = url;
      });
      setImgSrcs(newImgSrc);
      setLoading(false);
      setAvailable(true);
    });
  };

  return (
    <div className="App">
      <Header />
      <PanelDescriptionForm
        setImgSrcs={setImgSrcs}
        getImages={getImages}
        loading={loading}
      />

      <Strip imgSrcs={imgSrcs} loading={loading} available={available} />
    </div>
  );
}

export default App;
