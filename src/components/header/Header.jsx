import React from "react";
import {Container, Logout} from '../index';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const authStatus = useSelector((state) => 
        {
            // console.log("state value", state)
            return state.auth?.status
        }
    )
    // console.log("authStatus:", authStatus);
    const navigate = useNavigate()

    const navItems  = [
        {
            name: "Home",
            slug: '/',
            active: true
        },
        {
            name: "Login",
            slug: '/login',
            active: !authStatus,
        },
        {
            name: "Sign up",
            slug: '/signup',
            active: !authStatus
        },
        {
            name: "All Post",
            slug: '/allpost',
            active: authStatus
        },
        {
            name: "Add Post",
            slug: '/addpost',
            active: authStatus
        },
       
    ]
    return(
        <header className="py-3 shadow bg-gray-300">
            <Container>
                <nav className="flex ">
                    <div className="mr-4">
                        <Link to="/">
                            <h1> Logo </h1>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) => 
                        item.active ? (
                            <li key={item.name}>
                                {/* {console.log(`Rendering nav item: ${item.name}`)} */}
                                <button onClick={() => navigate(item.slug)}>
                                    {item.name}
                                </button>
                            </li>
                        ) : null
                        )}
                        {authStatus && (
                            <li>
                                <Logout/>
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}
export default Header 