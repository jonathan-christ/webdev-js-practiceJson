// AUTHOR: MATTHEW CEDRIC D. CALAYCAY
let globalIndex = 0; //change into index
let tbody = document.getElementsByTagName("tbody")[0];

//remove
function toggleModal(){
    modal = document.getElementById("addModal");
    if(modal.style.display == "block"){
        modal.style.display = "none";
    }else{
        modal.style.display ="block";
        
    }
}

//revision
function checkValidity(...args){
    //checks if empty or valid based on input type
    let validity = true;
    let errMsg = "";
    for(let x of args) {
        if(!x.validity.valid || x.value.length ==0)  {
            if(errMsg.length) errMsg += ", " + x.getAttribute("name");
            else errMsg = x.getAttribute("name");
            validity = false;
        }
    }
    if(!validity) alert(errMsg + " is invalid!");
    return validity;

}

//mawala change into form submit
function getDetails(){
    lname = document.getElementById("lnameIn");
    fname = document.getElementById("fnameIn");
    email = document.getElementById("email");
    contact = document.getElementById("contact");

    if(checkValidity(lname, fname, email, contact))
        addUser(globalIndex++, lname.value, fname.value, email.value, contact.value);

    //empty form values
    lname.value = "";
    fname.value = "";
    email.value = "";
    contact.value = "";
}

function addUser(...args){
    //variable declaration and initializations
    var rowId = "row"+(args[0]+1);
    var row = document.createElement("tr");
    var btnDiv = document.createElement("div");

    var updateBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");

    //assignment of all values to their corresponding cell
    let idx= 0;
    for(let value of args){
        
        var outerTd = document.createElement("td");
        var inputEl;
        if(idx == 0) {
            //first cell of row is always id = shouldnt be editable
            outerTd.innerHTML = value+1;
        } else{
            inputEl = createInput(value);
            inputEl.classList.add("form-control", "tb-inp");
            outerTd.appendChild(inputEl);
        }

        row.appendChild(outerTd);
        idx++;
    }

    updateBtn.classList.add("btn", "btn-success", "update");
    updateBtn.id = "up"+globalIndex;
    deleteBtn.classList.add("btn", "btn-danger", "delete");
    deleteBtn.id = "del"+globalIndex;


    //button event listeners
    updateBtn.addEventListener('click', () => {
        var currRow = document.getElementById(rowId);
        var btn = document.getElementById(updateBtn.id);
        //unsetting read only for td to edit
        for(let td of currRow.children){
            if(td.childElementCount == 1)td.children[0].readOnly = !td.children[0].readOnly;
        }

        //lock/unlock (saving/editing) of inputs
        if(btn.innerHTML == "Save"){
            btn.classList.remove("btn-warning");
            btn.classList.add("btn-success");
            btn.innerHTML = "Update";
            currRow.classList.remove("table-info");
        }else{
            btn.classList.remove("btn-success")
            btn.classList.add("btn-warning");
            btn.innerHTML = "Save";
            currRow.classList.add("table-info");
        }
        
    });
    updateBtn.innerHTML = "Update";

    deleteBtn.addEventListener('click', () => { document.getElementById(rowId).remove()});
    deleteBtn.innerHTML = "Delete";

    //button appending
    btnDiv.append(updateBtn, deleteBtn);
    let temp = document.createElement("td");
    temp.appendChild(btnDiv);
    row.appendChild(temp);

    row.id = rowId;
    
    tbody.appendChild(row);
    $('#addModal').modal('toggle');
}

function createInput(value){
    var input = document.createElement("input");
    input.type = "text";
    input.value = value;
    input.readOnly = true;
    return input;
}

function toggleEdit(element){
    return !element.readOnly;
}