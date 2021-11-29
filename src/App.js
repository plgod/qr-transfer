import { useEffect, useState } from "react";
import "./App.css";
import Instructions from "./Instructions";
import PayloadHandler from "./PayloadHandler";
import SessionInfo from "./SessionInfo";

const apiUrl = process.env.REACT_APP_API_URL;
const urlRegex =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

function App() {
  const [sessionId, setSessionId] = useState(
    new URLSearchParams(window.location.search).get("session")
  );
  const [payload, setPayload] = useState();
  const [autoFollow, setAutoFollow] = useState(
    window.localStorage.getItem("autoFollowUrls") !== "false"
  );

  const poll = () => {
    if (sessionId === null) return;
    fetch(`${apiUrl}/sessions/${sessionId}`)
      .then((res) => res.json())
      .then((json) => {
        if (json?.data && json.data !== payload) {
          if (json.data.match(urlRegex) && autoFollow) {
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

  const sendInSession = (payload) => {
    fetch(`${apiUrl}/sessions/${sessionId}`, {
      method: "put",
      body: JSON.stringify({ data: payload }),
      headers: { "Content-Type": "application/json" },
    });
  };

  const setAutoFollowPreference = (autoFollow) => {
    window.localStorage.setItem("autoFollowUrls", autoFollow);
    setAutoFollow(autoFollow);
  };

  return (
    <div className="App">
      <PayloadHandler payload={payload} onSend={sendInSession} />
      <SessionInfo sessionId={sessionId} />
      <span>
        <input
          type="checkbox"
          id="auto-follow"
          checked={autoFollow}
          onChange={(event) => setAutoFollowPreference(event.target.checked)}
        />
        <label for="auto-follow"> Auto-follow URL</label>
      </span>
      <Instructions />
    </div>
  );
}

export default App;
