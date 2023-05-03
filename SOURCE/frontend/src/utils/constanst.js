//default server
var url="https://nas.graubner-bayern.de:50001/";
// var url ="http://localhost:5001/";
//load new server
if(localStorage.getItem("server"))
    url=localStorage.getItem("server");

export var API_URL=url;