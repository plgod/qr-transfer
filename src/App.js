import { useState } from "react";
import QRCode from "react-qr-code";
import "./App.css";

function App() {
  const [qr, setQr] = useState("");

  return (
    <div className="App">
      <input value={qr} onChange={(event) => setQr(event.target.value)} />
      <QRCode value={qr} />
    </div>
  );
}

export default App;
