import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Guest from "../Pages/Guest";
import AdminDashboard from "../Pages/AdminDashboard";
import Notfound from "../Pages/Notfound";
import NewProdukt from "../Pages/NewProdukt";
import AddAccount from "../Pages/AddAccount"

const RouterPages =()=>{
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Guest />}/>
                <Route path='/admin' element={<AdminDashboard />}/>
                <Route path='/new' element={<NewProdukt />}/>
                <Route path='/create' element={<AddAccount />}/>
                <Route path='/*' element={<Notfound />}/>
            </Routes>
        </Router>
    )
}

export default RouterPages
