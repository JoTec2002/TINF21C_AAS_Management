import React from "react";

function setErrorWithId(innerId, state){
    let element = document.getElementById("error");
    //console.dir(element);
    for(let i=0; i<element.childElementCount; i++){
        if(element.childNodes[i].id === innerId){
            element.childNodes[i].style.display = state;
        }
    }
}
let preDifinedErrors = [];
//Axios Errors
preDifinedErrors[100] = "User rights insufficient to load all data. Please login to see all Data.";
preDifinedErrors[101] = "Internal Server Error. Please restart AASX Server."

function closeError(id){
    id=""+id;
    setErrorWithId(id, "none");
}

const setErrorHandling = function setErrorHandling (error) {
    //ErrorHandling
    try {
            if (error.isAxiosError === true) {
                //Error Thrown from Http Response
                if (error.response.status === 403 && error.response.data.messages[0].code === "Forbidden") {
                    setErrorWithId("100", "block");
                    //document.getElementById("error").getElementById(100).display = "block";
                } else {
                    console.error(error);
                }

            }
    }catch (error){}

}
const errorHandling  = () => {
    return(<div id={"error"}>
        {preDifinedErrors.map((preDifinedError, index)=>
            <div id={index} style={{display: 'none'}}><p>{preDifinedError}</p><button onClick={()=> closeError(index)}>x</button></div>
        )}
    </div>)
}

export {setErrorHandling, errorHandling}