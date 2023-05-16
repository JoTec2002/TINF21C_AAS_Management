import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Guest from "../Pages/Guest";
import AdminDashboard from "../Pages/AdminDashboard";
import Notfound from "../Pages/Notfound";
import AddAsset from "../Pages/AddAsset";
import DeleteAsset from "../Pages/DeleteAsset";
import {getCookie} from "../components/helpers";

const RouterPages =()=>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Guest />}/>
                {(getCookie("user")?.role === "isAuthenticatedSecurityUser") ? (<Route path='/admin' element={<AdminDashboard />}/>): (<Route path='/admin' element={<Notfound />}/>)}
                <Route path='/addAsset' element={<AddAsset />}/>
                <Route path='/deleteAsset' element={<DeleteAsset />}/>
                <Route path='/*' element={<Notfound />}/>
            </Routes>
        </Router>
    )
}

export default RouterPages
