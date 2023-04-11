function login(){
    var email=$("#email").val();
    var password=$("#password").val();
    const reg_email=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email!="" && password!=""){
        if(reg_email.test(email)){
            fetch(base_url+'/user/login',{
                method:"POST",
                body:JSON.stringify({email:email,password:password}),
                headers:{
                    'Content-Type':"application/json"
                }
            }).then((res)=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                alert(data.message);
                if(data.data!="" && data.data!=null){
                    var now_data=data.data;
                    if(now_data.role=="Admin"){
                        localStorage.setItem("id",now_data._id);
                        localStorage.setItem("username",now_data.username);
                        window.location.href="./management_author.html";
                    }else{
                        localStorage.setItem("id",now_data._id);
                        localStorage.setItem("username",now_data.username);
                        window.location.href="./index.html";
                    }
                }
            })
        }else{
            alert("Please enter the correct format of email!");
        }
    }else{
        alert("Login information cannot be empty!");
    }
}