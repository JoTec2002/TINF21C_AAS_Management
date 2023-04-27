import React from "react";

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}
function setErrorWithId(innerId){
    let element = document.getElementById("error");
    //console.dir(element);
    for(let i=0; i<element.childElementCount; i++){
        if(element.childNodes[i].id === innerId){
            element.childNodes[i].style.display = "block";
        }
    }
}
let preDifinedErrors = [];
//Axios Errors
preDifinedErrors[100] = "<p style='display: none'>User rights insufficient to load all data. Please login to see all Data.</p>";
preDifinedErrors[101] = "<p style='display: none'>Internal Server Error. Please restart AASX Server.</p>"



export default function errorHandling (error) {
    let response = "";
    let errorObject = document.getElementById("error");

    //ErrorHandling
    try {
        if(error === "loading"){
            console.log("loading")
            errorObject.innerHTML='';
            preDifinedErrors.map((preDifinedError, index)=>{
                let childNode = htmlToElement(preDifinedError);
                childNode.setAttribute("id", index);
                console.log(childNode);
                errorObject.appendChild(childNode);
            })
        }else {
            if (error.isAxiosError === true) {
                //Error Thrown from Http Response
                if (error.response.status === 403 && error.response.data.messages[0].code === "Forbidden") {
                    setErrorWithId("100");
                    //document.getElementById("error").getElementById(100).display = "block";
                } else {
                    console.error(error);
                }

            }
        }
    }catch (error){}



    //document.getElementById("error").innerText = response;
    //document.getElementById("error").classList.add("isError");
}