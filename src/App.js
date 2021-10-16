import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import "./App.css";

const StyledInput = styled.input`
  width: 95vw;
  padding: 10px;
  border-radius: 10px;
  font-size: 24px;

  text-align: center;
`;

const PasteButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 24px;
  background-color: orange;
  color: white;
`;

const apiUrl = process.env.REACT_APP_API_URL;
const localUrl = process.env.REACT_APP_LOCAL_URL;
const urlRegex =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

function App() {
  const [sessionId, setSessionId] = useState(
    new URLSearchParams(window.location.search).get("session")
  );
  const [textField, setTextField] = useState("");
  const params = new URLSearchParams(window.location.search);

  const poll = () => {
    fetch(`${apiUrl}/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.data && payload.data.match(urlRegex)) {
          window.location.href = payload.data;
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    async function joinOrCreateSession() {
      if (!sessionId) {
        const res = await fetch(`${apiUrl}/sessions`, { method: "post" });
        const data = await res.json();
        setSessionId(data.sessionId);
      }
    }

    joinOrCreateSession();
  }, [sessionId]);

  const paste = async () => {
    const contents = await navigator.clipboard.readText();
    setTextField(contents);
  };

  const sendInSession = () => {
    if (!textField.match(urlRegex)) {
      return;
    }
    fetch(`${apiUrl}/sessions/${params.get("session")}`, {
      method: "put",
      body: JSON.stringify({ data: textField }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="App">
      <PasteButton onClick={paste}>Paste from clipboard</PasteButton>
      <StyledInput
        value={textField}
        onChange={(event) => setTextField(event.target.value)}
        placeholder="Paste a link or have someone scan this!"
      />
      {params.get("session") ? (
        <PasteButton onClick={sendInSession}>Send</PasteButton>
      ) : (
        <QRCode
          value={
            textField !== "" ? textField : `${localUrl}/?session=${sessionId}`
          }
        />
      )}
      <p>
        QR: {textField !== "" ? textField : `${localUrl}/?session=${sessionId}`}
      </p>
    </div>
  );
}

export default App;
