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
      <h4>What even is this app?</h4>
      <Instruction>
        It's a utility for quickly sending a link or text from one device to
        another.
      </Instruction>
      <Instruction>
        It's faster than emailing yourself and doesn't require any typing.
      </Instruction>
      <Instruction>
        Open the app on one device, then scan the code with the other device.
      </Instruction>
      <Instruction>
        The background color on each device will match if you're correctly
        paired.
      </Instruction>
      <Instruction>
        Paste something in the text box and send, it will show up on the other
        device.
      </Instruction>
      <Instruction>
        Links are automatically opened by default, uncheck the box above to
        disable.
      </Instruction>
      <h4>No browser?</h4>
      <Instruction>
        Use this command on the receiving device to get the sent data.
      </Instruction>
      <Code>
        curl {apiUrl}/sessions/{props.sessionId}/data
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
