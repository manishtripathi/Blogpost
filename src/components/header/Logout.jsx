import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

const Logout = () => {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout()
        .then(() => {
            dispatch(logout())
        })
        .catch((error)=> {
            console.error("Logout failed:", error); // Handle any errors
        }) 

        
    }
    return (
        <>
            <button className="px-3 py-4 bg-blue-400 rounded-full" onClick={logoutHandler}> Logout </button>
        </>
    )
}
export default Logout