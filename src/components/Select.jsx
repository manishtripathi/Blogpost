import React, { useId } from "react";

const Select = ({
    options,
    label,
    className,
    ...props
}, ref ) => {
    const id = useId()
    return (
        <>
            <div className="w-full ">
                {label && <label htmlFor={id} className=""></label>}
                <select
                {...props}
                id={id}
                ref={ref}
                className="px-3 py-3 rounded-lg bg-white text-black"
                >
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ) )}
                </select>
            </div>
        </>
    )
}
export default React.forwardRef(Select)