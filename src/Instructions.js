import styled from "styled-components";

const InstructionsHeader = styled.h4`
  margin-bottom: 0;
`;

function Instructions() {
  return (
    <>
      <InstructionsHeader>How does this work?</InstructionsHeader>
      <p>
        This app sends links and text from one device to another.
        <br />
        Scan the session QR code from another device to pair. If pairing is
        successful, the session's color should match on both devices.
        <br />
        Any link or text sent from one device will appear on the other.
        <br />
        By default, links are automatically opened on both devices. To disable
        that, uncheck the box above.
      </p>
    </>
  );
}

export default Instructions;
