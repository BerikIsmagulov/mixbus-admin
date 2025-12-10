import React from 'react';
import classNames from 'classnames';


type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
variant?: 'primary' | 'outline' | 'danger';
};


const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
return (
<button
className={classNames(
'px-4 py-2 rounded-lg font-medium text-sm transition',
{
'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
'border border-gray-300 hover:bg-gray-100': variant === 'outline',
'bg-red-600 text-white hover:bg-red-700': variant === 'danger',
},
className
)}
{...props}
/>
);
};


export default Button;