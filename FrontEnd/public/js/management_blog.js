var now_item={};
$(function(){
    var id=localStorage.getItem("id");
    var now_data=[];
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
                        var now_data=[element._id,data2.data.name,element.title,"<img style='width:60px;height:60px;' src='data:image/jpg;base64,"+element.image+"'/>",element.description,"<button  data-id="+element._id+"  data-title="+element.title+" data-bs-toggle='modal' data-bs-target='#exampleModal2' onclick='update(event)'>Update</button>  <button data-id="+element._id+" onclick='date(event)'>Delete</button>"];
                        $('#myTable').dataTable({'iDisplayLength': 3,'bDestroy': true}).fnAddData(now_data);
                    })
                });
            }
        })
    }else{
        alert("Please log in first!");
        window.location.href="./login.html";
    }
})


function openNew(){
    $("#author").html("");
    fetch(base_url+'/author',{
        method:"GET",
        headers:{
            'Content-Type':"application/json"
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        if(data.data!="" && data.data!=null){
            data.data.forEach(element => {
                $("#author").append("<option value="+element._id+">"+element.name+"</option>");
                //$('#myTable').dataTable({'iDisplayLength': 3,'bDestroy': true}).fnAddData(now_data);
            });
        }
    })
}

function update(event){
    var id=event.target.attributes[0].nodeValue;
    var title=event.target.attributes[1].nodeValue;
    $("#id_u").html(id);
    $("#name_u").val(title);
    $("#author_u").html("");


    fetch(base_url+'/author',{
        method:"GET",
        headers:{
            'Content-Type':"application/json"
        }
    }).then((res)=>{
        return res.json();
    }).then((data)=>{
        if(data.data!="" && data.data!=null){
            data.data.forEach(element => {
                $("#author_u").append("<option value="+element._id+">"+element.name+"</option>");
                //$('#myTable').dataTable({'iDisplayLength': 3,'bDestroy': true}).fnAddData(now_data);
            });
        }
    });

    const { createEditor, createToolbar } = window.wangEditor
    const editorConfig = {
        onChange(editor) {
            const html = editor.getHtml()
            console.log('editor content', html)
            // 也可以同步到 <textarea>
            $("#conetnt_u").val(html);
        }
    }
    
    const editor_u = createEditor({
        selector: '#editor-container_u',
        html: '<p><br></p>',
        config: editorConfig,
        mode: 'default', // or 'simple'
    })
    
    const toolbarConfig = {}
    
    const toolbar = createToolbar({
        editor_u,
        selector: '#toolbar-container_u',
        config: toolbarConfig,
        mode: 'default', // or 'simple'
    })
}


function save(){
    var name=$("#name").val();
    var author_id=$("#author").val();
    var conetnt=$("#conetnt").val();
    var image=$("#image")[0].files[0];

    if(name!="" && image!="" && author_id!="" && conetnt!=""){
        let formData = new FormData;
        formData.append("image",image);
        formData.append("title",name);
        formData.append("description",conetnt);
        formData.append("aid",author_id);
        formData
        $.ajax({
            url:base_url+"/blog",
            data:formData,
            type:"post",
            contentType:false,
            processData:false,
            success:function (res) {
               alert(res.message);
               window.location.reload();
            },
            error:function(res){
                alert(res.responseJSON.message);
            }
        })
    }else{
        alert("The Content cannot be empty!");
    }
}

function save_u(){
    var name=$("#name_u").val();
    var author_id=$("#author_u").val();
    var conetnt=$("#conetnt_u").val();
    var image=$("#image_u")[0].files[0];

    if(name!="" && image!="" && author_id!="" && conetnt!=""){
        let formData = new FormData;
        formData.append("image",image);
        formData.append("title",name);
        formData.append("description",conetnt);
        formData.append("aid",author_id);
        $.ajax({
            url:base_url+"/blog/"+$("#id_u").html(),
            data:formData,
            type:"PUT",
            contentType:false,
            processData:false,
            success:function (res) {
               alert(res.message);
               window.location.reload();
            },
            error:function(res){
                alert(res.responseJSON.message);
            }
        })
    }else{
        alert("The Content cannot be empty!");
    }
}

function date(event){
    var id=event.target.attributes[0].nodeValue;
    console.log(id);
    if(window.confirm('Are you sure you want to delete it?')){
        fetch(base_url+'/blog/'+id,{
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