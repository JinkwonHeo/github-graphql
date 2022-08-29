import styled from 'styled-components';

export const Button = styled.button`
  width: fit-content;
  padding: 0.3rem;
  margin-top: 0.5rem;
  background-color: transparent;
  border-width: 1px;
  border-radius: 3px;
  border-color: #e9e9e9;
  font-size: 1rem;
  transition-duration: 0.4s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.green};
    color: ${({ theme }) => theme.colors.white};
  }
  cursor: pointer;
`;
