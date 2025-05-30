import { Route, Routes } from "react-router-dom"
import Home from "../components/Home"
import Signup from "../components/Signup"
import Login from "../components/Login"
import PageNotFound from "../components/PageNotFound"
import { Toaster } from 'react-hot-toast';

function App() {
const token = localStorage.getItem("JWT")
  return (
    <>
    <Routes>
      <Route path="/"element={token?<Home/>:<PageNotFound/>}/>
      <Route path="/signup"element={<Signup/>}/>
      <Route path="/login"element={<Login/>}/>
      <Route path="*"element={<PageNotFound/>}/>
    </Routes>
     <Toaster/>
    </>
  )
}

export default App
