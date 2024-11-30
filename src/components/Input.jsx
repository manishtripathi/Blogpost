import React, { useId } from "react";

const Input = React.forwardRef( function Input({
    label,
    type = "Text",
    className = "",
    ...props


},
ref){
    const id = useId()
    return (
        <div className="w-full ">
            {label && <label className="inline-block, mb-1 pl-1" htmlFor={id}>
                {label}
                </label>
                }

                <input type={type}
                className={`px-3 py-3 rounded-lg bg-white text-black outline-none w-full${className}`}
                ref={ref}
                {...props}
                id={id}
                />
        </div>
        
    )
}) 
export default Input