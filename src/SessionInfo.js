import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import PayloadHandler from "./PayloadHandler";
import Spinner from "./Spinner";

const localUrl = process.env.REACT_APP_LOCAL_URL;

const SessionCard = styled.div`
  width: 80vw;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 10px;
  background-color: hsl(${(props) => props.sessionId * 137.5}, 50%, 50%);
  text-align: center;
`;

const apiUrl = process.env.REACT_APP_API_URL;
const urlRegex =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

function SessionInfo(props) {
  const sessionUrl = `${localUrl}/?session=${props.sessionId}`;
  const [copied, setCopied] = useState(false);
  const [payload, setPayload] = useState();

  const copyUrl = () => {
    navigator.clipboard.writeText(sessionUrl);
    setCopied(true);
  };

  const poll = () => {
    if (props.sessionId === null) return;
    fetch(`${apiUrl}/sessions/${props.sessionId}.json`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data && json.data !== payload) {
          setPayload(json.data);
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  });

  const sendInSession = (payload) => {
    fetch(`${apiUrl}/sessions/${props.sessionId}.json`, {
      method: "put",
      body: JSON.stringify({ data: payload }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <SessionCard sessionId={props.sessionId}>
      {props.sessionId ? (
        <>
          <h2>1) Scan to pair</h2>
          <QRCode value={sessionUrl} onClick={copyUrl} />
          <h5>{copied ? "Copied!" : "Click QR code to copy URL"}</h5>

          <h2>2) Type or paste below then hit Send</h2>
          <PayloadHandler payload={payload} onSend={sendInSession} />
        </>
      ) : (
        <Spinner />
      )}
    </SessionCard>
  );
}

export default SessionInfo;
