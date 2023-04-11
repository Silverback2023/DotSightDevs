$(function(){
    var id=localStorage.getItem("id");
    if(id!=null && id!=""){
        fetch(base_url+'/blog',{
            method:"GET",
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            if(data.data!="" && data.data!=null){
                data.data.forEach(element => {
                    fetch(base_url+'/author/'+element.aid,{
                        method:"GET",
                        headers:{
                            'Content-Type':"application/json"
                        }
                    }).then((res2)=>{
                        return res2.json();
                    }).then((data2)=>{
                        $("#main_section").append("<article class='post style1'>"
                        +"<div class='image'>"
                        +"<img data-position='75% center' src='data:image/jpg;base64,"+ element.image+"'/>"
                        +"</div>"
                        +"<div class='content'>"
                        +"<div class='inner'>"
                        +"<header><h2><a href='#' data-id="+element._id+" onclick='openDetail(event)'>"+element.title+"</a></h2>"
                        +"<p class='info'><a href='#'>"+data2.data.name+"</a></p>"  
                        +"</header>"
                        +"<div class='description'>"+element.description+"</div>"
                        +"<ul class='actions'><li><a href='#' class='button alt' data-id="+element._id+" onclick='openDetail(event)'>Read More</a></li></ul>"
                        +"</div>"
                        +"<div class='postnav'><a href='#' class='prev disabled'><span class='icon fa-chevron-up'></span></a><a href='#two' class='scrolly next'><span class='icon fa-chevron-down'></span></a></div>"
                        +"</div>"
                        +"</article>");
                    })
                });
            }
        })
    }else{
        alert("Please log in first!");
        window.location.href="./login.html";
    }
});

function search(){
    var title=$("#search_title").val();
    if(title!="" && title!=null){
        fetch(base_url+'/blog/search/'+title,{
            method:"GET",
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            if(data.data!="" && data.data!=null){
                $("#main_section").html("");
                data.data.forEach(element => {
                    fetch(base_url+'/author/'+element.aid,{
                        method:"GET",
                        headers:{
                            'Content-Type':"application/json"
                        }
                    }).then((res2)=>{
                        return res2.json();
                    }).then((data2)=>{
                        $("#main_section").append("<article class='post style1'>"
                        +"<div class='image'>"
                        +"<img data-position='75% center' src='data:image/jpg;base64,"+ element.image+"'/>"
                        +"</div>"
                        +"<div class='content'>"
                        +"<div class='inner'>"
                        +"<header><h2><a href='#' data-id="+element._id+" onclick='openDetail(event)'>"+element.title+"</a></h2>"
                        +"<p class='info'><a href='#'>"+data2.data.name+"</a></p>"  
                        +"</header>"
                        +"<div class='description'>"+element.description+"</div>"
                        +"<ul class='actions'><li><a href='#' class='button alt' data-id="+element._id+" onclick='openDetail(event)'>Read More</a></li></ul>"
                        +"</div>"
                        +"<div class='postnav'><a href='#' class='prev disabled'><span class='icon fa-chevron-up'></span></a><a href='#two' class='scrolly next'><span class='icon fa-chevron-down'></span></a></div>"
                        +"</div>"
                        +"</article>");
                    })
                });
            }
        })
    }else{
        fetch(base_url+'/blog',{
            method:"GET",
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            if(data.data!="" && data.data!=null){
                $("#main_section").html("");
                data.data.forEach(element => {
                    fetch(base_url+'/author/'+element.aid,{
                        method:"GET",
                        headers:{
                            'Content-Type':"application/json"
                        }
                    }).then((res2)=>{
                        return res2.json();
                    }).then((data2)=>{
                        $("#main_section").append("<article class='post style1'>"
                        +"<div class='image'>"
                        +"<img data-position='75% center' src='data:image/jpg;base64,"+ element.image+"'/>"
                        +"</div>"
                        +"<div class='content'>"
                        +"<div class='inner'>"
                        +"<header><h2><a href='javascript:void(0)' data-id="+element._id+" onclick='openDetail(event)'>"+element.title+"</a></h2>"
                        +"<p class='info'><a href='#'>"+data2.data.name+"</a></p>"  
                        +"</header>"
                        +"<div class='description'>"+element.description+"</div>"
                        +"<ul class='actions'><li><a href='javascript:void(0)' class='button alt' data-id="+element._id+" onclick='openDetail(event)'>Read More</a></li></ul>"
                        +"</div>"
                        +"<div class='postnav'><a href='javascript:void(0)' class='prev disabled'><span class='icon fa-chevron-up'></span></a><a href='#two' class='scrolly next'><span class='icon fa-chevron-down'></span></a></div>"
                        +"</div>"
                        +"</article>");
                    })
                });
            }
        })
    }
}

function openDetail(event){
    var id=event.target.dataset.id;
    window.location.href="./generic.html?id="+id;
}