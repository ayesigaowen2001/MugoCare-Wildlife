import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="p-d-flex p-jc-center p-2 p-ai-center">
    <i className="pi pi-spin pi-spinner" style={{ fontSize: '2em' }} />
  </div>
);

export default LoadingSpinner;
