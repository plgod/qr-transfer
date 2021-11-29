import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import PayloadHandler from "./PayloadHandler";
import Spinner from "./Spinner";

const localUrl = process.env.REACT_APP_LOCAL_URL;

const SessionCard = styled.div`
  min-width: 30vw;
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
    fetch(`${apiUrl}/sessions/${props.sessionId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data && json.data !== payload) {
          if (json.data.match(urlRegex) && props.autoFollow) {
            window.location.href = json.data;
          }
          setPayload(json.data);
        }
      });
  };

  useEffect(() => {
    const interval = setInterval(poll, 1000);
    return () => clearInterval(interval);
  });

  const sendInSession = (payload) => {
    fetch(`${apiUrl}/sessions/${props.sessionId}`, {
      method: "put",
      body: JSON.stringify({ data: payload }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <SessionCard sessionId={props.sessionId}>
      {props.sessionId ? (
        <>
          <PayloadHandler payload={payload} onSend={sendInSession} />

          <h2>Scan to pair:</h2>
          <QRCode value={sessionUrl} onClick={copyUrl} />
          <h5>{copied ? "Copied!" : "Click QR code to copy URL"}</h5>
        </>
      ) : (
        <Spinner />
      )}
    </SessionCard>
  );
}

export default SessionInfo;
