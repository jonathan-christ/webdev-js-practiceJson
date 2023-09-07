<?php
if(empty($_SERVER['CONTENT_TYPE']))
{ 
 $_SERVER['CONTENT_TYPE'] = "application/x-www-form-urlencoded"; 
}

include 'db.php';
include 'contactList.php';
include 'contacts.php';

if(isset($_POST["request"])){
    $contact = new Contact("","","","");
    echo json_encode($contact->getContacts());

}

if(isset($_POST["fname"])){
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $contNum = $_POST['contact'];

    $contact = new Contact($fname, $lname, $email, $contNum);
    echo json_encode($contact->addContact());
}

if(isset($_POST['updateContactBtn'])){
}

if(isset($_POST['deleteContactBtn'])){
}

