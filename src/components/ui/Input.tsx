import React from 'react';


type InputProps = React.InputHTMLAttributes<HTMLInputElement>;


const Input: React.FC<InputProps> = (props) => {
return (
<input
className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
{...props}
/>
);
};


export default Input;