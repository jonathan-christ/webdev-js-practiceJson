//translate code into jquery

$(function(){
    let globalIndex = 0;
    
    // $(".toggleAddModal").click(function(){
    //     $("#addModal").toggle()
    // })

    // $("#addContactBtn").click(function(){
    //     let validity = true;
    //     let inputs = $(this).siblings("div").children("input")
    //     $.each(inputs, function (idx, elem){
    //         alert(elem)
    //         if(!elem.checkValidity()){
    //             alert($(elem).attr("name") + "is not valid!")
    //             validity = false;
    //         }
    //     })
        //make class instance
        

    // })
    //RECEIVE DATA


    //PRINT DATA

})

function checkValid(form){
    let validity = true;
    let errMsg = "";
    $(form).children("input").each(function (index){
        if(index.checkValidity()){
            if(errMsg.length) errMsg += ", " + index.attr("name")
            else errMsg = index.attr("name")
            if(validity) validity = false;
        }

        if(!validity) alert(errMsg + " is invalid!");
    })
}

 

class Contacts{
    constructor(id, fname, lname, email, contNum){
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.email = email;
        this.contNum = contNum;
    }

    getData(){
        return {
            "id": this.id,
            "fname" : this.fname,
            "lname" : this.lname,
            "email" : this.email,
            "contNum" : this.contNum
        };
    }
}