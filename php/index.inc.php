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

if(isset($_POST["add"])){
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $contNum = $_POST['contact'];

    $contact = new Contact($fname, $lname, $email, $contNum);
    echo json_encode($contact->addContact());
}

if(isset($_POST['update'])){
    $id = $_POST['id'];
    $fname = $_POST['fname'];
    $lname = $_POST['lname'];
    $email = $_POST['email'];
    $contNum = $_POST['contact'];

    $contact = new Contact($fname, $lname, $email, $contNum, $id);
    echo json_encode($contact->editContact());
}

if(isset($_POST['delete'])){
    $id = $_POST['id'];
    $email = $_POST['email'];

    $contact = new Contact("", "", $email, "", $id);
    echo json_encode($contact->removeContact());
}

