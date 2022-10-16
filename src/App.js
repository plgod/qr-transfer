import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";
import Header from "./Header";
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

const Section = styled.div`
  margin: 10px 10px 20px 10px;
`

function App() {
  const [sessionId, setSessionId] = useState(
    new URLSearchParams(window.location.search).get("session")
  );

  useEffect(() => {
    async function joinOrCreateSession() {
      if (!sessionId) {
        const sessionId = Math.floor((Math.random() * 100000) % 100000);
        setSessionId(sessionId);
        await fetch(`${apiUrl}/sessions/${sessionId}.json`, {
          method: "put",
          body: JSON.stringify({ data: null }),
        });

        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set("session", sessionId);
        window.history.replaceState({ path: newUrl.href }, "", newUrl.href);
      }
    }

    joinOrCreateSession();
  }, [sessionId]);

  return (
    <>
      <Header />
      <div className="App">
        <Section>
          <NewSession onClick={() => setSessionId(null)}>
            Generate new code
          </NewSession>
        </Section>
        <Section>
          {sessionId ? (
            <SessionInfo sessionId={sessionId} />
          ) : (
            <Spinner />
          )}
        </Section>
        <Section>
          <Instructions sessionId={sessionId} />
        </Section>
      </div>
    </>
  );
}

export default App;
