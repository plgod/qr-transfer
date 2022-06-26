import { useEffect, useState } from "react";
import styled from "styled-components";

const Flexbox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

const StyledInput = styled.textarea`
  flex-grow: 1;
  padding: 10px;
  border-radius: 10px;
  min-height: 8rem;
`;

const SendButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  background-color: orange;
  color: white;
`;

function PayloadHandler(props) {
  const [textField, setTextField] = useState(props.payload);
  useEffect(() => {
    setTextField(props.payload);
  }, [props.payload]);

  return (
    <Flexbox>
      <StyledInput
        value={textField}
        onClick={(event) => event.target.select()}
        onChange={(event) => setTextField(event.target.value)}
        placeholder="Paste or type here"
      />
      <SendButton onClick={() => props.onSend(textField)}>Send</SendButton>
    </Flexbox>
  );
}

export default PayloadHandler;
