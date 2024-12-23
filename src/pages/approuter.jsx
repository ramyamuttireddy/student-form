import { Route, Routes } from "react-router-dom"
import Register from "./register"
import Login from "./login"
import Home from "./home"

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Register />} />
          
          <Route path="/login" element={<Login />} />
          <Route path="/students/:id" element={<Home />} />

        </Routes>
    )
}
export default AppRouter