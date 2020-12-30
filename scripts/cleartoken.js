let clearToken=()=>{
    window.localStorage.setItem("token","");
    var toks = window.localStorage.getItem("token")
    console.log(toks)
    window.location.href="index.html"
}