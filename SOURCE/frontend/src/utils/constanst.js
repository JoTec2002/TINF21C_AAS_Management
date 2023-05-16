//default server
var url="";
// var url ="http://localhost:5001/";
//load new server
if(localStorage.getItem("server"))
    url=localStorage.getItem("server");

export var API_URL=url;