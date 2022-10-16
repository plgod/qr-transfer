import { useEffect, useState } from "react";
import styled from "styled-components";

const urlRegex =
  /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

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

const ButtonStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 120px;
`;

const SendButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  background-color: orange;
  color: white;
`;

const VisitLinkButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  font-size: 20px;
  background-color: royalblue;
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
      <ButtonStack>
        <SendButton onClick={() => props.onSend(textField)}>Send</SendButton>
        {urlRegex.test(textField) && (
          <VisitLinkButton onClick={() => (window.location.href = textField)}>
            Visit Link
          </VisitLinkButton>
        )}
      </ButtonStack>
    </Flexbox>
  );
}

export default PayloadHandler;
