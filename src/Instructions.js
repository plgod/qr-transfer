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
      <h4>What is this?</h4>
      <Instruction>
        It's a utility for quickly sending a link or text from one device to
        another.
      </Instruction>

      <h4>How do I use it?</h4>
      <Instruction>Scan the code above with another device.</Instruction>
      <Instruction>
        Write something in the text box from either device and send, it will
        show up on the other device.
      </Instruction>
      <h4>No browser?</h4>
      <Instruction>Fetch the data directly from the API:</Instruction>
      <Code>
        curl {apiUrl}/sessions/{props.sessionId}/data.json
      </Code>
      <h4>No camera on either device?</h4>
      <Instruction>
        Type in this page's URL manually on the other device. Make sure to
        include the session number!
      </Instruction>
    </Centered>
  );
}

export default Instructions;
