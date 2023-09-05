let globalIndex = 0;
let tbody = document.getElementsByTagName("tbody")[0];

function showModal(){
    document.getElementById("hidden").style.display = "block";
}

function hideModal(){
    document.getElementById("hidden").style.display = "none";
}

function getDetails(){
    lname = document.getElementById("lnameIn").value;
    fname = document.getElementById("fnameIn").value;
    email = document.getElementById("email").value;
    contact = document.getElementById("contact").value;
    addUser(lname, fname, email, contact);
}

function addUser(lname, fname, email, contact){
    var row = document.createElement("tr");
    var last = document.createElement("td");
    var first = document.createElement("td");
    var emailAdd = document.createElement("td");
    var contactNum = document.createElement("td");

    var btnDiv = document.createElement("div");
    var updateBtn = document.createElement("button");
    var deleteBtn = document.createElement("button");

    var rowId = "row"+(globalIndex);
    var text;

    updateBtn.addEventListener('click', function(){
        var currRow = document.getElementById(rowId).getElementsByTagName("td");
        alert(currRow);
        for(var td in currRow){
            alert(currRow[td].value);
        };
        
    });
    updateBtn.innerHTML = "Update";
    deleteBtn.addEventListener('click', function (){
        document.getElementById(rowId).remove();
    });
    deleteBtn.innerHTML = "Delete";
    btnDiv.appendChild(updateBtn);
    btnDiv.appendChild(deleteBtn);

    text = createInput(lname);
    last.appendChild(text);
    
    text = createInput(fname);
    first.appendChild(text);

    text = createInput(email);
    emailAdd.appendChild(text);

    text = createInput(contact);
    contactNum.appendChild(text);

    row.id = rowId;
    row.appendChild(last);
    row.appendChild(first);
    row.appendChild(emailAdd);
    row.appendChild(contactNum);
    row.appendChild(btnDiv);

    tbody.appendChild(row);
    hideModal();
}

function createInput(value){
    var input = document.createElement("input");
    input.value = value;
    input.readOnly = true;
    return input;
}
