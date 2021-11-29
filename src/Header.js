import styled from "styled-components";

const Banner = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
  justify-content: space-between;
  align-items: center;
  background-color: #1ba260;
  box-shadow: 0px -4px 10px 5px;
`;

const Title = styled.h1`
  color: white;
  margin-left: 1rem;
`;

const Subtitle = styled.p`
  color: white;
  margin-right: 1rem;
  font-style: italic;
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
