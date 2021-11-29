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
  return (
    <SessionCard sessionId={props.sessionId}>
      {props.sessionId ? (
        <>
          <h2>Your unique session code:</h2>
          <QRCode value={`${localUrl}/?session=${props.sessionId}`} />
        </>
      ) : (
        <Spinner />
      )}
      <p>QR: {`${localUrl}/?session=${props.sessionId}`}</p>
    </SessionCard>
  );
}

export default SessionInfo;
