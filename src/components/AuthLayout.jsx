import { useEffect, useState } from "react";
import React  from "react";
import authService from "../appwrite/auth";
import { data, Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import {Button, Input} from './index';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
export default function Protected({children, authentication = true}){
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state=> state.auth.status)
    useEffect(() => {
        if (authentication && authStatus !== authentication) {
                navigate("/login")
        }else if(
            !authentication && authStatus !== authentication
        ){
            navigate("/login")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? <h1> Loading ... </h1> : <>{children}</>
}