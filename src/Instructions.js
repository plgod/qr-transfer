import styled from "styled-components";

const localUrl = process.env.REACT_APP_LOCAL_URL;
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
      <h4>No browser?</h4>
      <Instruction>
        Use this command on the receiving device to get the data.
      </Instruction>
      <Code>
        curl {apiUrl}/sessions/{props.sessionId}/raw
      </Code>
      <h4>No camera on either device?</h4>
      <Instruction>
        You'll need a third device that has a camera (e.g. your phone).
        <ol>
          <li>
            Open this app on both devices. The colors will be different (e.g.
            orange and blue).
          </li>
          <li>Use your phone to scan the orange code.</li>
          <li>Tap the QR code to copy the orange code's URL.</li>
          <li>Use the camera again to scan the other (blue) code.</li>
          <li>
            Paste the orange code's URL in the page with the blue code and send.
          </li>
          <li>All 3 devices should now be paired with the orange code.</li>
        </ol>
      </Instruction>
    </Centered>
  );
}

export default Instructions;
