import styled from 'styled-components';

export const Arrow = styled.a`
  padding: 15px;
  text-decoration: none;
  position: absolute;
  top: 10px; 
  right: 10px; 
  z-index: 1000; 
  background-color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-weight: bold;
  color: #007bff;

  @media (min-width: 900px) {
    display: none;
  }
`;
