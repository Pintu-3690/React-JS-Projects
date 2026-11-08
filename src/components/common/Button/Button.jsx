import React from 'react';

export const Button = ({ children, onClick, variant = 'primary', type = 'button', className = '' }) => {
  const baseStyle = {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  };

  const variants = {
    primary: { backgroundColor: '#4f46e5', color: '#fff' },
    secondary: { backgroundColor: '#e2e8f0', color: '#1e293b' },
    danger: { backgroundColor: '#ef4444', color: '#fff' },
  };

  return (
    <button type={type} style={{ ...baseStyle, ...variants[variant] }} onClick={onClick} className={className}>
      {children}
    </button>
  );
};