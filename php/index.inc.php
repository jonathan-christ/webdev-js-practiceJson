<?php
if(empty($_SERVER['CONTENT_TYPE']))
{ 
 $_SERVER['CONTENT_TYPE'] = "application/x-www-form-urlencoded"; 
}

if(isset($_POST["addContactBtn"])){
    $fname = $_POST['fnameIn'];
    $lname = $_POST['lnameIn'];
    $email = $_POST['email'];
    $contNum = $_POST['contact'];

    include 'db.php';
    include 'contactList.php';
    include 'contacts.php';

    $contact = new Contact($fname, $lname, $email, $contNum);
    $contact->addContact();

    
    // header("location:../index.html");
}

if(isset($_POST['updateContactBtn'])){
    include 'db.php';
    include 'contactList.php';
    include 'contacts.php';
}

if(isset($_POST['deleteContactBtn'])){
    include 'db.php';
    include 'contactList.php';
    include 'contacts.php';
}

