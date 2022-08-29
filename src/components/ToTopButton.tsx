import React from 'react';
import styled from 'styled-components';
import { AiFillUpCircle } from 'react-icons/ai';

function ScrollToTop() {
  const handleScroll = (e: React.BaseSyntheticEvent) => {
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <TopButtonContainer>
      <ToTopButton onClick={handleScroll}>
        <AiFillUpCircle size="3rem" color="#3cb46e" />
      </ToTopButton>
    </TopButtonContainer>
  );
}

const TopButtonContainer = styled.div`
  position: fixed;
  bottom: 30px;
  right: 100px;
  @media ${({ theme }) => theme.device.mobile} {
    right: 15px;
  }
`;

const ToTopButton = styled.button.attrs(() => ({
  type: 'button',
  title: 'To top',
  'aria-label': 'To top',
}))`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default ScrollToTop;
