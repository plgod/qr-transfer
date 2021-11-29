import { useState } from "react";
import QRCode from "react-qr-code";
import styled from "styled-components";
import Spinner from "./Spinner";

const localUrl = process.env.REACT_APP_LOCAL_URL;

const SessionCard = styled.div`
  padding: 1rem;
  border: 1px solid black;
  border-radius: 10px;
  background-color: hsl(${(props) => props.sessionId * 137.5}, 50%, 50%);
  text-align: center;
`;

function SessionInfo(props) {
  const sessionUrl = `${localUrl}/?session=${props.sessionId}`;
  const [copied, setCopied] = useState(false);

  const copyUrl = () => {
    navigator.clipboard.writeText(sessionUrl);
    setCopied(true);
  };

  return (
    <SessionCard sessionId={props.sessionId}>
      {props.sessionId ? (
        <>
          <h2>Your unique session code:</h2>
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
