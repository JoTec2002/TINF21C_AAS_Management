import React from "react";

function htmlToElement(html) {
    var template = document.createElement('template');
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
}

let preDifinedErrors = [];
//Axios Errors
preDifinedErrors[100] = "<p style='display: none'>User rights insufficient to load all data. Please login to see all Data.</p>";



export default function errorHandling (error) {
    let response = "";
    let errorObject = document.getElementById("error");

    //ErrorHandling
    try {
        if(error === "loading"){
            console.log("loading")
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
                    document.getElementById("error").getElementById(100).display = "block";
                } else {
                    console.error(error);
                }

            }
        }
    }catch (error){}



    //document.getElementById("error").innerText = response;
    //document.getElementById("error").classList.add("isError");
}