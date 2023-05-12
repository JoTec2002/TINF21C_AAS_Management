export function getCookie(cookiename){
    if(document.cookie){
        const splitCookies = document.cookie.split(";");
        splitCookies.forEach((splitCookie, index) => {
            splitCookies[index] = splitCookie.trim()
        })
        const cookies = []
        splitCookies.forEach((splitCookie, index) => {
            const innerSplitCookies = splitCookie.split("=");
            cookies[innerSplitCookies[0]] = JSON.parse(innerSplitCookies[1]);
        })

        return cookies[cookiename];
    }
}
export function deleteCookie(cookiename){
    document.cookie = cookiename+"=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
}
