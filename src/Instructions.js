import styled from "styled-components";

const InstructionsHeader = styled.h4`
  margin-bottom: 0;
`;

function Instructions() {
  return (
    <>
      <InstructionsHeader>How does this work?</InstructionsHeader>
      <p>
        This app sends text data from one device to another using a QR code.
        <br />
        To send something, type or paste it in the text field, and have the
        recipient scan the QR code.
        <br />
        To receive something, don't type anything, instead have the sender scan
        your QR code and type or paste on their device. The data will then show
        up on yours.
      </p>
    </>
  );
}

export default Instructions;
