import { useEffect, useState } from 'react'

import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { AuthLaout } from './components'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  
  useEffect(()=> {
    authService.CurrentUser()
    .then((userData) => {
        if (userData) {
          dispatch(login({userData}))
        } else {
          dispatch(logout)
        }
    })
    .finally(()=> setLoading(false))
  }, [])

  return !loading ? (
    <>
      <div> 
        <Header/>
        <main>
           <Outlet/>          
        </main>
        <Footer/>
      </div>
    </>
  ) : null
  // return (
  //   <>
  //    <h1> My Blogs Post projects</h1>
  //   </>
  // )
}

export default App
