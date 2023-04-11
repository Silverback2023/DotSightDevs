$(function(){
    var id=location.search.split("=")[1];
    if(id!=null && id!=""){
        fetch(base_url+'/blog/'+id,{
            method:"GET",
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            var now_data=data.data;
            fetch(base_url+'/author/'+now_data.aid,{
                method:"GET",
                headers:{
                    'Content-Type':"application/json"
                }
            }).then((res2)=>{
                return res2.json();
            }).then((data2)=>{
                //data2.data.name
                $("#title").html(now_data.title);
                $("#author").html(data2.data.name);
                $("#description").html(now_data.description);
                $("#image").attr("src",'data:image/jpg;base64,'+now_data.image);
            });
        })
    }else{
        alert("Select the correct detailed Blog information id!");
        window.location.href="./index.html";
    }
})