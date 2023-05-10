import React from "react";

function setErrorWithId(innerId, state) {
    let element = document.getElementById("error");
    //console.dir(element);
    for (let i = 0; i < element.childElementCount; i++) {
        if (element.childNodes[i].id === innerId) {
            element.childNodes[i].style.display = state;
        }
    }
}

let preDifinedErrors = [];
//Axios Errors
preDifinedErrors[100] = "User rights insufficient to load all data. Please login to see all Data.";
preDifinedErrors[150] = "Unknown Internal Server Error."
preDifinedErrors[151] = "Internal Server Error. File already exists."
preDifinedErrors[152] = "Internal Server Error. Requested File not found."
preDifinedErrors[500] = "AASX Server not available, please check your Server address."

function closeError(id) {
    id = "" + id;
    setErrorWithId(id, "none");
}

const setErrorHandling = function setErrorHandling(error) {
    //ErrorHandling for Axios Error

    try {
        if (error.isAxiosError === true) {
            //Errors Thrown by Axios module - most likely http error
            if(error.code="ERR_NETWORK" && error.response === undefined){
                setErrorWithId("500", "block");
                return;
            }
            if(error.response !== undefined){
                let errorData = error.response.data.messages[0];
                let statusCode = error.response.status;
                if (statusCode === 403){
                    if(errorData.code === "Forbidden"){
                        setErrorWithId("100", "block");
                        return;
                    }
                }
                if(statusCode === 422){
                    if(errorData.code === "UnprocessableEntity"){
                        setErrorWithId("152", "block");
                        return;
                    }
                }
                if(statusCode === 500){
                    if(errorData.text === "File already exists"){
                        setErrorWithId("151", "block");
                        return;
                    }
                }

            }

            console.log("unknown Axios Error")
            console.error(error);

        }
    } catch (errorinternal) {
        console.log(errorinternal)
        console.error(error);
    }
    console.error(error);

}
const errorHandling = () => {
    return (<div id={"error"}>
        {preDifinedErrors.map((preDifinedError, index) =>
            <div key={index} id={index} style={{display: 'none'}}><p>{preDifinedError}</p>
                <button onClick={() => closeError(index)}>x</button>
            </div>
        )}
    </div>)
}

export {setErrorHandling, errorHandling}