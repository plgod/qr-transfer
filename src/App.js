import { useEffect, useState } from "react";
import "./App.css";
import Instructions from "./Instructions";
import SessionInfo from "./SessionInfo";

const apiUrl = process.env.REACT_APP_API_URL;

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
      <SessionInfo sessionId={sessionId} autoFollow={autoFollow} />
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
