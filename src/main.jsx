import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from "./store/store.js"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import { AuthLaout, Login, SignUp, AllPost, AddPost, EditPost, Post} from './components/index.js'



const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        index: true, // Marks this as the default route
        element: <Home />,
      },
      {
        path: '/login' ,
        element: (
          <AuthLaout authentication={false}>
            <Login/>
          </AuthLaout>
        )
      },
      {
        path: "/signup",
        element: (
            <AuthLaout authentication={false}>
                <SignUp />
            </AuthLaout>
        ),
    },
    {
        path: "/allpost",
        element: (
            <AuthLaout authentication>
                {" "}
                <AllPost />
            </AuthLaout>
        ),
    },
    {
        path: "/addpost",
        element: (
            <AuthLaout authentication>
                {" "}
                <AddPost />
            </AuthLaout>
        ),
    },
    {
        path: "/editpost/:slug",
        element: (
            <AuthLaout authentication>
                {" "}
                <EditPost />
            </AuthLaout>
        ),
    },
    {
        path: "/post/:slug",
        element: <Post />,
    },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
