//translate code into jquery

$(function(){
    let globalIndex = 0;
    
    //retrieve database
    placeData();

    //form submit
    $("#addContactForm").submit(function (event){
        //prevent form from submitting (to not refresh page)
        event.preventDefault();

        //form handle
        if($(this).hasClass("needs-validation")){
            let success = false;
            if(!$(this).isValid()){
                event.stopPropagation()
            } else{
                //store data into obj
                let formData = {
                    add: "true",
                    lname: $("#lnameIn").val(),
                    fname: $("#fnameIn").val(),
                    email: $("#email").val(),
                    contact: $("#contact").val()
                };
                console.log(formData);

                $.post("php/index.inc.php", formData, function(data){
                    data =  JSON.parse(data);
                    console.log(data["message"]);
                    if(data["message"] == "success"){
                        $("#addModal").modal('toggle');
                        $("#addContactForm")[0].reset();
                        $("#successModal").modal('toggle');
                    }else if(data["message"] == "userExists"){
                        $("#email").addClass("is-invalid");
                        $("#validationEmail").html("E-mail already exists!");
                    }
                    //do popup and close modal
                    //DO POPUP WARNING AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
                    placeData();
                })
        
            }
        }
        $("#validationEmail").html("Invalid e-mail address");
        $(this).addClass('was-validated');

    });


})

$.fn.isValid = function(){
    return this[0].checkValidity()
}

$.fn.validFromPattern = function(pattern){
    return pattern.test(this.val());
}

function placeData(){
    //retrieve data
    let request = {
        request: "good evening"
    };
    $.post("php/index.inc.php", request, function(rawData){
        //refresh tbody
        let data = $.parseJSON(rawData);
        let tbody = $("#tableWrap tbody");

        //empty tbody and place elements again
        tbody.html("");
        //loop through each contact record
        $.each(data, function(idx, contact){
            let tr = document.createElement("tr");
            let td;
            let id;
            let inputType=0;
            //loop through each contact's attributes
            $.each(contact, function(key, attribute){
                td = document.createElement("td");

                //set id column as index and uneditable
                if(key == "id") {
                    id = attribute;
                    td.append(id);
                    setAttributes(tr,{"id":id})
                }
                else td.append(createInput(attribute, "display", inputType++));

                tr.append(td);
            })

            //set button
            td = document.createElement("td");
            td.setAttribute("class","btnDiv");

            let up = createButton("update", "green");
            let del = createButton("delete", "red");
            
            $(up).click(() => editContact(up,id));
            $(del).click(() => deleteContact(del,id));

            td.append(up, del);
            tr.append(td);
            tbody.append(tr);
        });

    });
}

function editContact(jqEl, id){
    flipButton(jqEl, id);
    $(jqEl).html("Save");
    $(jqEl).click(()=>updateContact(jqEl, id));
}

function updateContact(jqEl, id){
    let el = $(jqEl);
    let tr = $("#"+id);
    let submittable = true;
    
    $.each(tr.find("input"), (idx, child)=>{
        let validity = true;
        //if save is clicked
        if($(child).attr("type")=="email"){
            validity = $(child).validFromPattern(getPattern("email"));
        }else if($(child).attr("type")=="tel"){
            validity = $(child).validFromPattern(getPattern("phoneNum"));
        }else{
            validity = $(child).isValid();
        }
    
        
        if(!validity){
            $(child).addClass("is-invalid");
            $(child).removeClass("is-valid");
            submittable = false;
        }else{
            $(child).removeClass("is-invalid");
            $(child).addClass("is-valid");
        }
    })

    if(submittable){
        let formData = {
            update: "true",
            id: id,
            lname: "",
            fname: "",
            email: "",
            contact: ""
        };

        $.each(tr.find("input"), (idx, child)=>{
            formData[getContactKeys(idx+1)] = $(child).val();
        });

        console.log(formData);
        $.post("php/index.inc.php", formData, function(data){
            data =  JSON.parse(data);
            console.log(data["message"]);

            if(data["message"]=="success"){
                placeData();
                $("#successModal").modal('toggle');

                flipButton(jqEl, id);
                el.html("Update");
                el.click(()=>editContact(jqEl, id));
            }else if(data["message"] == "userExists"){
                tr.find("input").eq(2).addClass("is-invalid");
                $("#validationEmail").html("E-mail already exists!");
            } else{
                $("#failureModal").modal('toggle');
            }
        });

    }
}

function deleteContact(del, id){
    let email = $("#"+id).find("input[type|='email']");
    let informData = {
        "delete" : "true",
        "id" : id,
        "email": email.val(),
    }
    //DO POPUP WARNING AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAsaaAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
    $.post("php/index.inc.php", informData, (rawData)=>{
        let data =  JSON.parse(rawData);
        console.log(data["message"]);
        
        if(data["message"] == "success"){
            placeData();
            $("#successModal").modal('toggle');
        }else{
            $("#failureModal").modal('toggle');
        }
    })
}


function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function createInput(value, opt, idx){
    let input = document.createElement("input");
    let edit =  opt=="display"? "" : "edit";
    let typeArr = ["text", "text", "email", "tel"];
    let maxSize = [50, 50, 255, 15];

    setAttributes(input, {
        "class":"updateInput form-control shadow-none " + edit,
        "type":typeArr[idx],
        "value":value,
        "readOnly":true,
        "required":true ,
        "maxlength": maxSize[idx]
    });
    return input;
}

function createButton(html, color){
    let btn = document.createElement("button");
    setAttributes(btn, {
        "class":"btn "+ getColors()[color]+" "+html,
        "name": html,
    })

    btn.innerHTML = capitalizeFirst(html);

    return btn
}

function flipButton(jqEl, id){
    let el = $(jqEl);
    let tr = $("#"+id);
    tr.toggleClass("table-info");
    el.toggleClass(getColors()["green"]);
    el.toggleClass(getColors()["yellow"]);

    $.each(tr.find("input"), (idx, child)=>{
        $(child).toggleClass("edit");
        child.readOnly = !child.readOnly;    
    })

    el.off("click");
}

function getColors(){
    return {
        "blue": "btn-primary",
        "green": "btn-success",
        "yellow": "btn-warning",
        "red": "btn-danger"
    }
}

function getPattern(key){
    let arr = {
        "email": /^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/,
        "phoneNum": /^(?:(\+639|09)\d{9}|(02|0[3-9]\d{1,2})\d{6,7})$/

    }
    return arr[key];
}

function getContactKeys(index){
    let arr =["id","lname", "fname", "email", "contact"];
    return arr[index];
}

function capitalizeFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}