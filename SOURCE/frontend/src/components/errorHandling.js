import React from "react";

export default function errorHandling (error) {
    let response = "";

    //ErrorHandling
    try {
        if (error.isAxiosError === true) {
            //Error Thrown from Http Response
            if (error.response.status === 403 && error.response.data.messages[0].code === "Forbidden") {
                response = "User rights insufficient to load all data. Please login to see all Data."
            } else {
                console.error(error);
            }

        }
    }catch (error){}



    document.getElementById("error").innerText = response;
    document.getElementById("error").classList.add("isError");
}