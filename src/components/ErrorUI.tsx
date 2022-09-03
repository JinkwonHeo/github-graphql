import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function ErrorUI({ error }: any) {
  const navigate = useNavigate();
  const handlePrevPage = (): void => {
    navigate('/');
    location.reload();
  };

  return (
    <ErrorUIContainer>
      <h2>에러가 발생했습니다!</h2>
      <details style={{ whiteSpace: 'pre-wrap' }}>{error && error.toString()}</details>
      <PrevButton onClick={handlePrevPage}>이전 화면으로</PrevButton>
    </ErrorUIContainer>
  );
}

const ErrorUIContainer = styled.div`
  padding: 20px;
`;

const PrevButton = styled.button`
  width: 200px;
  height: 40px;
  margin-top: 20px;
`;
