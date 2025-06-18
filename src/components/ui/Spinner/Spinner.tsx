import React from 'react';

export default function Spinner() {
  return (
    <>
      <span className="spinner" />
      <style jsx>{`
        .spinner {
          display: inline-block;
          width: 48px;
          height: 48px;
          border: 5px solid rgba(0, 0, 0, 0.1);
          border-top-color: #3b82f6;
          border-radius: 50%;
          animation: spin 1s ease-in-out infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}
