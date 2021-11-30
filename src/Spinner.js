import "./Spinner.css";

function Spinner() {
  return (
    <>
      <div className="loader"></div>
      <p className="sub">
        I cheaped out on cloud hosting so the first load will take about 30s.
        Bear with me...
      </p>
    </>
  );
}

export default Spinner;
