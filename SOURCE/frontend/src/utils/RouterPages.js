import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Guest from "../Pages/Guest";
import AdminDashboard from "../Pages/AdminDashboard";
import Notfound from "../Pages/Notfound";
import AddAsset from "../Pages/AddAsset";
import AddAccount from "../Pages/AddAccount"
import DeleteAsset from "../Pages/DeleteAsset";
import EditAccount from "../Pages/EditAccount";

const RouterPages =()=>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Guest />}/>
                <Route path='/admin' element={<AdminDashboard />}/>
                <Route path='/addAsset' element={<AddAsset />}/>
                <Route path='/deleteAsset' element={<DeleteAsset />}/>
                <Route path='/create' element={<AddAccount />}/>
                <Route path='/edit' element={<EditAccount />}/>
                <Route path='/*' element={<Notfound />}/>
            </Routes>
        </Router>
    )
}

export default RouterPages
