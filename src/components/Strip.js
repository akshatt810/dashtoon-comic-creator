import "./Strip.css";

const Strip = ({ imgSrcs, loading, available }) => {
  const imagePanels = [
    "panel1",
    "panel2",
    "panel3",
    "panel4",
    "panel5",
    "panel6",
    "panel7",
    "panel8",
    "panel9",
    "panel10",
  ];

  return (
    <div className="strip-container">
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <>
          {available && <h1>Preview</h1>}
          <div className="strip">
            {imagePanels.map((p) => (
              <img src={imgSrcs[p]} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Strip;
