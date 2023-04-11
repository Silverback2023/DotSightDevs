var now_item={};
$(function(){
    var id=localStorage.getItem("id");
    if(id!=null && id!=""){
        fetch(base_url+'/author',{
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
                    var now_data=[element._id,element.name,"<button  data-id="+element._id+"  data-name="+element.name+" data-bs-toggle='modal' data-bs-target='#exampleModal2' onclick='update(event)'>Update</button> <button data-id="+element._id+" onclick='date(event)'>Delete</button>"];
                    $('#myTable').dataTable({'iDisplayLength': 3,'bDestroy': true}).fnAddData(now_data);
                });
            }
        })
    }else{
        alert("Please log in first!");
        window.location.href="./login.html";
    }
})


function save(){
    var id=localStorage.getItem("id");
    var name=$("#name").val();
    if(name!=""){
        fetch(base_url+'/author',{
            method:"POST",
            body:JSON.stringify({name:name}),
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            console.log(data);
            alert(data.message);
            if(data.data!="" && data.data!=null){
                window.location.reload();
            }
        })
    }else{
        alert("The Author Name cannot be empty!");
    }
}


function save_u(){
    var id=$("#author_id").html();
    var name=$("#u_name").val();
    if(name!=""){
        fetch(base_url+'/author/'+id,{
            method:"PUT",
            body:JSON.stringify({name:name}),
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            alert(data.message);
            if(data.data!="" && data.data!=null){
                window.location.reload();
            }
        })
    }else{
        alert("The Category Name cannot be empty!");
    }
}



function update(event){
    var id=event.target.attributes[0].nodeValue;
    var name=event.target.attributes[1].nodeValue
    $("#u_name").val(name);
    $("#author_id").html(id);
}

function date(event){
    var id=event.target.attributes[0].nodeValue;
    console.log(id);
    if(window.confirm('Are you sure you want to delete it?')){
        fetch(base_url+'/author/'+id,{
            method:"delete",
            headers:{
                'Content-Type':"application/json"
            }
        }).then((res)=>{
            return res.json();
        }).then((data)=>{
            alert(data.message);
            window.location.reload();
        })
    }else{
       
    }
}