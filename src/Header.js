import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  gap: 0.5rem;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: #303030;
  box-shadow: 0px -4px 10px 0px;
`;

const Title = styled.h1`
  color: #777;
  margin: 0;
`;

const Subtitle = styled.p`
  color: #777;
  margin: 0;
  font-style: italic;
  font-size: 12px;
`;

function Header() {
  return (
    <Banner>
      <Title>QR Transfer</Title>
      <Subtitle>by Pierre-Luc Godin</Subtitle>
    </Banner>
  );
}

export default Header;
