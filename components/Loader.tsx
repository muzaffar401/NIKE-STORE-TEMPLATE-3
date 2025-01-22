'use client';
import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper className="flex justify-center items-center my-40">
      <div className="loader" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .loader {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(0, 0, 0, 0.2); /* Light black background border */
    border-top-color: black; /* Dark black for the top section */
    border-radius: 50%;
    animation: spin 1s linear infinite; /* Continuous spinning animation */
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loader;
