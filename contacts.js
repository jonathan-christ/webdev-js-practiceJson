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
                    lname: $("#lnameIn").val(),
                    fname: $("#fnameIn").val(),
                    email: $("#email").val(),
                    contact: $("#contact").val()
                };
                console.log(formData);

                $.post("php/index.inc.php", formData, function(data){
                    data =  JSON.parse(data);
                    console.log(data["message"]);
                    //do popup and close modal
                    success= true;
                    $("#addModal").modal('toggle');
                    placeData();
                })
        
            }

            $(this).addClass('was-validated');
            if(success) $("#addContactForm")[0].reset();
        }

    });


})

$.fn.isValid = function(){
    return this[0].checkValidity()
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
            //loop through each contact's attributes
            $.each(contact, function(key, attribute){
                td = document.createElement("td");

                //set id column as index and uneditable
                if(key == "id") {
                    id = attribute;
                    td.append(id);
                    setAttributes(tr,{"id":id})
                }
                else td.append(createInput(attribute, "display"));

                tr.append(td);
            })

            //set button
            td = document.createElement("td");
            td.setAttribute("class","btnDiv");

            let up = createButton("update", "green");
            let del = createButton("delete", "red");
            
            $(up).click(() => updateContact(up,id));
            $(del).click(() => deleteContact(del,id));

            td.append(up, del);
            tr.append(td);
            tbody.append(tr);
        });

    });
}

function updateContact(jqEl, id){
    let el = $(jqEl);
    let tr = $("#"+id);
    tr.toggleClass("table-info");
    if(el.html() == "Update"){
        el.removeClass(getColors()["green"]);
        el.addClass(getColors()["yellow"]);
        el.html("Save");
    }else{
        el.removeClass(getColors()["yellow"]);
        el.addClass(getColors()["green"]);
        el.html("Update");
    }


    $.each(tr.find("input"), (idx, child)=>{
        $(child).toggleClass("edit");
        child.readOnly = !child.readOnly;
    })

    //updating
}

function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
    }
}

function createInput(value, opt){
    let input = document.createElement("input");
    let edit =  opt=="display"? "" : "edit";

    setAttributes(input, {
        "class":"updateInput form-control shadow-none " + edit,
        "type":"text",
        "value":value,
        "readOnly":true 
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

function getColors(){
    return {
        "blue": "btn-primary",
        "green": "btn-success",
        "yellow": "btn-warning",
        "red": "btn-danger"
    }
}

function capitalizeFirst(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}