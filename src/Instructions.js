import styled from "styled-components";

const apiUrl = process.env.REACT_APP_API_URL;

const Centered = styled.div`
  text-align: center;
  width: 100%;
`;

const Instruction = styled.p`
  margin: 0;
`;

const Code = styled.p`
  font-family: monospace;
`;

function Instructions(props) {
  return (
    <Centered>
      <h4>How does this work?</h4>
      <Instruction>
        This app sends links and text from one device to another.
      </Instruction>
      <Instruction>
        Scan the session QR code from another device to pair. If pairing is
        successful, the session's color should match on both devices.
      </Instruction>
      <Instruction>
        Any link or text sent from one device will appear on the other.
      </Instruction>
      <Instruction>
        By default, links are automatically opened on both devices. To disable
        that, uncheck the box above.
      </Instruction>
      <h4>Advanced usage</h4>
      <Instruction>No browser? No problem.</Instruction>
      <Code>
        curl {apiUrl}/sessions/{props.sessionId}/raw
      </Code>
    </Centered>
  );
}

export default Instructions;
