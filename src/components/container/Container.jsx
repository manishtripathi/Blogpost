import React from "react";

const Container = ({children}) => {
    return(
        <div className="w-full px-4 bg-gray-500 mx-auto">
            <h1> My Container</h1>
            {children}
        </div>
    )
}
export default Container