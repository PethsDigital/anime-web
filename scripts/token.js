const retrieveToken =()=>{
    var token = window.localStorage.getItem("token")
    if (!token) {
        window.location.href = "index.html"
    }
    return(token)
}
retrieveToken()