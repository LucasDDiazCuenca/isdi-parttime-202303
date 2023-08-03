import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import EditProfile from "./pages/EditProfile"
import AppContext from "./AppContext"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import isUserLoggedIn from "./logic/isUserLoggedIn"


const { Provider } = AppContext

function App() {
  const navigate = useNavigate()

  return <Provider value={{ navigate }}>
    <Routes>
      <Route path="/login" element={isUserLoggedIn() ? <Navigate to="/" /> : <Login />} />

      <Route path="/register" element={isUserLoggedIn() ? <Navigate to="/" /> : <Register />} />

      <Route path="/" element={isUserLoggedIn() ? <Home /> : <Navigate to="/login" />} />

      <Route path="/profile" element={isUserLoggedIn() ? <EditProfile /> : <Navigate to="/login" />} />
    </Routes>
  </Provider>
}

export default App
