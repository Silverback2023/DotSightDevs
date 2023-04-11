function register(){
    var username=$("#username").val();
    var password=$("#password").val();
    var email=$("#email").val();
    var re_password=$("#re_password").val();
    const reg_email=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(username!="" && password!="" && re_password!="" && email!=""){
        if(password==re_password){
            if(reg_email.test(email)){
                fetch(base_url+'/user/register',{
                    method:"POST",
                    body:JSON.stringify({username:username,email:email,password:password}),
                    headers:{
                        'Content-Type':"application/json"
                    }
               }).then((res)=>{
                    return res.json();
               }).then((data)=>{
                    alert(data.message);
                    if(data.data!="" && data.data!=null){
                        window.location.href="./login.html";
                    }
               })
            }else{
                alert("Please enter the correct format of email!");
            }
        }else{  
            alert("The two passwords must be the same!");
        }
    }else{
        alert("Student registration information cannot be empty!");
    }
}