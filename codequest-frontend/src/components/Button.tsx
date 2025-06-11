import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'outlined' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  to?: string;
  className?: string;
  children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonVariant): string => {  switch (variant) {
    case 'primary':
      return 'bg-stackoverflow-btn hover:bg-stackoverflow-btn-hover text-white shadow-stackoverflow-button border-transparent';
    case 'secondary':
      return 'bg-stackoverflow-powder hover:bg-[#b3d3ea] text-stackoverflow-link border-[#7aa7c7] shadow-stackoverflow-button';
    case 'outlined':
      return 'bg-white hover:bg-[#f8f9f9] text-stackoverflow-black border-stackoverflow-border shadow-stackoverflow-button';
    case 'ghost':
      return 'bg-transparent hover:bg-stackoverflow-light text-stackoverflow-black border-transparent';
    default:
      return 'bg-stackoverflow-btn hover:bg-stackoverflow-btn-hover text-white shadow-stackoverflow-button border-transparent';
  }
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-[10px] py-[8px] text-[13px] leading-[15px] font-normal rounded-[3px] border transition-all duration-100 whitespace-nowrap';
  const variantClasses = getVariantClasses(variant);
  const classes = `${baseClasses} ${variantClasses} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default Button;
