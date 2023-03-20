import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Guest from "../Pages/Guest";
import  Home from "../Pages/Home";
import AdminDashboard from "../Pages/AdminDashboard";
import Notfound from "../Pages/Notfound";
const RouterPages =()=>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Guest />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/admin' element={<AdminDashboard />}/>
                <Route path='/*' element={<Notfound />}/>
            </Routes>
        </Router>
    )
}

export default RouterPages