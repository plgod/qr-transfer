import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Instructions from "./Instructions";
import SessionInfo from "./SessionInfo";
import Spinner from "./Spinner";

const apiUrl = process.env.REACT_APP_API_URL;

const NewSession = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  background-color: #56a7db;
  color: white;
  box-shadow: 2px 2px 8px -3px #000;
`;

function App() {
  const [sessionId, setSessionId] = useState(
    new URLSearchParams(window.location.search).get("session")
  );
  const [autoFollow, setAutoFollow] = useState(
    window.localStorage.getItem("autoFollowUrls") !== "false"
  );

  useEffect(() => {
    async function joinOrCreateSession() {
      if (!sessionId) {
        const res = await fetch(`${apiUrl}/sessions`, { method: "post" });
        const data = await res.json();
        setSessionId(data.sessionId);

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("session", data.sessionId);
        window.history.replaceState({ path: newUrl.href }, "", newUrl.href);
      }
    }

    joinOrCreateSession();
  }, [sessionId]);

  const setAutoFollowPreference = (autoFollow) => {
    window.localStorage.setItem("autoFollowUrls", autoFollow);
    setAutoFollow(autoFollow);
  };

  return (
    <div className="App">
      <NewSession onClick={() => setSessionId(null)}>
        Generate new code
      </NewSession>
      {sessionId ? (
        <SessionInfo sessionId={sessionId} autoFollow={autoFollow} />
      ) : (
        <Spinner />
      )}
      <span>
        <input
          type="checkbox"
          id="auto-follow"
          checked={autoFollow}
          onChange={(event) => setAutoFollowPreference(event.target.checked)}
        />
        <label for="auto-follow"> Auto-follow URL</label>
      </span>
      <Instructions sessionId={sessionId} />
    </div>
  );
}

export default App;
