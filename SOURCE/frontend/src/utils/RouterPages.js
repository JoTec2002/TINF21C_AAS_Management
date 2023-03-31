//import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {HashRouter as Router, Routes, Route} from "react-router-dom";
import Guest from "../Pages/Guest";
import Home from "../Pages/Home";
import AdminDashboard from "../Pages/AdminDashboard";
import Notfound from "../Pages/Notfound";
import NewProdukt from "../Pages/NewProdukt";
import AddAccount from "../Pages/AddAccount"

//const basename = "/TINF21C_AAS_Management";
const basename = "";
const RouterPages =()=>{
    return (
        <Router basename={basename}>
            <Routes>
                <Route path='/' element={<Guest />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/admin' element={<AdminDashboard />}/>
                <Route path='/new' element={<NewProdukt />}/>
                <Route path='/create' element={<AddAccount />}/>
                <Route path='/*' element={<Notfound />}/>
            </Routes>
        </Router>
    )
}

export default RouterPages
