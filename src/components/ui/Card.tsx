import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
}

const Card = ({ variant = 'default', className = '', children, ...props }: CardProps) => {
  const variantClasses = {
    default: 'bg-white',
    outlined: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
  };

  return (
    <div
      className={`rounded-lg p-6 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
