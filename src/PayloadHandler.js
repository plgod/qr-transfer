import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  border-radius: 10px;
  font-size: 24px;

  text-align: center;
`;

const SendButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 24px;
  background-color: orange;
  color: white;
`;

function PayloadHandler(props) {
  const [textField, setTextField] = useState(props.payload);
  useEffect(() => {
    setTextField(props.payload);
  }, [props.payload]);

  return (
    <>
      <StyledInput
        value={textField}
        onClick={(event) => event.target.select()}
        onChange={(event) => setTextField(event.target.value)}
        placeholder="Paste or type here"
      />
      <SendButton onClick={() => props.onSend(textField)}>Send</SendButton>
    </>
  );
}

export default PayloadHandler;
