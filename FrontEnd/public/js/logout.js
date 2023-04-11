function loginOut(){
    localStorage.removeItem("id");
    localStorage.removeItem("username");
    alert("Exit successful!");
    window.location.href="./login.html";
}